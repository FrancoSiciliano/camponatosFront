import {Table, Button} from "react-bootstrap"
import {useHistory, useLocation} from 'react-router-dom'
import {useEffect, useState} from "react";
import axios from "axios";
import './DetallesPartido.css'
import NavBarResponsable from "../../NavBars/NavBarResponsable";
import NavBarAdministracion from "../../NavBars/NavBarAdministracion";
import {PantallaCarga} from "../../PantallaCarga/PantallaCarga";


export const DetallesPartido = ({debeValidar}) => {

    const history = useHistory();

    const [datosPartido, setDatosPartido] = useState(null);
    const [faltasLocal, setFaltasLocal] = useState([]);
    const [faltasVisitante, setFaltasVisitante] = useState([]);
    const [golesLocal, setGolesLocal] = useState([]);
    const [golesVisitante, setGolesVisitante] = useState([]);
    const clubLocal = history.location.state.clubLocal;
    const clubVisitante = history.location.state.clubVisitante;
    const idPartido = history.location.state.idPartido;
    const [clubRep, setClubRep] = useState(null);
    const id = localStorage.getItem("id");
    const rol = localStorage.getItem("rol");

    useEffect(async () => {
        const fetchDataPartido = async () => {
            const response = await axios(`http://localhost:8080/encontrarPartido?idPartido=${idPartido}`);
            const newData = response.data;
            setDatosPartido(newData);

        };

        const fetchDataFaltas = async () => {
            const responseFaltasL = await axios.get(`http://localhost:8080/getFaltasByClubAndPartido?idClub=${clubLocal.idClub}&idPartido=${idPartido}`)
            const dataFaltasL = responseFaltasL.data;

            const responseFaltasV = await axios.get(`http://localhost:8080/getFaltasByClubAndPartido?idClub=${clubVisitante.idClub}&idPartido=${idPartido}`)
            const dataFaltasV = responseFaltasV.data;

            setFaltasLocal(dataFaltasL);
            setFaltasVisitante(dataFaltasV);

        }

        const fetchDataGoles = async () => {
            const responseGolesL = await axios.get(`http://localhost:8080/getGolesByPartidoAndClub?idPartido=${idPartido}&idClubAContar=${clubLocal.idClub}&idClubRival=${clubVisitante.idClub}`);
            const responseGolesV = await axios.get(`http://localhost:8080/getGolesByPartidoAndClub?idPartido=${idPartido}&idClubAContar=${clubVisitante.idClub}&idClubRival=${clubLocal.idClub}`);
            const dataGolesL = responseGolesL.data;
            const dataGolesV = responseGolesV.data;

            setGolesLocal(dataGolesL);
            setGolesVisitante(dataGolesV);
        }

        const fetchClubResponsable = async () => {
            const res = await axios.get(`http://localhost:8080/getResponsableById?idResponsable=${id}`)
            setClubRep(res.data.club.idClub);
        }

        await fetchDataPartido();
        await fetchDataFaltas();
        await fetchDataGoles();
        rol === "RESPONSABLE" && await fetchClubResponsable();

    }, []);

    const navbar = () => {
        return rol === "RESPONSABLE" ? <NavBarResponsable/> : <NavBarAdministracion/>
    }
    const HandleClickValidar = ()=>{
        
    }

    const BotonesValidarInvalidar = ()=>{
        if(rol === "RESPONSABLE" && (clubVisitante.idClub === clubRep || clubLocal.idClub === clubRep)){
            return(<div className="SegmentoBotonesValidarInvalidar">
                <Button variant="success" className="BotonesValidarInvalidar" onClick={HandleClickValidar}> VALIDAR PARTIDO </Button>
                <Button variant="success" className="BotonesValidarInvalidar"> INVALIDAR PARTIDO </Button>
            </div>)
        }
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
                   
                    {BotonesValidarInvalidar()}
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
        return (<PantallaCarga/>)
    }
}