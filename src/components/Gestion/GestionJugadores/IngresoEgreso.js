import './IngresoEgreso.css'
import NavBarAdministracion from '../../NavBars/NavBarAdministracion'
import { useHistory, useLocation } from 'react-router';
import {Table, Button} from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from 'react';
export const IngresoEgreso = () => {
    const history = useHistory();
    const location = useLocation();
    const idPartido = location.state;
    const [miembrosPartido, setMiembrosPartido] = useState([]);
   
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios(`http://localhost:8080/getMiembroByPartido?idPartido=${idPartido}`);
            const newData = response.data;
            const aux = [];
            newData.forEach(element => {
                aux.push({
                    id: element.idLista,
                    nombre: element.jugador.nombre,
                    apellido: element.jugador.apellido,
                    club: element.club.nombre,
                    ingreso: element.ingreso,
                    egreso: element.egreso
                })
            });

            setMiembrosPartido(aux);
            
        };
        fetchData();
    }, []);

    const handleChange = (event, index, esIngreso) => {
        const copiaMiembros = miembrosPartido.slice();
        if(esIngreso){
            copiaMiembros[index].ingreso = event.target.value;
        }else{
            copiaMiembros[index].egreso = event.target.value;
        }
        console.log(copiaMiembros[index])
        setMiembrosPartido(copiaMiembros)
        
    }

   
    const handleClick = async (index) => {
        const idJug = miembrosPartido[index].id;
        const ingreso = parseInt(miembrosPartido[index].ingreso);
        const egreso = parseInt(miembrosPartido[index].egreso);
        await axios.post(`http://localhost:8080/definirIngresoEgreso?idMiembro=${idJug}&ingreso=${ingreso}&egreso=${egreso}`).catch(e=> alert(e.response.data.message))
    }
    return(
        <div className='ingreso-egreso-principal'>
            
            <NavBarAdministracion/>
            
            <div className="IngresoEgresoJugadores">
                <Table striped bordered hover sm>
                    <thead>
                        <tr borderless>
                            <th colSpan="7">
                                Ingreso / Egreso de Jugadores
                            </th>
                        </tr>
                        <tr>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Club</th>
                            <th>Ingreso</th>
                            <th>Egreso</th>
                            <th>Cargar Ingreso</th>
                            <th>Cargar Egreso</th>
                            <th></th>         
                        </tr>
                    </thead>
                    <tbody>
                    {miembrosPartido.map((miembro,index)=>{
                        return(
                            <tr>
                                <td>{miembro.nombre}</td>
                                <td>{miembro.apellido}</td>
                                <td>{miembro.club}</td>
                                <td>{miembro.ingreso}</td>
                                <td>{miembro.egreso}</td>
                                <td><input onChange={(event)=> handleChange(event, index, true)} value={miembro.ingreso} type='number' placeholder='Ingreso'/></td>
                                <td><input onChange={(event)=> handleChange(event, index, false)} value={miembro.egreso} type='number' placeholder='Egreso'/></td>
                                <td><Button onClick={() => handleClick(index)}> CARGAR </Button></td>
                                
                            </tr>
                        )
                    })}
                    </tbody>
                </Table>
            </div>
            <Button onClick={()=>history.push("/cargar/datos/partido", idPartido)} className='boton-siguiente-carga'> SIGUIENTE</Button>
        </div>
    );
}
