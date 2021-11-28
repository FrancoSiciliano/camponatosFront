import {Table, Form} from "react-bootstrap"
import {useLocation, Link} from 'react-router-dom'
import {useEffect, useState} from "react";
import axios from "axios";
import './TablaPartidosCampeonatos.css'
import NavBarAdministracion from "../NavBars/NavBarAdministracion";
import {PantallaCarga} from "../PantallaCarga/PantallaCarga";

export const TablaPartidosAdministrador = () => {
    let location = useLocation();
    const [data, setData] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            const partidos = await axios(`http://localhost:8080/getPartidosByCampeonato?idCampeonato=${location.state.idCampeonato}`);
            const partidosAdmin = partidos.data;
            setData(partidosAdmin);
        };
        fetchData();
    }, []);
    if (data) {
        return (<div>
            <NavBarAdministracion/>
            <div className="TablaPartidosCampeoantos">
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th colSpan="8">{location.state.descrip}</th>
                    </tr>
                    <tr>
                        <th>Fecha</th>
                        <th>Nro Zona</th>
                        <th>Categoria</th>
                        <th>Club Local</th>
                        <th>Club Visitante</th>
                        <th>Detalles</th>
                        <th>Listado de Jugadores</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((partido, index) => {
                        var ids = partido.idPartido
                        var categ = partido.categoria
                        return (
                            <tr key={index}>
                                <td>{partido.nroFecha}</td>
                                <td>{partido.nroZona}</td>
                                <td>{categ}</td>
                                <td>{partido.clubLocal.nombre}</td>
                                <td>{partido.clubVisitante.nombre}</td>
                                <td><Link class="btn btn-primary btn-sm"
                                          to={{pathname: '/detalles/partidos',
                                              state: {
                                                  idPartido: partido.idPartido,
                                                  clubLocal: partido.clubLocal,
                                                  clubVisitante: partido.clubVisitante,
                                                  rol: "ADMIN"
                                              }
                                          }}> Detalles</Link></td>
                                <td><Link class="btn btn-primary btn-sm" to={{
                                    pathname: '/administrador/campeonatos/partidos/jugadores',
                                    state: {idPartido: ids}
                                }}> Lista Jugadores</Link></td>
                            </tr>)
                    })}
                    </tbody>
                </Table></div>
                
        </div>)
    } else {
        return (<PantallaCarga/>)
    }
}
