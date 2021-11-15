import { useState } from "react";
import { Table } from "react-bootstrap";
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './SeleccionCampeonatoADefinir.css'
import NavBarAdministracion from "../../NavBars/NavBarAdministracion";

export const SeleccionCampeonatoADefinir = ()=>{
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios('http://localhost:8080/getCampeonatosADefinir')
            const data = response.data;
            setData(data);
        };
        fetchData();
    }, [])
    return (
        <div>
            <NavBarAdministracion/>

            <div className = "main-container-registro">
            
                <div className = 'tablaCampeonatosADefinir'>
                    <Table striped bordered hover sm >
                        <thead>
                            <tr borderless>
                                <th  colSpan="6">
                                CAMPEONATOS DE ZONAS A DEFINIR
                                </th>
                            </tr>
                            <tr>
                                <th>Campeonato</th>
                                <th>Fecha inicio</th>
                                <th>Fecha fin</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((campeonato, index)=>{ 
                            return(
                            <tr key={campeonato.idCampeonato}>
                                <td>{campeonato.descripcion}</td>
                                <td>{campeonato.fechaInicio}</td>
                                <td>{campeonato.fechaFin}</td>
                                <td><Link className = 'btn btn-success botonesAdmin-tabla' to="/crear/partido">Crear Partidos</Link></td>
                            </tr>)
                            })}
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
        
    );
}