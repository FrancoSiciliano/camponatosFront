import NavBarJugador from "../NavBars/NavBarJugador";
import {Button, Form, Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import axios from "axios";
import './estadisticasJugador.css'
import {useHistory} from "react-router-dom";
import {PantallaCarga} from "../PantallaCarga/PantallaCarga";

export const EstadisticasJugadorCampeonato = () => {

    const history = useHistory();
    const idCampeonato = history.location.state.idCampeonato;
    const idJugador = localStorage.getItem("id");
    const [estadisticas, setEstadisticas] = useState(null);


    useEffect(async () => {

        const response = await axios.get(`http://localhost:8080/getStatsByCampeonato?idJugador=${idJugador}&idCampeonato=${idCampeonato}`)
        setEstadisticas(response.data);

    }, [])

    if (estadisticas) {
        return (<div className="contenedor-principal-estadisticas-jugador-campeonato">
                <NavBarJugador/>

                <div style={{
                    display: "flex",
                    width: "1000px",
                    justifyContent: "center",
                    height: "500px",
                    alignItems: "center"
                }}>
                    <Table striped bordered hover sm
                           style={{width: "400px", height: "300px", backgroundColor: "white"}}>
                        <thead>
                        <tr>
                            <th colSpan="9">
                                ESTADISTICAS EN EL CAMPEONATO: {estadisticas.descripcion}
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td colspan="4">Cantidad de goles convertidos:</td>
                            <td colspan="4">{estadisticas.cantGoles}</td>
                        </tr>
                        <tr>
                            <td colspan="4">Cantidad de tarjetas rojas:</td>
                            <td colspan="4">{estadisticas.cantRojas}</td>
                        </tr>
                        <tr>
                            <td colspan="4">Cantidad de tarjetas amarillas:</td>
                            <td colspan="4">{estadisticas.cantAmarillas}</td>
                        </tr>
                        <tr>
                            <td colspan="4">Cantidad de partidos jugados:</td>
                            <td colspan="4">{estadisticas.cantJugados}</td>
                        </tr>
                        </tbody>
                    </Table>
                </div>
            </div>
        )
    }
    else {
        return (<PantallaCarga/>)
    }
}