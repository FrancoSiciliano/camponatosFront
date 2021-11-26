import './IngresoEgreso.css'
import NavBarAdministracion from '../../NavBars/NavBarAdministracion'
import { useLocation } from 'react-router';
import {Table,Button} from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from 'react';
export const IngresoEgreso = () => {
    const location = useLocation();
    const idPartido = location.state;
    const [miembroPartido, setMiembroPartido] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios(`http://localhost:8080/getMiembroByPartido?idPartido=${idPartido}`);
            const newData = response.data;
            setMiembroPartido(newData);
        };
        fetchData();
    }, []);

    return(
        <div className='contenedor-principal-ingreso-egreso'>
            <NavBarAdministracion/>
            <div className="IngresoEgresoJugadores scrollable-responsable">
            <Table striped bordered hover sm>
            <thead>
                <tr borderless>
                    <th colSpan="6">
                        Ingreso Egreso de Jugadores
                    </th>
                </tr>
                <tr>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Ingreso</th>
                    <th>Egreso</th>
                    <th><Button>Cargar Datos</Button></th>
                </tr>
            </thead>
            <tbody>
            {miembroPartido.map((mimebro,index)=>{
                return(
                    <tr>
                        <td>{mimebro.jugador.nombre}</td>
                        <td>{mimebro.jugador.apellido}</td>
                        <td><input></input></td>
                        <td><input></input></td>

                    </tr>
                )
            })}
            </tbody>
            </Table>
            </div>
        </div>
    );
}
