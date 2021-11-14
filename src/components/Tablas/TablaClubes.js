import {Table, Button, Form} from "react-bootstrap";
import './TablaClubes.css'
import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import NavBarAdministracion from "../NavBars/NavBarAdministracion";
export const TablaClubes = (props) => {
    const [clubes, setClubes] = useState(null);
    const [todosClubes, setTodosClubes] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios(`http://localhost:8080/getClubes`);
            const newData = response.data;
            setClubes(newData);
            setTodosClubes(newData);
        };
        fetchData();
    },[]);

    const handleChange = (event) => {
        setClubes(todosClubes.filter((elem) => {
            return elem.nombre.toLowerCase().includes(event.target.value.toLowerCase());
        }));
        console.log(clubes);
    }

    if (clubes) {
        return (<div className="ContenedorGestion">
            <NavBarAdministracion/>
            <div className="TablaClubes">
                <Table striped bordered hover sm>
                    <thead>
                    <tr borderless>
                        <th colSpan="6">
                            CLUBES
                        </th>
                    </tr>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Direccion</th>
                        <th colSpan="2">
                            <Form.Control classname="searchBox"
                                          id="search" type="search" placeholder="Filtrar por Nombre"
                                          onChange={handleChange} autoComplete="off"/>

                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {clubes.map((club) => {
                        let nombre = club.nombre
                        let ids = club.idClub                        
                        return (
                            <tr key={ids}>
                                <td>{ids}</td>
                                <td>{nombre}</td>
                                <td>{club.direccion}</td>
                                <td><Link className='btn btn-success' to={{pathname: '/datos/club', state:{id:ids}}}>Perfil</Link></td>
                                <td><Link className='btn btn-success' to={{pathname: '/partidos/Administrador', state:{id:ids,descrip:nombre}}}>Eliminar</Link></td>
                            </tr>)
    })}
                    </tbody>
                </Table>
            </div>
        </div>)
    } else {
        return (<h1>Cuando algo se rompe se rompe</h1>)
    }
}