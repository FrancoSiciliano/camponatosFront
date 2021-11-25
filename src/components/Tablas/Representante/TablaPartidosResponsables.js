import {Table} from "react-bootstrap"
import {Link, useHistory} from 'react-router-dom'
import {useEffect, useState} from "react";
import './TablaPartidosResponsables.css'
import axios from "axios";
import {Button} from "react-bootstrap";

export const TablaPartidosResponsables = (props) => {
    const history = useHistory();
    const [data, setData] = useState(null);
    const [responsable, setResponsable] = useState(null);
    const idResponsable = localStorage.getItem("id")
    useEffect(() => {
        const fetchData = async () => {
            const respuesta = await axios(`http://localhost:8080/getResponsableById?idResponsable=${idResponsable}`)
            const res = respuesta.data;
            setResponsable(res);
            const response = await axios(`http://localhost:8080/getPartidosByClub?idClub=${res.club.idClub}`);
            const Datanew = response.data;
            setData(Datanew);
        };
        fetchData();
    }, []);
    const handleClickDetalles = (partido) => {
        history.push("/detalles/partidos", {
            idPartido: partido.idPartido,
            clubLocal: partido.clubLocal,
            clubVisitante: partido.clubVisitante,
            rol: "RESPONSABLE"
        })
    }
    const estaValidado = (partido) => {
        console.log(responsable)
        console.log(partido)
        if (partido.clubLocal.idClub === responsable.club.idClub) {
            if (partido.convalidaLocal == true) {
                return true;
            } else {
                return false;
            }
        } else {
            if (partido.convalidaVisitante == true) {
                return true;
            } else {
                return false;
            }

        }

    }

    if (data) {
        return (
            <div className="TablaPartidosResponsables scrollable-responsable">
                <Table responsive="md">
                    <thead>
                    <tr>
                        <th colSpan="8" className='tituloTablaPartidos'>Partidos A Validar</th>
                    </tr>
                    <tr>
                        <th>Fecha</th>
                        <th>Categoria</th>
                        <th>Club Local</th>
                        <th>Club Visitante</th>
                        <th>Detalles del partido</th>

                    </tr>
                    </thead>
                    <tbody>
                    {data.map((partido, index) => {
                        var partido = partido
                        if (!estaValidado(partido)) {
                            return (
                                <tr key={index}>
                                    <td>{partido.nroFecha}</td>
                                    <td>{partido.categoria}</td>
                                    <td>{partido.clubLocal.nombre}</td>
                                    <td>{partido.clubVisitante.nombre}</td>
                                    <td><Button className='btn btn-success botonTablaValidar'
                                                onClick={() => handleClickDetalles(partido)}> Detalles</Button></td>
                                </tr>)
                        }
                    })}
                    </tbody>
                </Table></div>)
    } else {
        return (<h1>The server isnt working</h1>)
    }
}
