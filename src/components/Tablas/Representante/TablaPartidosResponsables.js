import {Spinner, Table} from "react-bootstrap"
import { useHistory} from 'react-router-dom'
import {useEffect, useState} from "react";
import './TablaPartidosResponsables.css'
import axios from "axios";
import {Button} from "react-bootstrap";
import {PantallaCarga} from "../../PantallaCarga/PantallaCarga";

export const TablaPartidosResponsables = () => {
    const history = useHistory();
    const [data, setData] = useState(null);
    const [responsable, setResponsable] = useState(null);
    const idResponsable = localStorage.getItem("id");
    const [clubResponsable, setClubResponsable] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const respuesta = await axios(`http://localhost:8080/getResponsableById?idResponsable=${idResponsable}`)
                const res = respuesta.data;
                setResponsable(res);
                setClubResponsable(res.club.idClub);
                const response = await axios(`http://localhost:8080/getPartidosByClub?idClub=${res.club.idClub}`);
                const Datanew = response.data;
                setData(Datanew);
                console.log('partidos-> ', data)
            } catch (e) {
            }
        };
        fetchData();
    }, []);
    const datosCargados = (partido) =>{
        if(partido.golesLocal === null && partido.golesVisitante === null){
            return false;
        }else{
            return true;
        }

    }
    const handleClickDetalles = (partido) => {
        history.push("/detalles/partidos", {
            idPartido: partido.idPartido,
            clubLocal: partido.clubLocal,
            clubVisitante: partido.clubVisitante,
            clubResponsable: clubResponsable
        })
    }

    const estaValidado = (partido) => {
        if (partido.clubLocal.idClub === responsable.club.idClub) {
            if (partido.convalidaLocal === true) {
                return true;
            } else {
                return false;
            }
        } else {
            if (partido.convalidaVisitante === true) {
                return true;
            } else {
                return false;
            }

        }

    }

        return (
            <div className="TablaPartidosResponsables scrollable-responsable">
                <Table striped bordered hover sm responsive="md">
                    <thead>
                    <tr>
                        <th colSpan="8" className='tituloTablaPartidos'>Partidos A Validar</th>
                    </tr>
                    <tr>
                        <th>Fecha</th>
                        <th>Categoria</th>
                        <th>Club Local</th>
                        <th>Club Visitante</th>
                        <th>Campeonato</th> 
                        <th>Detalles del partido</th>

                    </tr>
                    </thead>
                    <tbody>
                    {data && data.map((partido, index) => {
                        if (!estaValidado(partido) && datosCargados(partido)) {
                            return (
                                <tr key={index}>
                                    <td>{partido.nroFecha}</td>
                                    <td>{partido.categoria}</td>
                                    <td>{partido.clubLocal.nombre}</td>
                                    <td>{partido.clubVisitante.nombre}</td>
                                    <td>{partido.campeonato.descripcion}</td>
                                    <td><Button className='btn btn-success botonTablaValidar'
                                                onClick={() => handleClickDetalles(partido)}> Detalles</Button></td>
                                </tr>)
                        }
                    })}
                    </tbody>
                </Table></div>)
}
