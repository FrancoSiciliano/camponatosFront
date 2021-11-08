import {Table, Button} from "react-bootstrap";
import '../GestionJugadores/ListaJugadoresClub.css'
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import NavBarResponsable from "../../NavBars/NavBarResponsable";
import {Form} from "react-bootstrap";
import { useLocation } from "react-router";

export const ListaJugadoresClub = (props) => {
    const [jugadores, setJugadores] = useState(null);
    const [partidos, setPartidos]=useState(null)
    const todosJugadores = useRef(null);
    let location = useLocation()

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios(`http://localhost:8080/getJugadores`);
            const repuesta = await axios(`http://localhost:8080/getPartidosByCampeonato?idCampeonato=${location.state.id}`);
            const partido = repuesta.data;
            const newData = response.data;
            setPartidos(partido);
            setJugadores(newData);
            todosJugadores.current = newData;
        };
        fetchData();
    }, []);
    var categoria =0;
    const handleChange = (event) => {
        setJugadores(todosJugadores.current.filter((elem) => {
            return `${elem.nombre} + ${elem.apellido}`.toLowerCase().includes(event.target.value.toLowerCase());
        }));
    }

    if (jugadores) {
        return (<div>
            <NavBarResponsable/>
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
                        <th>Teléfono</th>
                        <th>Categoria</th>
                        <th>Fecha Nacimiento</th>
                        <th>Fecha de Alta</th>
                        <th>Estado</th>
                        <th colSpan="2">
                            <Form.Control classname="searchBox"
                                          id="search" type="search" placeholder="Filtrar por Nombre"
                                          onChange={handleChange}/>

                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {partidos.map((partidos, index) => {
                         categoria=partidos.categoria;
                    })}
                    {jugadores.map((jugadores, index) => {
                        if(parseInt(jugadores.categoria)>=categoria){
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
                                <td>{jugadores.estado ? "Activo" : "Inactivo"}</td>
                                <td><Button classname="botonesTablas" type="submit"
                                            class="btn btn-success btn-sm">Habilitar</Button></td>
                                <td><Button classname="botonesTablas" type="submit"
                                            class="btn btn-success btn-sm"> Deshabilitar</Button></td>
                            </tr>)
                    }})}
                    </tbody>
                </Table>
            </div>
        </div>)
    } else {
        return (<div><NavBarResponsable/> <h1>The server isnt working</h1></div>)
    }
}


export default ListaJugadoresClub;