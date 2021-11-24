import {Table, Button} from "react-bootstrap"
import {useHistory, useLocation} from 'react-router-dom'
import {useEffect, useState} from "react";
import axios from "axios";
import './DetallesPartido.css'
import NavBarResponsable from "../../NavBars/NavBarResponsable";
import NavBarAdministracion from "../../NavBars/NavBarAdministracion";


export const DetallesPartido = (props) => {

    const history = useHistory();

    const [datosPartido, setDatosPartido] = useState(null);
    const [faltasLocal, setFaltasLocal] = useState([]);
    const [faltasVisitante, setFaltasVisitante] = useState([]);
    const [golesLocal, setGolesLocal] = useState([]);
    const [golesVisitante, setGolesVisitante] = useState([]);
    const [momentosDestacadosLocal, setMomentosDestacadosLocal] = useState([]);
    const [momentosDestacadosVisitante, setMomentosDestadosVisitante] = useState([]);

    useEffect(async () => {
        const fetchDataPartido = async () => {
            const response = await axios(`http://localhost:8080/encontrarPartido?idPartido=${history.location.state.idPartido}`);
            const newData = response.data;
            setDatosPartido(newData);

        };

        const fetchDataFaltas = async () => {
            const responseFaltasL = await axios.get(`http://localhost:8080/getFaltasByClubAndPartido?idClub=${history.location.state.clubLocal.idClub}&idPartido=${history.location.state.idPartido}`)
            const dataFaltasL = responseFaltasL.data;

            const responseFaltasV = await axios.get(`http://localhost:8080/getFaltasByClubAndPartido?idClub=${history.location.state.clubVisitante.idClub}&idPartido=${history.location.state.idPartido}`)
            const dataFaltasV = responseFaltasV.data;

            setFaltasLocal(dataFaltasL);
            setFaltasVisitante(dataFaltasV);

        }

        const fetchDataGoles = async () => {
            const responseGolesL = await axios.get(`http://localhost:8080/getGolesByPartidoAndClub?idPartido=${history.location.state.idPartido}&idClubAContar=${history.location.state.clubLocal.idClub}&idClubRival=${history.location.state.clubVisitante.idClub}`);
            const responseGolesV = await axios.get(`http://localhost:8080/getGolesByPartidoAndClub?idPartido=${history.location.state.idPartido}&idClubAContar=${history.location.state.clubVisitante.idClub}&idClubRival=${history.location.state.clubLocal.idClub}`);
            const dataGolesL = responseGolesL.data;
            const dataGolesV = responseGolesV.data;

            setGolesLocal(dataGolesL);
            setGolesVisitante(dataGolesV);
        }

        await fetchDataPartido();
        await fetchDataFaltas();
        await fetchDataGoles();

    }, []);

    const navbar = () => {
        return history.location.state.rol === "RESPONSABLE" ? <NavBarResponsable/> : <NavBarAdministracion/>
    }

    if (datosPartido) {
        return (
            <div>
                {navbar()}
                <div className="comparacion-partido">
                    <div className="equipo-detalle-partido">
                        <h1>{datosPartido.clubLocal.nombre}</h1>
                        <Table hover sm className="local">
                            <tbody>
                            <tr>
                                <td>Goles: {datosPartido.golesLocal ? datosPartido.golesLocal : "0"}</td>
                            </tr>
                            <tr>
                                <td>Validado: {datosPartido.convalidaLocal ? "Si" : "No"}</td>
                            </tr>
                            <tr>
                                <td>Cantidad Faltas: {faltasLocal.length}</td>
                            </tr>
                            </tbody>
                        </Table>
                        <h1>Goles:</h1>

                        {golesLocal.length > 0 ? <Table hover sm className="local">
                            <tbody>
                            {
                                golesLocal.map((gol, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>Gol: {gol.tipo + " - " + gol.jugador.nombre + " " + gol.jugador.apellido + " - " + gol.minuto + "'"}</td>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </Table> : <h1>No hubo goles</h1>}
                        <h1>Faltas:</h1>
                        {faltasLocal.length > 0 ? <Table hover sm className="local">
                            <tbody>
                            {
                                faltasLocal.map((falta, index) => {
                                    return (
                                        <tr>
                                            <td>Falta: {falta.tipo + " - " + falta.jugador.nombre + " " + falta.jugador.apellido + " - " + falta.minuto + "'"}</td>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </Table> : <h1>No hubo faltas</h1>}

                    </div>
                    <h1>VS.</h1>
                    <div className="equipo-detalle-partido">
                        <h1>{datosPartido.clubVisitante.nombre}</h1>
                        <Table hover sm className="visitante">
                            <tbody>
                            <tr>
                                <td>Goles: {datosPartido.golesVisitante ? datosPartido.golesVisitante : "0"}</td>
                            </tr>
                            <tr>
                                <td>Validado: {datosPartido.convalidaVisitante ? "Si" : "No"}</td>
                            </tr>
                            <tr>
                                <td>Cantidad Faltas: {faltasVisitante.length}</td>
                            </tr>
                            </tbody>
                        </Table>
                        <h1>Goles:</h1>
                        {golesVisitante.length > 0 ? <Table hover sm className="local">
                            <tbody>
                            {
                                golesVisitante.map((gol, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>Gol: {gol.tipo + " - " + gol.jugador.nombre + " " + gol.jugador.apellido + " - " + gol.minuto + "'"}</td>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </Table> : <h1>No hubo goles</h1>}
                        <h1>Faltas:</h1>
                        {faltasVisitante.length > 0 ? <Table hover sm className="local">
                            <tbody>
                            {
                                faltasVisitante.map((falta, index) => {
                                    return (
                                        <tr>
                                            <td>Falta: {falta.tipo + " - " + falta.jugador.nombre + " " + falta.jugador.apellido + " - " + falta.minuto + "'"}</td>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </Table> : <h1>No hubo faltas</h1>}
                    </div>
                </div>
            </div>

        );
    } else {
        return (<h1>Server Isnt Working</h1>)
    }
}