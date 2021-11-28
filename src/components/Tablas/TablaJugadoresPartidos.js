import {Table, Button} from "react-bootstrap";
import '../Tablas/TablaJugadores.css'
import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import {Form} from "react-bootstrap";
import {useLocation} from "react-router";
import {Modal} from "react-bootstrap";
import NavBarResponsable from "../NavBars/NavBarResponsable";
import {event} from "jquery";
import {PantallaCarga} from "../PantallaCarga/PantallaCarga";
import {useHistory} from "react-router-dom";
import {PopUp} from "../PopUp/PopUp";
import {Login} from "../Basura de Franco/Login";

export const TablaJugadoresPartidos = () => {
    const history = useHistory();
    const idPartido = history.location.state.idPartido;
    const categoria = history.location.state.categoria;
    const idCampeonato = history.location.state.campeonato;
    const [jugadoresDisponibles, setJugadoresDisponibles] = useState(null);
    const [listaJugadoresAgregados, setListaJugadoresAgregados] = useState(null);
    const [estado, setEstado] = useState(false);
    const [responsable, setResponsable] = useState(null);
    const [jugadorSeleccionado, setJugadorSeleccionado] = useState(null);
    const [show, setShow] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState(null);
    const [title, setTitle] = useState("No es posible agregar el jugador para este partido");
    const [modalTitle, setModalTitle] = useState("Error al cargar miembro");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const idResponsable = localStorage.getItem("id")

    useEffect(() => {
        const fetchData = async () => {
            const respuesta = await axios(`http://localhost:8080/getResponsableById?idResponsable=${idResponsable}`)
            const responsable = respuesta.data;
            const jugadoresClubRespuesta = await axios(`http://localhost:8080/getJugadoresHabilitadosByClubAndCategoriaAndCampeonato?idClub=${responsable.club.idClub}&categoria=${categoria}&idCampeonato=${idCampeonato}`)
            const response = await axios(`http://localhost:8080/getMiembrosByClubAndPartido?idClub=${parseInt(responsable.club.idClub)}&idPartido=${idPartido}`);
            const jugadoresClubRespuestaData = jugadoresClubRespuesta.data;
            const newData = response.data;

            setResponsable(responsable);
            setListaJugadoresAgregados(newData);
            const auxJugadoresDisponibles = [];
            const auxJugadoresAgregado = [];
            newData.forEach((miembro) => {
                auxJugadoresAgregado.push(miembro.jugador.idJugador);
            })

            jugadoresClubRespuestaData.forEach((jugador)  => {
                if (!auxJugadoresAgregado.includes(jugador.idJugador)) {
                    auxJugadoresDisponibles.push(jugador);
                }
            })

            setJugadoresDisponibles(auxJugadoresDisponibles);
        };
        fetchData();
    }, [estado]);

    const HandleClickAgregarJugadores = async () => {
        try {
            await axios.post(`http://localhost:8080/agregarJugadorEnLista?idClub=${responsable.club.idClub}&idPartido=${idPartido}&idJugador=${jugadorSeleccionado}`)
            setEstado(!estado);
            setShow(false);
        } catch (e) {
            const mensaje = e.response.data.message;
            setError(mensaje);
            setShow(false);
            setShowModal(true);
        }
    }
    const handleChangeJugadorSelect = (event) => {
        console.log(event.target.value);
        setJugadorSeleccionado(event.target.value);
    }
    

    if (listaJugadoresAgregados) {
        return (<div>
            <NavBarResponsable/>
            <div className="TablaListaJugadoresClub scrollable-lista-jugadores">
                <Table striped bordered hover sm>
                    <thead>
                    <tr>
                        <th colSpan="15" className='titulo-tabla-jug-camp'>
                            Lista Jugadores: {history.location.state.nombrePartido}
                        </th>
                    </tr>
                    <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Tipo Documento</th>
                        <th>Nro Documento</th>
                        <th>Correo</th>
                        <th>Categoria</th>
                        <th><Button className={"btn btn-success " + (jugadoresDisponibles && jugadoresDisponibles.length === 0 && "disabled")} onClick={handleShow}>Agregar Jugador</Button>
                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>AGREGAR JUGADOR</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    SELECIONAR JUGADOR
                                    <Form.Select type="label-select" name='jugadorGol'
                                                 onChange={handleChangeJugadorSelect}>
                                        <option value="nada" selected>-</option>
                                        {jugadoresDisponibles && jugadoresDisponibles.map((jugadorClub, index) => {
                                                return (
                                                    <option key={index}
                                                            value={jugadorClub.idJugador}> {`${jugadorClub.idJugador} - ${jugadorClub.nombre} ${jugadorClub.apellido}`}</option>)
                                            }
                                        )}
                                    </Form.Select>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button type="submit" className="btn btn-success"
                                            onClick={HandleClickAgregarJugadores}>
                                        Agregar Jugador
                                    </Button>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Cerrar
                                    </Button>
                                </Modal.Footer>
                            </Modal></th>
                    </tr>
                    </thead>
                    <tbody>
                    {listaJugadoresAgregados.map((listajugadores, index) => {
                        return (
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{listajugadores.jugador.nombre}</td>
                                <td>{listajugadores.jugador.apellido}</td>
                                <td>{listajugadores.jugador.tipoDocumento}</td>
                                <td>{listajugadores.jugador.documento}</td>
                                <td>{listajugadores.jugador.mail}</td>
                                <td>{listajugadores.jugador.categoria}</td>
                            </tr>)
                    })}
                    </tbody>
                </Table>
            </div>
            <PopUp show={showModal} onHide={() => setShowModal(false)} text={error}
                   title={title} modalTitle={modalTitle}/>
        </div>)
    } else {
        return (<PantallaCarga/>)
    }
}
