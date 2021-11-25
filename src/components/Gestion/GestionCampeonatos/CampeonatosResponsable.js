import {Table, Form, Spinner} from "react-bootstrap";
import './CampeonatosResponsable.css'
import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import {PantallaCarga} from "../../PantallaCarga/PantallaCarga";

export const CampeonatosResponsable = () => {
    const [campeonatos, setCampeonatos] = useState(null);
    const [todosCampeonatos, setTodosCampeonatos] = useState(null);
    const [responsable, setResponsable] = useState(null);
    const idResponsable = localStorage.getItem("id");
    useEffect(() => {
        const fetchData = async () => {

            const respuesta = await axios(`http://localhost:8080/getResponsableById?idResponsable=${idResponsable}`)
            const res = respuesta.data;
            setResponsable(res);
            console.log(res)
            const response = await axios(`http://localhost:8080/getCampeonatosByClub?idClub=${parseInt(res.club.idClub)}`);
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
            <div className="TablaCampeonatosResponsables scrollable-responsable">
                <Table striped bordered hover sm>
                    <thead>
                    <tr borderless>
                        <th colSpan="7" className='tituloTablaCamp'>
                            Campeonatos Activos del Club
                        </th>
                    </tr>
                    <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Fecha Inicio</th>
                        <th>Fecha Fin</th>
                        <th colSpan="3">
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
                                    <td><Link className='btn btn-success botonesRepresentante'
                                              to={{
                                                  pathname: '/tabla/posiciones',
                                                  state: {campeonato: ids, tipo: "RESPONSABLES"}
                                              }}>Tabla</Link></td>
                                    <td><Link className='btn btn-success botonesRepresentante'
                                              to={{
                                                  pathname: '/partidos/campeonatos',
                                                  state: {
                                                      idCampeonato: ids,
                                                      descrip: descripcion,
                                                      tipo: "RESPONSABLES",
                                                  }
                                              }}>Partidos</Link></td>
                                    <td><Link className='btn btn-success botonesRepresentante'
                                              to={{
                                                  pathname: '/tabla/habilitacion/jugadores/campeonato',
                                                  state: {idCampeonato: ids, descrip: descripcion}
                                              }}>Jugadores</Link></td>
                                </tr>)
                        }
                    })}
                    </tbody>
                </Table>
            </div>
        </div>)
    } else {
        return (<div className="center">
            <Spinner animation="border"/>
            <p style={{position: "relative", top: "-23px", fontSize: "50px"}}>Cargando...</p>
        </div>)
    }
}


export default CampeonatosResponsable;