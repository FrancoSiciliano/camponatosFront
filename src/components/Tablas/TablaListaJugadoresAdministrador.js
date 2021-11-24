import { Table, Button } from "react-bootstrap";
import '../Tablas/TablaJugadores.css'
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Form } from "react-bootstrap";
import { useLocation } from "react-router";
import { Modal } from "react-bootstrap";
import NavBarResponsable from "../NavBars/NavBarResponsable";
import { event } from "jquery";
import NavBarAdministracion from "../NavBars/NavBarAdministracion"
export const TablaListaJugadoresAdministrador = (props) => {
    const location = useLocation();
    const [listaJugadores, setListaJugadores] = useState(null);
    const todosJugadores = useRef(null);
    const [estado, setEstado] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios(`http://localhost:8080/getMiembroByPartido?idPartido=${location.state.idPartido}`);
            const newData = response.data;
            setListaJugadores(newData);            
            todosJugadores.current = newData;
        };
        fetchData();
    }, [estado]);
    if (listaJugadores) {
        return (<div>
            <NavBarAdministracion/>
            <div className="TablaListaJugadores scrollable-lista-jugadores">
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
                           </tr>
                    </thead>
                    <tbody>
                        {listaJugadores.map((listajugadores, index) => {
                            return (
                                <tr key={index}>
                                    <td>{listajugadores.jugador.idJugador}</td>
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
        return (<div><NavBarAdministracion/> <h1>The server isnt working</h1></div>)
    }
}