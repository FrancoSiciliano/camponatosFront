import {Table, Button} from "react-bootstrap";
import '../GestionJugadores/ListaJugadoresClub.css'
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import NavBarClub from "../../NavBars/NavBarClub";
import '../GestionCampeonatos/Listado.css'
import {Form} from "react-bootstrap";

export const ListaJugadoresClub = (props) => {
    const [jugadores, setJugadores] = useState(null);
    const todosJugadores = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios(`http://localhost:8080/getJugadores`);
            const newData = response.data;
            setJugadores(newData);
            todosJugadores.current = newData;
        };
        fetchData();
    }, []);

    const handleChange = (event) => {
        setJugadores(todosJugadores.current.filter((elem) => {
            return `${elem.nombre} + ${elem.apellido}`.toLowerCase().includes(event.target.value.toLowerCase());
        }));
    }

    if (jugadores) {
        return (<div>
            <NavBarClub/>
            <div className="Tabla">
                <Table striped bordered hover sm>
                    <thead>
                    <tr>
                        <th colSpan="15">
                            Jugadores del Club
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
                    {jugadores.map((jugadores, index) => {
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
                                            class="btn btn-success btn-sm">Modificar</Button></td>
                                <td><Button classname="botonesTablas" type="submit"
                                            class="btn btn-success btn-sm"> Eliminar</Button></td>
                            </tr>)
                    })}
                    </tbody>
                </Table>
            </div>
        </div>)
    } else {
        return (<h1>Oye que a pasado</h1>)
    }
}


export default ListaJugadoresClub;