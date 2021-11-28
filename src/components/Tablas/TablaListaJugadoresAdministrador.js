import { Table } from "react-bootstrap";
import '../Tablas/TablaJugadores.css'
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useLocation,useHistory } from "react-router";

import NavBarAdministracion from "../NavBars/NavBarAdministracion"
import {PantallaCarga} from "../PantallaCarga/PantallaCarga";
export const TablaListaJugadoresAdministrador = (props) => {
    const history = useHistory();
    const location = history.location();
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

        return (<div>
            <NavBarAdministracion/>
            <div className="TablaListaJugadores scrollable-lista-jugadores">
                <Table striped bordered hover sm>
                    <thead>
                        <tr>
                            <th colSpan="15" className='titulo-tabla-jug-camp'>
                                Lista Jugadores: {location.state.nombrePartido}
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
                        {listaJugadores && listaJugadores.map((listajugadores, index) => {
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

}
