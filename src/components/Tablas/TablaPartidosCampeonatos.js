import {Table, Form, Button} from "react-bootstrap"
import {useLocation, Link, useHistory} from 'react-router-dom'
import {useEffect, useState} from "react";
import axios from "axios";
import './TablaPartidosCampeonatos.css'
import NavBarAdministracion from "../NavBars/NavBarAdministracion";
import NavBarResponsable from "../NavBars/NavBarResponsable";
import {PantallaCarga} from "../PantallaCarga/PantallaCarga";
import {PopUp} from "../PopUp/PopUp";
export const TablaPartidosCampeonatos = () => {
    const history = useHistory();
    const [data, setData] = useState(null);
    const rol = localStorage.getItem("rol");
    const [clubResponsable, setClubResponsable] = useState(null);
    const [isPartidoSeleccionadoCargado, setIsPartidoSeleccionadoCargado] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios(`http://localhost:8080/getPartidosByCampeonato?idCampeonato=${history.location.state.idCampeonato}`);
            const newData = response.data;
            setData(newData);

            if (rol === "RESPONSABLE") {
                const res = await axios(`http://localhost:8080/getResponsableById?idResponsable=${localStorage.getItem("id")}`);
                const responsable = res.data;
                setClubResponsable(responsable.club.idClub);
            }
        };

        fetchData();
    }, []);

    const navbar = () => {
        if (rol === "RESPONSABLE") {
            return (<NavBarResponsable/>);
        } else if (rol === "ADMIN") {
            return (<NavBarAdministracion/>);
        }
    }

    const isPartidoCargado = async (idPartido) => {
        const res = await axios.get(`http://localhost:8080/encontrarPartido?idPartido=${idPartido}`);
        const partido = res.data;
        return partido.golesLocal !== null && partido.golesVisitante !== null;
    }

    const handleClick = async (idPartido, datosPartido) => {
        if (await isPartidoCargado(idPartido)) {
            setError("No se puede editar la lista de jugadores de un partido que ya a sucecedido");
            setShowModal(true);
        } else {
            history.push('/tabla/partidos/lista_jugadores', datosPartido)

        }
    }

    const handleClickDetalles = async (idPartido, datosPartido) => {
        if (await isPartidoCargado(idPartido)) {
            history.push('/detalles/partidos', datosPartido)
        } else {
            setError("Los resultados del partido aún no fueron cargados por el administrador");
            setShowModal(true);
        }
    }

    if (data) {
        return (<div>
            {navbar()}
            <div className="TablaPartidosCampeoantos">
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th colSpan="8">{history.location.state.descrip}</th>
                    </tr>
                    <tr>
                        <th>Fecha</th>
                        <th>Nro Zona</th>
                        <th>Categoria</th>
                        <th>Club Local</th>
                        <th>Club Visitante</th>
                        <th>Detalles</th>
                        <th>Listado Jugadores</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map( (partido, index) => {
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
                                    clubResponsable: clubResponsable
                                })}>Detalles</Button></td>
                                {rol === "RESPONSABLE" && (partido.clubLocal.idClub === clubResponsable || partido.clubVisitante.idClub === clubResponsable) &&
                                <td><Button onClick={() => handleClick(partido.idPartido, {idPartido: ids,
                                    categoria: categ,
                                    campeonato: history.location.state.idCampeonato,
                                    nombrePartido: `${partido.clubLocal.nombre} - ${partido.clubVisitante.nombre} | Fecha número: ${partido.nroFecha} | Fecha: ${partido.fechaPartido}`})} class="btn btn-primary btn-sm" > Lista Jugadores</Button></td>}
                            </tr>)
                    })}
                    </tbody>
                </Table></div>
                <PopUp show={showModal} onHide={() => setShowModal(false)} text={error} title="Lista Jugadores"/>
        </div>)
    } else {
        return (<PantallaCarga/>)
    }
}
