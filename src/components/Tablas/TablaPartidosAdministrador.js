import {Table, Button} from "react-bootstrap"
import {useLocation, Link,useHistory} from 'react-router-dom'
import {useEffect, useState} from "react";
import axios from "axios";
import './TablaPartidosCampeonatos.css'
import NavBarAdministracion from "../NavBars/NavBarAdministracion";
import {PantallaCarga} from "../PantallaCarga/PantallaCarga";
import { PopUp } from "../PopUp/PopUp";

export const TablaPartidosAdministrador = () => {
    let location = useLocation();
    let history = useHistory();
    const [data, setData] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState(null);
    const [title, setTitle] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const partidos = await axios(`http://localhost:8080/getPartidosByCampeonato?idCampeonato=${location.state.idCampeonato}`);
            const partidosAdmin = partidos.data;
            setData(partidosAdmin);
        };
        fetchData();
    }, []);
    const handleClickDetalles = async (idPartido, datosPartido) => {
        if (await isPartidoCargado(idPartido)) {
            history.push('/detalles/partidos', datosPartido)
        } else {
            setError("Los resultados del partido aún no fueron cargados por el administrador");
            setTitle("Error detalles de partido")
            setShowModal(true);
        }
    }
    const handleClick = async (idPartido, datosPartido) => {
        if (await !isMiembroCargado(idPartido)) {
            setError("No existe la lista de jugadores del partido");
            setTitle("Error Lista de Jugadores");
            setShowModal(true);
        } else {
            history.push('/administrador/campeonatos/partidos/jugadores', datosPartido)

        }
    }
    const isPartidoCargado = async (idPartido) => {
        const res = await axios.get(`http://localhost:8080/encontrarPartido?idPartido=${idPartido}`);
        const partido = res.data;
        return partido.golesLocal !== null && partido.golesVisitante !== null;
    }
    const isMiembroCargado = async (idPartido) => {
        const res = await axios.get(`http://localhost:8080/getMiembroByPartido?idPartido=${idPartido}`);
        const lista = res.data;
        return lista;
    }
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
                                <td><Button class="btn btn-primary btn-sm" onClick={() => handleClickDetalles(partido.idPartido, {
                                    idPartido: partido.idPartido,
                                    clubLocal: partido.clubLocal,
                                    clubVisitante: partido.clubVisitante,
                                    clubResponsable: partido.clubLocal
                                })}>Detalles</Button></td>
                                <td><Button onClick={() => handleClick(partido.idPartido, {idPartido: ids,
                                    categoria: categ,
                                    campeonato: location.state.idCampeonato,
                                    nombrePartido: `${partido.clubLocal.nombre} - ${partido.clubVisitante.nombre} | Fecha número: ${partido.nroFecha} | Fecha: ${partido.fechaPartido}`})} class="btn btn-primary btn-sm" > Lista Jugadores</Button></td>
                            </tr>)
                    })}
                    </tbody>
                </Table></div>
                <PopUp show={showModal} onHide={() => setShowModal(false)} text={error} title={title}/>

        </div>)
    } else {
        return (<PantallaCarga/>)
    }
}
