import {Table, Button, Form} from "react-bootstrap";
import './TablaResponsables.css'
import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import NavBarAdministracion from "../../NavBars/NavBarAdministracion";
export const TablaResponsables = (props) => {
    const [responsables, setResponsables] = useState(null);
    const [todosResponsables, setTodosResponsables] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios(`http://localhost:8080/getResponsables`);
            const newData = response.data;
            setResponsables(newData);
            setTodosResponsables(newData);
        };
        fetchData();
    },[]);

    const handleChange = (event) => {
        setResponsables(responsables.filter((elem) => {
            return elem.idClub.toLowerCase().includes(event.target.value.toLowerCase());
        }));
        console.log(responsables);
    }

    if (responsables) {
        return (<div className="ContenedorGestion">
            <NavBarAdministracion/>
            <div className="TablaCampeonatosResponsables">
                <Table striped bordered hover sm>
                    <thead>
                    <tr borderless>
                        <th colSpan="6">
                            RESPONSABLES
                        </th>
                    </tr>
                    <tr>
                        <th>Legajo</th>
                        <th>Nombre</th>
                        <th>Documento</th>
                        <th>Club</th>
                        <th colSpan="2">
                            <Form.Control classname="searchBox"
                                          id="search" type="search" placeholder="Filtrar por Nombre"
                                          onChange={handleChange} autoComplete="off"/>

                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {responsables.map((responsable,index) => {
                        let ids = responsable.legajo
                        return (
                            <tr key={ids}>
                                <td>{ids}</td>
                                <td>{responsable.nombre}</td>
                                <td>{responsable.documento}</td>
                                <td>{responsable.club.nombre}</td>
                                <td><Link className='btn btn-success' to={{pathname: '/datos/representante', state:{id:ids}}}>Perfil</Link></td>
                            </tr>)})}
                    </tbody>
                </Table>
            </div>
        </div>)
    } else {
        return (<h1>Cuando algo se rompe se rompe</h1>)
    }
}