import { Table, Button } from "react-bootstrap";
import '../Tablas/TablaJugadores.css'
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Form } from "react-bootstrap";
import { useLocation } from "react-router";
import { Modal } from "react-bootstrap";
import NavBarResponsable from "../NavBars/NavBarResponsable";
import { event } from "jquery";
import {PantallaCarga} from "../PantallaCarga/PantallaCarga";

export const TablaJugadoresPartidos = (props) => {
    const location = useLocation();
    const reload =false;
    const [listaJugadoresClub, setListaJugadoresClub] = useState(null);
    const [listaJugadores, setListaJugadores] = useState(null);
    const todosJugadores = useRef(null);
    const [estado, setEstado] = useState(false);
    const [responsable,setResponsable]=useState(null);
    const [jugadorSeleccionado,setJugadorSeleccionado]=useState(null);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const idResponsable =localStorage.getItem("id")
    useEffect(() => {
        const fetchData = async () => {
            const respuesta = await axios(`http://localhost:8080/getResponsableById?idResponsable=${idResponsable}`)
            const res = respuesta.data;
            const jugadoresClubRepuesta = await axios(`http://localhost:8080/getJugadoresHabilitadosByClubAndCategoria?idClub=${res.club.idClub}&categoria=${location.state.categoria}`)
            const response = await axios(`http://localhost:8080/getMiembrosByClubAndPartido?idClub=${parseInt(res.club.idClub)}&idPartido=${location.state.idPartido}`);
            const jugadoresClubRepuestaData=jugadoresClubRepuesta.data;
            const newData = response.data;
            setResponsable(res);
            setListaJugadoresClub(jugadoresClubRepuestaData);
            setListaJugadores(newData);
            
            todosJugadores.current = newData;
        };
        fetchData();
    }, [estado]);
    const HandleClickAgregarJugadores = (e)=>{
        try{
        axios.post(`http://localhost:8080/agregarJugadorEnLista?idClub=${responsable.club.idClub}&idPartido=${location.state.idPartido}&idJugador=${jugadorSeleccionado}`)
        reload =true;
        if({reload}==true){
            window.location.reload(true)
        }
        }catch(e){
            console.log(e.message)
        }
    }
    const handleChangeJugadorSelect = (event) => {
       setJugadorSeleccionado(event.target.value);
    }
    

    if (listaJugadores) {
        return (<div>
            <NavBarResponsable  id={location.state.idResponsable}/>
            <div className="TablaListaJugadoresClub scrollable-lista-jugadores">
                <Table striped bordered hover sm>
                    <thead>
                        <tr>
                            <th colSpan="15" className='titulo-tabla-jug-camp'>
                                Lista Jugadores
                            </th>
                        </tr>
                        <tr>
                            <th>#</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Tipo Documento</th>
                            <th>Nro Documento</th>
                            <th>Direccion</th>
                            <th>Correo</th>
                            <th>Teléfono</th>
                            <th>Categoria</th>
                            <th>Fecha Nacimiento</th>
                            <th>Fecha de Alta</th>
                            <th><Button  className="btn btn-success" onClick={handleShow}>Agregar Jugador</Button>
                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>AGREGAR JUGADOR</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        SELECIONAR JUGADOR
                            <Form.Select type="label-select" name='jugadorGol' onChange={handleChangeJugadorSelect} >
                            {listaJugadoresClub.map((jugadorClub, index) => {
                              return (
                            <option key={index} value={jugadorClub.idJugador}> {`${jugadorClub.idJugador} - ${jugadorClub.nombre} ${jugadorClub.apellido}`}</option>)}
                                )}
                                </Form.Select>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button type = "submit" className="btn btn-success"  onClick={HandleClickAgregarJugadores(event)}>
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
                        {listaJugadores.map((listajugadores, index) => {
                            let idJug = listajugadores.jugador.idJugador
                            return (
                                <tr key={index}>
                                    <td>{idJug}</td>
                                    <td>{listajugadores.jugador.nombre}</td>
                                    <td>{listajugadores.jugador.apellido}</td>
                                    <td>{listajugadores.jugador.tipoDocumento}</td>
                                    <td>{listajugadores.jugador.documento}</td>
                                    <td>{listajugadores.jugador.direccion}</td>
                                    <td>{listajugadores.jugador.mail}</td>
                                    <td>{listajugadores.jugador.telefono}</td>
                                    <td>{listajugadores.jugador.categoria}</td>
                                    <td>{listajugadores.jugador.fechaNacimiento}</td>
                                    <td>{listajugadores.jugador.fechaAlta}</td>                
                                </tr>)
                        })}
                    </tbody>
                </Table>
            </div>
        </div>)
    } else {
        return (<PantallaCarga/>)
    }
}
