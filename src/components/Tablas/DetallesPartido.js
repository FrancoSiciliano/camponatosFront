import {Table, Button} from "react-bootstrap"
import {useLocation} from 'react-router-dom'
import {useEffect, useState} from "react";
import axios from "axios";
import './DetallesPartido.css'


export const DetallesPartido = (props) => {
    let location = useLocation();

    const [datosPartido, setDatosPartido] = useState(null);
    const [faltasLocal, setFaltasLocal] = useState(null);
    const [faltasVisitante, setFaltasVisitante] = useState(null);

    useEffect(async () => {
        const fetchDataPartido = async () => {
            const response = await axios(`http://localhost:8080/encontrarPartido?idPartido=1`);
            const newData = response.data;
            setDatosPartido(newData);

        };

        const fetchDataFaltas = async () => {
            const responseFaltasL = await axios.get(`http://localhost:8080/getFaltasByClubAndPartido?idClub=1&idPartido=1`)
            const dataFaltasL = responseFaltasL.data;

            const responseFaltasV = await axios.get(`http://localhost:8080/getFaltasByClubAndPartido?idClub=2&idPartido=1`)
            const dataFaltasV = responseFaltasV.data;

            setFaltasLocal(dataFaltasL);
            setFaltasVisitante(dataFaltasV);
            console.log(dataFaltasL);

        }

        await fetchDataPartido();
        await fetchDataFaltas();
    }, []);

    if (datosPartido && faltasLocal && faltasVisitante) {
        return (<>
            <div className="titulo-partido">
                <h1>{datosPartido.clubLocal.nombre}</h1>
                <h1>VS.</h1>
                <h1>{datosPartido.clubVisitante.nombre}</h1>
            </div>
            <div className="comparacion-partido">
                <Table striped bordered hover sm className="local">
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
                <Table striped bordered hover sm className="visitante">
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
            </div>
        </>);
    } else {
        return (<h1>Nada q mostrar</h1>)
    }
}