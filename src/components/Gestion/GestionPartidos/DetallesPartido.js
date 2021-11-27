import {Table, Button} from "react-bootstrap"
import {useHistory, useLocation} from 'react-router-dom'
import {useEffect, useState} from "react";
import axios from "axios";
import './DetallesPartido.css'
import NavBarResponsable from "../../NavBars/NavBarResponsable";
import NavBarAdministracion from "../../NavBars/NavBarAdministracion";
import {PantallaCarga} from "../../PantallaCarga/PantallaCarga";
import {GiBootKick, GiGoalKeeper} from "react-icons/all";


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
    const [actualizar, setActualizar] = useState(false);
    const [validado, setValidado] = useState(true);
    const [jugadoresLocal, setJugadoresLocal] = useState(null);
    const [jugadoresVisitante, setJugadoresVisitante] = useState(null);

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

        const fetchMiembros = async () => {
            const resL = await axios.get(`http://localhost:8080/getMiembrosByClubAndPartido?idClub=${clubLocal.idClub}&idPartido=${idPartido}`);
            const resV = await axios.get(`http://localhost:8080/getMiembrosByClubAndPartido?idClub=${clubVisitante.idClub}&idPartido=${idPartido}`);
            setJugadoresVisitante(resV.data);
            setJugadoresLocal(resL.data);
        }

        await fetchDataPartido();
        await fetchDataFaltas();
        await fetchDataGoles();
        await fetchMiembros();
        rol === "RESPONSABLE" && await fetchClubResponsable();

    }, [actualizar]);

    const navbar = () => {
        return rol === "RESPONSABLE" ? <NavBarResponsable/> : <NavBarAdministracion/>
    }
    const HandleClickValidar = async () => {
        setValidado(false)
        if (clubVisitante.idClub === clubRep) {
            await axios.post(`http://localhost:8080/validadoByClubVisitante?idClub=${clubRep}&idPartido=${idPartido}`);
            setActualizar(!actualizar);
        } else {
            await axios.post(`http://localhost:8080/validadoByClubLocal?idClub=${clubRep}&idPartido=${idPartido}`);
            setActualizar(!actualizar);
        }
    }
    const HandleClickInvalidar = async () => {
        setValidado(true)
        if (clubVisitante.idClub === clubRep) {
            await axios.post(`http://localhost:8080/validadoByClubVisitante?idClub=${clubRep}&idPartido=${idPartido}`);
            setActualizar(!actualizar);
        } else {
            await axios.post(`http://localhost:8080/validadoByClubLocal?idClub=${clubRep}&idPartido=${idPartido}`);
            setActualizar(!actualizar);
        }
    }

    const BotonesValidarInvalidar = () => {
        if (rol === "RESPONSABLE" && (clubVisitante.idClub === clubRep || clubLocal.idClub === clubRep)) {
            return (<div className="SegmentoBotonesValidarInvalidar">
                <Button variant="success" disabled={validado === false} className="BotonesValidarInvalidar"
                        onClick={HandleClickValidar}> VALIDAR PARTIDO </Button>
                <Button variant="success" disabled={validado === true} className="BotonesValidarInvalidar"
                        onClick={HandleClickInvalidar}> INVALIDAR PARTIDO </Button>
            </div>)
        }
    }

    if (datosPartido) {
        return (
            <div className="container-principal-detalle-partido">
                {navbar()}
                <div className="comparacion-partido">
                    <div className="equipo-detalle-partido">
                        <h1>{datosPartido.clubLocal.nombre}</h1>
                        <Table hover sm className="local">
                            <tbody>
                            <tr>
                                <td>Goles: {golesLocal.length}</td>
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
                        <h1>Jugadores:</h1>
                        <Table hover sm className="local" >
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Ingreso</th>
                                <th>Egreso</th>
                            </tr>
                            </thead>
                            <tbody>
                            {jugadoresLocal && jugadoresLocal.map((miembro, index) => {
                                return (<tr key={index}>
                                    <td>{miembro.jugador.idJugador}</td>
                                    <td>{miembro.jugador.nombre + " " + miembro.jugador.apellido}</td>
                                    <td>{miembro.ingreso}'</td>
                                    <td>{miembro.egreso}'</td>
                                </tr>)
                            })}
                            </tbody>
                        </Table>

                    </div>

                    {BotonesValidarInvalidar()}
                    <div className="equipo-detalle-partido">
                        <h1>{datosPartido.clubVisitante.nombre}</h1>
                        <Table hover sm className="visitante">
                            <tbody>
                            <tr>
                                <td>Goles: {golesVisitante.length}</td>
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
                        <h1>Jugadores:</h1>
                        <Table hover sm className="visitante" >
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Ingreso</th>
                                <th>Egreso</th>
                            </tr>
                            </thead>
                            <tbody>
                            {jugadoresVisitante && jugadoresVisitante.map((miembro, index) => {
                                return (<tr key={index}>
                                    <td>{miembro.jugador.idJugador}</td>
                                    <td>{miembro.jugador.nombre + " " + miembro.jugador.apellido}</td>
                                    <td>{miembro.ingreso}'</td>
                                    <td>{miembro.egreso}'</td>
                                </tr>)
                            })}
                            </tbody>
                        </Table>
                    </div>
                </div>

            </div>

        );
    } else {
        return (<PantallaCarga/>)
    }
}