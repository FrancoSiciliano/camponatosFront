import {Table} from "react-bootstrap"
import {useEffect, useState} from "react";
import axios from "axios";
import NavbarJugador from "../NavBars/NavBarJugador"
import NavBarResponsable from "../NavBars/NavBarResponsable";
import NavBarAdministracion from "../NavBars/NavBarAdministracion";
import {useHistory} from "react-router-dom";

export const TablaPosicion = (props) => {
    const history = useHistory();
    const [tablaPosiciones, setTablaPosiciones] = useState(null);

    useEffect(() => {
        const fetchData = async () => {

            const response = await axios(`http://localhost:8080/getTablaPosicionesByCampeonato?idCampeonato=${history.location.state.campeonato}`);

            const newData = response.data;
            setTablaPosiciones(newData);
        };
        fetchData();
    });

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
        return (
            <div>
                {navbar()}
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th colSpan="6">Nombre Campeonato: {tablaPosiciones[0].campeonato.descripcion}</th>
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
        return (<div>
            {navbar()}
            <h1>No existe Tabla posicion para el campeonato</h1>
        </div>)
    }
}
