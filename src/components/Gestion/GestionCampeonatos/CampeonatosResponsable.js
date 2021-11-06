import {Table, Button, Form} from "react-bootstrap";
import './CampeonatosResponsable.css'
import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import {ErrorPagina} from "../../NotFound/ErrorPagina";
import NavBarResponsable from "../../NavBars/NavBarResponsable";

//<td><Button type="submit" class="btn btn-primary btn-sm">Tabla</Button></td>
//<td><Button type="submit" onClick={"GenerarPartidos"} class="btn btn-primary btn-sm"> <Link to="/TablaPartidos"> Partidos</Link></Button></td>
export const CampeonatosResponsable = (props) => {
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
    },[]);

    const handleChange = (event) => {
        setCampeonatos(todosCampeonatos.filter((elem) => {
            return elem.descripcion.toLowerCase().includes(event.target.value.toLowerCase());
        }));
        console.log(campeonatos);
    }

    if (campeonatos) {
        return (<div className="ContenedorGestion">
            <div className="TablaCampeonatosResponsables">
                <Table striped bordered hover sm>
                    <thead>
                    <tr borderless>
                        <th colSpan="6" className = 'tituloTablaCamp'>
                            Campeonatos Activos del Club
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
                    {campeonatos.map((campeonato,index) => {
                        let descripcion = campeonato.descripcion
                        let ids = campeonato.idCampeonato
                        let estado = campeonato.estado
                        if(estado.toUpperCase() ==="ACTIVO"){
                        return (
                            <tr key={ids}>
                                <td>{ids}</td>
                                <td>{descripcion}</td>
                                <td>{campeonato.fechaInicio}</td>
                                <td>{campeonato.fechaFin}</td>
                                <td><Button classname="botonesTablas" type="submit" class="btn btn-primary btn-sm"><Link 
                                    to={{pathname: '/tablaPosiciones', state:{id:ids,descrip:descripcion}}}>Tabla</Link></Button></td>
                                <td><Button classname="botonesTablas" type="submit" class="btn btn-primary btn-sm"><Link
                                    to={{pathname: '/tablaPartidos', state:{id:ids,descrip:descripcion}}}>Partidos</Link></Button></td>
                            </tr>)
    }})}
                    </tbody>
                </Table>
            </div>
        </div>)
    } else {
        return (<h1>The server isnt working</h1>)
    }
}


export default CampeonatosResponsable;