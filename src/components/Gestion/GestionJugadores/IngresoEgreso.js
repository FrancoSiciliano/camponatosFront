import './IngresoEgreso.css'
import NavBarAdministracion from '../../NavBars/NavBarAdministracion'
import { useHistory, useLocation } from 'react-router';
import {Table, Button} from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from 'react';
import { PopUp } from '../../PopUp/PopUp';
export const IngresoEgreso = () => {
    const history = useHistory();
    const location = useLocation();
    const idPartido = location.state;
    const [miembrosPartido, setMiembrosPartido] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState(null);

   
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
        setMiembrosPartido(copiaMiembros)
        
    }

   
    const handleClick = async (index) => {
        const idJug = miembrosPartido[index].id;
        const ingreso = parseInt(miembrosPartido[index].ingreso);
        const egreso = parseInt(miembrosPartido[index].egreso);
        if(ingreso < 0 || egreso < 0){
            setError("El ingreso y el egreso no puede ser menor a 0");
            setShowModal(true);
            
        }
        else if(ingreso > egreso){
            setError("El ingreso no puede ser mayor al egreso");
            setShowModal(true);
        }
        else if(ingreso === egreso  &&  egreso !== 0 ){
            setError("El ingreso y el egreso no puede ser iguales ");
            setShowModal(true);
        }
        else{ await axios.post(`http://localhost:8080/definirIngresoEgreso?idMiembro=${idJug}&ingreso=${ingreso}&egreso=${egreso}`).catch(e=> alert(e.response.data.message))
        setError("El ingreso y el egreso fueron registrados correctamente");
        setShowModal(true);
 }  }
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
                                <td><Button onClick={() => handleClick(index,)}> CARGAR </Button></td>
                                
                                
                            </tr>
                        )
                    })}
                    </tbody>
                </Table>
            </div>
            
            <Button onClick={()=>history.push("/cargar/datos/partido", idPartido)} className='boton-siguiente-carga'> SIGUIENTE</Button>
            <PopUp show={showModal} onHide={() => setShowModal(false)} text={error} title="Ingreso/Egreso Jugadores"/>

        </div>
    );
}
