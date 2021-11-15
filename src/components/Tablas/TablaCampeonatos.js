import {Table, Form} from "react-bootstrap";
import './TablaCampeonatos.css'
import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import NavBarAdministracion from "../NavBars/NavBarAdministracion";

export const TablaCampeonatos = (props) => {
    const [campeonatos, setCampeonatos] = useState(null);
    const [todosCampeonatos, setTodosCampeonatos] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios(`http://localhost:8080/getCampeonatos`);
            const newData = response.data;
            setCampeonatos(newData);
            setTodosCampeonatos(newData);
        };
        fetchData();
    }, []);

    const handleChange = (event) => {
        setCampeonatos(todosCampeonatos.filter((elem) => {
            return elem.descripcion.toLowerCase().includes(event.target.value.toLowerCase());
        }));
        console.log(campeonatos);
    }

    if (campeonatos) {
        return (<div className="ContenedorGestion">
            <NavBarAdministracion/>
            <div className="TablaCampeonatosResponsables">
                <Table striped bordered hover sm>
                    <thead>
                    <tr borderless>
                        <th colSpan="6">
                            CAMPEONATOS
                        </th>
                    </tr>
                    <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Fecha Inicio</th>
                        <th>Fecha Fin</th>
                        <th colSpan="2">
                            <Form.Control classname="searchBox"
                                          id="search" type="search" placeholder="Filtrar por Nombre"
                                          onChange={handleChange} autoComplete="off"/>

                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {campeonatos.map((campeonato, index) => {
                        let descripcion = campeonato.descripcion
                        let ids = campeonato.idCampeonato
                        let estado = campeonato.estado
                        if (estado.toUpperCase() === "ACTIVO") {
                            return (
                                <tr key={ids}>
                                    <td>{ids}</td>
                                    <td>{descripcion}</td>
                                    <td>{campeonato.fechaInicio}</td>
                                    <td>{campeonato.fechaFin}</td>
                                    <td><Link className='btn btn-success' to={{
                                        pathname: '/tabla/Posiciones',
                                        state: {id: ids, descrip: descripcion, tipo: "ADMINISTRADOR"}
                                    }}>Tabla</Link></td>
                                    <td><Link className='btn btn-success' to={{
                                        pathname: '/partidos/campeonatos',
                                        state: {id: ids, descrip: descripcion, tipo: "ADMINISTRADOR"}
                                    }}>Partidos</Link></td>
                                </tr>)
                        }
                    })}
                    </tbody>
                </Table>
            </div>
        </div>)
    } else {
        return (<h1>Cuando algo se rompe se rompe</h1>)
    }
}


export default TablaCampeonatos;