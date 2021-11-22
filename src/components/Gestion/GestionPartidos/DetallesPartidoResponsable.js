import {Table, Button} from "react-bootstrap"
import {useLocation} from 'react-router-dom'
import {useEffect, useState} from "react";
import axios from "axios";
import './DetallesPartido.css'
import NavBarResponsable from "../../NavBars/NavBarResponsable";


export const DetallesPartidoResponsable = (props) => {
    let location = useLocation();

    const [datosPartido, setDatosPartido] = useState(null);
    const [faltasLocal, setFaltasLocal] = useState([]);
    const [faltasVisitante, setFaltasVisitante] = useState([]);
    const [golesLocal, setGolesLocal] = useState([]);
    const [golesVisitante, setGolesVisitante] = useState([]);
    const [momentosDestacadosLocal, setMomentosDestacadosLocal] = useState([]);
    const [momentosDestacadosVisitante, setMomentosDestadosVisitante] = useState([]);

    useEffect(async () => {
        const fetchDataPartido = async () => {
            const response = await axios(`http://localhost:8080/encontrarPartido?idPartido=${location.state}`);
            const newData = response.data;
            setDatosPartido(newData);

        };

        const fetchDataFaltas = async () => {
            const response = await axios(`http://localhost:8080/encontrarPartido?idPartido=${location.state}`);
            const aux = response.data;

            const responseFaltasL = await axios.get(`http://localhost:8080/getFaltasByClubAndPartido?idClub=${aux.clubLocal.idClub}&idPartido=${location.state}`)
            const dataFaltasL = responseFaltasL.data;

            const responseFaltasV = await axios.get(`http://localhost:8080/getFaltasByClubAndPartido?idClub=${aux.clubVisitante.idClub}&idPartido=${location.state}`)
            const dataFaltasV = responseFaltasV.data;

            setFaltasLocal(dataFaltasL);
            setFaltasVisitante(dataFaltasV);

        }

        const fetchDataGoles = async () => {
            const response = await axios(`http://localhost:8080/encontrarPartido?idPartido=${location.state}`);
            const aux = response.data;

            const responseGolesL = await axios.get(`http://localhost:8080/getGolesByPartidoAndClub?idPartido=${location.state}&idClubAContar=${aux.clubLocal.idClub}&idClubRival=${aux.clubVisitante.idClub}`);
            const responseGolesV = await axios.get(`http://localhost:8080/getGolesByPartidoAndClub?idPartido=${location.state}&idClubAContar=${aux.clubVisitante.idClub}&idClubRival=${aux.clubLocal.idClub}`);
            const dataGolesL = responseGolesL.data;
            const dataGolesV = responseGolesV.data;

            setGolesLocal(dataGolesL);
            setGolesVisitante(dataGolesV);
        }

        await fetchDataPartido();
        await fetchDataFaltas();
        await fetchDataGoles();

        let auxL = golesLocal.concat(faltasLocal);
        auxL.sort((a,b) => {return a.minuto - b.minuto});
        setMomentosDestacadosLocal(auxL);

        let auxV = golesVisitante.concat(faltasVisitante);
        auxV.sort((a,b) => {return a.minuto - b.minuto});
        setMomentosDestadosVisitante(auxV);

    }, []);

    if (datosPartido) {
        return (<div><NavBarResponsable id={location.state}/>
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
                    <h1>Destacado:</h1>
                    <Table hover sm className="local">
                        <tbody>
                        {
                            momentosDestacadosLocal.map((momento, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{(momento.idFalta ? "Falta: " : "Gol: ") + momento.tipo + " - " + momento.jugador.nombre + " " + momento.jugador.apellido + " - " + momento.minuto + "'"}</td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </Table>
                    {/*<Table hover sm className="local">*/}
                    {/*    <tbody>*/}
                    {/*    {*/}
                    {/*        golesLocal.map((gol, index) => {*/}
                    {/*            return (*/}
                    {/*                <tr key={index}>*/}
                    {/*                    <td>Gol: {gol.tipo + " - " + gol.jugador.nombre + " " + gol.jugador.apellido + " - " + gol.minuto + "'"}</td>*/}
                    {/*                </tr>*/}
                    {/*            )*/}
                    {/*        })*/}
                    {/*    }*/}
                    {/*    </tbody>*/}
                    {/*</Table>*/}

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
                    <h1>Destacado:</h1>
                    <Table hover sm className="local">
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
                    </Table>
                    <Table hover sm className="local">
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
                    </Table>
                </div>
                <div className="BotonesValidarInvalidar">
                <Button className='btn btn-success'>Validar</Button>
                <Button className='btn btn-success'>Invalidar</Button>
                </div>
            </div>
        </div>);
    } else {
        return (<h1>Server Isnt Working</h1>)
    }
}