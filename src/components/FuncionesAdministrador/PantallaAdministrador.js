import {Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import axios from "axios";
import './PantallaAdministador.css'
import {Link} from "react-router-dom";
import NavBarAdministracion from "../NavBars/NavBarAdministracion";
import {PantallaCarga} from "../PantallaCarga/PantallaCarga";


export const PantallaAdministrador = (props) => {

    const [data, setData] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios(`http://localhost:8080/getPartidosNoCargados`);
            const newData = response.data;
            setData(newData);
        };

        fetchData();
    });
    const isSinCargarDatos = async (idPartido) =>{
        const respuesta = await axios(`http://localhost:8080/encontrarPartido?idPartido=${idPartido}`)
        const res = respuesta.data;
        if(!res.golesLocal || !res.golesVisitante ){
            return true;
        }
        else{
            return false;
        }

    }
    if (data) {
        return (
            <div className='contenedorHome'>
                <NavBarAdministracion/>
                <div className="Administracion">
                    <div className="TablaAdministrador scrollable-responsable">
                        <Table striped bordered hover sm>
                            <thead>
                            <tr borderless>
                                <th colSpan="6">
                                    Listado de Partidos a cargar
                                </th>
                            </tr>
                            <tr>
                                <th>Camp</th>
                                <th>Club L</th>
                                <th>Club V</th>
                                <th>Fecha</th>
                                <th>Cargar datos</th>
                            </tr>
                            </thead>
                            <tbody>
                            {data.map((partido, index) => {
                                let idPartido = partido.idPartido
                                if(isSinCargarDatos(partido)){
                                return (
                                    <tr key={partido.descripcion}>
                                        <td>{partido.campeonato.descripcion}</td>
                                        <td>{partido.clubLocal.nombre}</td>
                                        <td>{partido.clubVisitante.nombre}</td>
                                        <td>{partido.fechaPartido ? partido.fechaPartido : "Sin cargar"}</td>
                                        <td><Link className='btn btn-success botonesAdmin-tabla' 
                                                  to={{pathname:"/cargar/datos/partido/ingresoEgreso",state:idPartido}}>Cargar Datos</Link>
                                        </td>
                                    </tr>)
                                }})}
                            </tbody>
                        </Table>
                    </div>
                    <div className="botones-columna-admin">
                        <Link className="btn btn-success botonesAdmin" to="/registro/campeonato">
                            Crear Campeonatos
                        </Link>

                        <Link className="btn btn-success botonesAdmin" to="/crear/partido">
                            Crear Partidos
                        </Link>

                        <Link className='btn btn-success botonesAdmin' to="/administracion/campeonatos">
                            Ver Tablas
                        </Link>

                    </div>
                </div>
            </div>
        )
    } else {
        return (<PantallaCarga/>)
    }
}

export default PantallaAdministrador;