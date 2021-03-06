import { Table, Button } from "react-bootstrap";
import '../GestionJugadores/ListaJugadoresClub.css'
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import NavBarResponsable from "../../NavBars/NavBarResponsable";
import { Form } from "react-bootstrap";
import { useLocation } from "react-router";
import { PantallaCarga } from "../../PantallaCarga/PantallaCarga";

export const ListaJugadoresClub = (props) => {
    const idResponsable = localStorage.getItem("id");
    const [jugadores, setJugadores] = useState(null);
    const [partidos, setPartidos] = useState(null)
    const todosJugadores = useRef(null);
    const [estado, setEstado] = useState (false);

    let location = useLocation()

    useEffect(() => {
        const fetchData = async () => {
            const respuesta = await axios(`http://localhost:8080/getResponsableById?idResponsable=${idResponsable}`)
            const res = respuesta.data;
            const response = await axios(`http://localhost:8080/getJugadoresWithEstadoCampeonato?idClub=${res.club.idClub}&idCampeonato=${location.state.idCampeonato}`);
            const repuesta = await axios(`http://localhost:8080/getPartidosByCampeonato?idCampeonato=${location.state.idCampeonato}`);
            const partido = repuesta.data;
            const newData = response.data;
            setPartidos(partido);
            setJugadores(newData);
            todosJugadores.current = newData;
        };
        fetchData();
    }, [estado]);

    var categoria = 0;
    const handleChange = (event) => {
        setJugadores(todosJugadores.current.filter((elem) => {
            return `${elem.nombre} + ${elem.apellido}`.toLowerCase().includes(event.target.value.toLowerCase());
        }));
    }

    const HandleClickHabilitar = async (idJugador) => {
        try {
            await axios.post(`http://localhost:8080/modificarEstadoCampeonato?idJugador=${idJugador}&idCampeonato=${location.state.idCampeonato}`)
            setEstado(!estado);
        } catch (e) {
            console.log(e.message)
        }
    }

 
    if (jugadores) {
        return (<div>
            <NavBarResponsable />
            <div className="TablaListaJugadoresClub scrollable-lista-jugadores">
                <Table striped bordered hover sm>
                    <thead>
                        <tr>
                            <th colSpan="15" className='titulo-tabla-jug-camp'>
                                Jugadores Asignados a {location.state.descrip}
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
                            <th>Tel??fono</th>
                            <th>Categoria</th>
                            <th>Fecha Nacimiento</th>
                            <th>Fecha de Alta</th>
                            <th>Estado Campeonato</th>
                            <th colSpan="2">
                                <Form.Control classname="searchBox"
                                    id="search" type="search" placeholder="Filtrar por Nombre"
                                    onChange={handleChange} />

                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {partidos.map((partidos, index) => {
                            categoria = partidos.categoria;
                        })}
                        {jugadores.map((jugadores, index) => {
                            console.log(jugadores)
                            if (parseInt(jugadores.categoria) >= categoria) {
                                let idJugador = jugadores.idJugador
                                return (
                                    <tr key={index}>
                                        <td>{jugadores.idJugador}</td>
                                        <td>{jugadores.nombre}</td>
                                        <td>{jugadores.apellido}</td>
                                        <td>{jugadores.tipoDocumento}</td>
                                        <td>{jugadores.documento}</td>
                                        <td>{jugadores.direccion}</td>
                                        <td>{jugadores.mail}</td>
                                        <td>{jugadores.telefono}</td>
                                        <td>{jugadores.categoria}</td>
                                        <td>{jugadores.fechaNacimiento}</td>
                                        <td>{jugadores.fechaAlta}</td>
                                        <td>{jugadores.estadoCampeonato ? "Habilitado" : "Deshabilitado"}</td>
                                        <td><Button classname="botonesTablas" type="submit"
                                            class="btn btn-success btn-sm" onClick={()=>HandleClickHabilitar(idJugador)}>Cambiar Estado</Button></td>

                                    </tr>)
                            }
                        })}
                    </tbody>
                </Table>
            </div>
        </div>)
    } else {
        return (<PantallaCarga />)
    }
}


export default ListaJugadoresClub;