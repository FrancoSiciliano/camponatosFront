import {Table, Button, Form} from "react-bootstrap";
import './Listado.css'
import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import NavBarClub from "../../NavBars/NavBarClub";
import {ErrorPagina} from "../../NoseEncuentra/ErrorPagina";

//<td><Button type="submit" class="btn btn-primary btn-sm">Tabla</Button></td>
//<td><Button type="submit" onClick={"GenerarPartidos"} class="btn btn-primary btn-sm"> <Link to="/TablaPartidos"> Partidos</Link></Button></td>
export const Listado = (props) => {
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
            <NavBarClub/>
            <div className="Tabla">
                <Table striped bordered hover sm>
                    <thead>
                    <tr borderless>
                        <th colSpan="6">
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
                                          onChange={handleChange}/>

                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {campeonatos.map((campeonato) => {
                        let ids = campeonato.idCampeonato
                        return (
                            <tr key={campeonato.descripcion}>
                                <td>{campeonato.idCampeonato}</td>
                                <td>{campeonato.descripcion}</td>
                                <td>{campeonato.fechaInicio}</td>
                                <td>{campeonato.fechaFin}</td>
                                <td><Button classname="botonesTablas" type="submit" class="btn btn-primary btn-sm"><Link
                                    to={{pathname: '/tablaPosiciones', state: ids}}>Tabla</Link></Button></td>
                                <td><Button classname="botonesTablas" type="submit" class="btn btn-primary btn-sm"><Link
                                    to={{pathname: '/tablaPartidos', state: ids}}>Partidos</Link></Button></td>
                            </tr>)
                    })}
                    </tbody>
                </Table>
            </div>
        </div>)
    } else {
        return (<ErrorPagina descripcion="Que A pasado?"/>)
    }
}


export default Listado;