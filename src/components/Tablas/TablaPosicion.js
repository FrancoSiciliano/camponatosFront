import {Table} from "react-bootstrap"
import {useEffect, useState} from "react";
import axios from "axios";
import NavbarJugador from "../NavBars/NavBarJugador"
import NavBarResponsable from "../NavBars/NavBarResponsable";
import NavBarAdministracion from "../NavBars/NavBarAdministracion";
import {useHistory} from "react-router-dom";
import {Spinner} from "react-bootstrap";

export const TablaPosicion = (props) => {
    const history = useHistory();
    const [tablaPosiciones, setTablaPosiciones] = useState(null);
    const [campeonato, setCampeonato] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            const camp = await axios(`http://localhost:8080/encontrarCampeonato?idCampeonato=${history.location.state.campeonato}`)
            const newCamp = camp.data;
            setCampeonato(newCamp);
            if (newCamp.tipoCampeonato == 'Puntos') {
                const response = await axios(`http://localhost:8080/getTablaPosicionesByCampeonato?idCampeonato=${history.location.state.campeonato}`);
                const newData = response.data;
                setTablaPosiciones(newData);

            } else {
                const response = await axios(`http://localhost:8080/getTablaPosicionesByZona?idCampeonato=${history.location.state.campeonato}`);
                const newData = response.data;
                setTablaPosiciones(newData);
            }

        };
        fetchData();
    }, []);

    const navbar = () => {
        if (history.location.state.tipo === "RESPONSABLES") {
            return (<NavBarResponsable id={localStorage.getItem("id")}/>);
        } else if (history.location.state.tipo === "ADMINISTRADOR") {
            return (<NavBarAdministracion/>);
        } else if (history.location.state.tipo === "JUGADOR") {
            return (<NavbarJugador/>);
        }
    }

    if (tablaPosiciones) {
        if (campeonato.tipoCampeonato == 'Puntos') {
            return (
                <div>
                    {navbar()}
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th colSpan="12">{campeonato.descripcion}</th>
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
                        </tr>
                        </thead>
                        <tbody>
                        {tablaPosiciones.map((tabla, index) => {
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
            return (
                <div>
                    {navbar()}
                    {
                        tablaPosiciones.map((tabla, index) => {
                            return (
                                <Table striped bordered hover>
                                    <thead>
                                    <tr>
                                        <th colSpan="12">{campeonato.descripcion} - Zona: {index + 1}</th>
                                    </tr>
                                    <tr>
                                        <th style={{width:'300px'}}>Club</th>
                                        <th>J</th>
                                        <th>G</th>
                                        <th>E</th>
                                        <th>P</th>
                                        <th>GA</th>
                                        <th>GE</th>
                                        <th>Dif</th>
                                        <th>Puntos</th>
                                        <th>Prom</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        tabla.map((elemento) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{elemento.id.nombre}</td>
                                                    <td>{elemento.cantidadJugados}</td>
                                                    <td>{elemento.cantidadGanados}</td>
                                                    <td>{elemento.cantidadEmpatados}</td>
                                                    <td>{elemento.cantidadPerdidos}</td>
                                                    <td>{elemento.golesFavor}</td>
                                                    <td>{elemento.golesContra}</td>
                                                    <td>{elemento.diferenciaGoles}</td>
                                                    <td>{elemento.puntos}</td>
                                                    <td>{elemento.promedio}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                    </tbody>
                                </Table>
                            )
                        })
                    }

                </div>)
        }

    } else {
        return (<div>
            {navbar()}
            <Spinner animation="border"/>
            <p style={{position: "relative", top: "-23px", fontSize: "50px"}}>Cargando...</p>
        </div>)
    }
}
