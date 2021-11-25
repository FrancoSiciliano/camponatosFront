import {Table, Button} from "react-bootstrap";
import '../Tablas/TablaJugadores.css'
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import { useHistory } from "react-router";
import {Form} from "react-bootstrap";
import NavBarAdministracion from "../NavBars/NavBarAdministracion";
import NavBarResponsable from "../NavBars/NavBarResponsable";
import {PantallaCarga} from "../PantallaCarga/PantallaCarga";

export const TablaJugadores = (props) => {
    const idResponsable =localStorage.getItem("id")
    const [jugadores, setJugadores] = useState(null);
    const todosJugadores = useRef(null);
    const [estado, setEstado] = useState (false);

    useEffect(() => {
        const fetchData = async () => {
            const respuesta = await axios(`http://localhost:8080/getResponsableById?idResponsable=${idResponsable}`)
            const res = respuesta.data;
            const response = await axios(`http://localhost:8080/getJugadoresByClub?idClub=${res.club.idClub}`);
            const newData = response.data;
            setJugadores(newData);
            todosJugadores.current = newData;
        };
        fetchData();
    }, [estado]);
    const handleChange = (event) => {
        setJugadores(todosJugadores.current.filter((elem) => {
            return `${elem.nombre} + ${elem.apellido}`.toLowerCase().includes(event.target.value.toLowerCase());
        }));
    }
    const handleClickEstado = async (idJug) => {
        try{
            await axios.post(`http://localhost:8080/modificarEstado?idJugador=${idJug}`);
            setEstado(!estado);
        }catch(e){
            console.log(e.message);
        }
    }
    
    if (jugadores) {
        return (<div>
            <NavBarResponsable/>
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
                        <th colSpan="2">
                            <Form.Control classname="searchBox"
                                          id="search" type="search" placeholder="Filtrar por Nombre"
                                          onChange={handleChange}/>

                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {jugadores.map((jugadores, index) => {
                        let idJug= jugadores.idJugador
                        return (
                            <tr key={index}>
                                <td>{idJug}</td>
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
                                <td><Button classname="botonesTablas" class="btn btn-success btn-sm" 
                                onClick={()=>handleClickEstado(idJug)}> Cambiar Estado </Button></td>
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


export default TablaJugadores;