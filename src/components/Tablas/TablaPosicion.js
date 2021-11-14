import {Table} from "react-bootstrap"
import {useHistory, useLocation} from 'react-router-dom'
import {useEffect, useState} from "react";
import axios from "axios";
import NavBarResponsable from "../NavBars/NavBarResponsable";

export const TablaPosicion = (props) => {
    const history = useHistory();
    const campeonato = history.location.state;
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios(`http://localhost:8080/getTablaPosicionesByCampeonato?idCampeonato=${campeonato.idCampeonato}`);
            const newData = response.data;
            newData.sort((a, b) => {
                return b.puntos - a.puntos;
            })
            setData(newData);
        };
        fetchData();
    });

    if (data) {
        return (
            <div>
                <NavBarResponsable/>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th colSpan="6">Campeonato: {campeonato.descripcion}</th>
                    </tr>
                    <tr>
                        <th>Club</th>
                        <th>J</th>
                        <th>G</th>
                        <th>E</th>
                        <th>P</th>
                        <th>GA</th>
                        <th>GE</th>
                        <th>Dif</th>
                        <th>Puntos</th>
                        <th>Prom</th>
                        <th colSpan="2">
                            <form classname="searchBar" onsubmit="event.preventDefault();" role="search">
                                <input classname="searchBox"
                                       id="search" type="search" placeholder="Filtrar por Nombre" autofocus required/>
                                <button type="button" classname="botonsearch">search</button>
                            </form>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((tabla, index) => {
                        return (
                            <tr key={index}>
                                <td>{tabla.id.nombre}</td>
                                <td>{tabla.cantidadJugados}</td>
                                <td>{tabla.cantidadGanados}</td>
                                <td>{tabla.cantidadEmpatados}</td>
                                <td>{tabla.cantidadPerdidos}</td>
                                <td>{tabla.golesFavor}</td>
                                <td>{tabla.golesContra}</td>
                                <td>{tabla.diferenciaGoles}</td>
                                <td>{tabla.puntos}</td>
                                <td>{tabla.promedio}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </Table></div>)
    } else {
        return (<div><NavBarResponsable/>
            <h1>No existe Tabla posicion para el campeonato</h1>
        </div>)
    }
}