import { Table, Button } from "react-bootstrap";
import '../Tablas/TablaJugadores.css'
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Form } from "react-bootstrap";
import NavBarAdministracion from "../NavBars/NavBarAdministracion";
import { useLocation } from "react-router";

export const TablaJugadoresPartidos = (props) => {
    const [listaJugadores, setListaJugadores] = useState(null);
    const todosJugadores = useRef(null);
    const [estado, setEstado] = useState(false);
    const location = useLocation();
    useEffect(() => {
        const fetchData = async () => {
            const respuesta = await axios(`http://localhost:8080/getResponsableById?idResponsable=${location.state.idResponsable}`)
            const res = respuesta.data;
            const response = await axios(`http://localhost:8080/getMiembrosByClubAndPartido?idClub=${res.club.idClub}&idPartido=${location.state.idPartido}`);
            const newData = response.data;
            setListaJugadores(newData);
            todosJugadores.current = newData;
        };
        fetchData();
    }, [estado]);
    const HandleClickAgregarJugadores = ()=>{
        
    }
    const handleChange = (event) => {
        setListaJugadores(listaJugadores.current.filter((elem) => {
            return `${elem.nombre} + ${elem.apellido}`.toLowerCase().includes(event.target.value.toLowerCase());
        }));
    }
    if (listaJugadores) {
        return (<div>
            <NavBarAdministracion />
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
                            <th>Estado Global</th>
                            <th><Button  className="btn btn-success" onClick={HandleClickAgregarJugadores}>Agregar Jugador</Button></th>
                            <th colSpan="1">
                                <Form.Control classname="searchBox"
                                    id="search" type="search" placeholder="Filtrar por Nombre"
                                    onChange={handleChange} />
                            </th>
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
        return (<div><NavBarAdministracion /> <h1>The server isnt working</h1></div>)
    }
}
