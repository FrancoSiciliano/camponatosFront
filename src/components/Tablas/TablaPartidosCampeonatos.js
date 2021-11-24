import {Table, Button, Form} from "react-bootstrap"
import {useLocation, Link} from 'react-router-dom'
import {useEffect, useState} from "react";
import axios from "axios";
import './TablaPartidosCampeonatos.css'
import NavBarAdministracion from "../NavBars/NavBarAdministracion";
import NavBarResponsable from "../NavBars/NavBarResponsable";

export const TablaPartidosCampeonatos = () => {
    let location = useLocation()
    const [data, setData] = useState(null);
    const idResponsable = localStorage.getItem("id");

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios(`http://localhost:8080/getPartidosByCampeonato?idCampeonato=${location.state.idCampeonato}`);
            const newData = response.data;
            setData(newData);
        };
        fetchData();
    }, []);
    const navbar = () => {
        if (location.state.tipo === "RESPONSABLES") {
            return (<NavBarResponsable/>);
        } else if (location.state.tipo === "ADMINISTRADOR") {
            return (<NavBarAdministracion/>);
        }
    }

    if (data) {
        return (<div>
            {navbar()}
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
                        <th colSpan="2">
                            <Form.Control classname="searchBox"
                                          id="search" type="search" placeholder="Filtrar por Nombre"
                                          onChange={""} autoComplete="off"/>
                        </th>
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
                                                  idPartido: ids,
                                                  clubLocal: partido.clubLocal,
                                                  clubVisitante: partido.clubVisitante,
                                                  rol: "RESPONSABLE"
                                              }
                                          }}> Detalles</Link></td>
                                <td><Link class="btn btn-primary btn-sm" to={{
                                    pathname: '/tabla/partidos/listaJugadores',
                                    state: {idPartido: ids, categoria: categ}
                                }}> Lista Jugadores</Link></td>
                            </tr>)
                    })}
                    </tbody>
                </Table></div>
        </div>)
    } else {
        return (<div> {navbar()}
            <h1>The server isnt working</h1></div>)
    }
}
