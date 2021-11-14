import { Table,Button } from "react-bootstrap";
import {useEffect, useState} from "react";
import axios from "axios";
import './PantallaAdministador.css'
import { Link } from "react-router-dom";
import NavBarAdministracion from "../NavBars/NavBarAdministracion";


export const PantallaAdministrador = (props) =>{
  
  const [data, setData] = useState(null);
  useEffect(() => {
        const fetchData = async () => {
        const response = await axios(`http://localhost:8080/getAllPartidos`);
        const newData = response.data;
        setData(newData);};
        fetchData();});
if(data){
    return( 
    <div className = 'contenedorHome'> 
      <NavBarAdministracion/>
      <div className="Administracion">
        <div className="TablaAdministrador scrollable-responsable">
          <Table striped bordered hover sm >
            <thead>
                <tr borderless>
                    <th  colSpan="6">
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
          {data.map((partido, index)=>{
            let fecha= "";
            if(partido.fechaPartido == null){
               fecha = "Sin Cargar"
            }
            else{
               fecha = partido.fechaPartido
            }
          return(
            <tr key={partido.descripcion}>
              <td>{partido.campeonato.descripcion}</td>
              <td>{partido.clubLocal.nombre}</td>
              <td>{partido.clubVisitante.nombre}</td>
              <td>{fecha}</td>
              <td><Link className = 'btn btn-success botonesAdmin-tabla' to="/cargar/datos/partido">Cargar Datos</Link></td>
            </tr>)
          })}
            </tbody>
          </Table>
        </div>
        <div className="botones-columna-admin">
          <Link className="btn btn-success botonesAdmin" to="/registro/campeonato">
              Crear Campeonatos
          </Link>
          
          <Link className="btn btn-success botonesAdmin" to="/crearPartido">
              Crear Partidos
          </Link>
      
          <Link className = 'btn btn-success botonesAdmin' to="/tabla/Campeonatos">
              Ver Tablas
          </Link>
          
        </div>
      </div>
    </div>
  )}
else{
  return(<h1>Server Isnt Working</h1>)
}
}
 
  
  
  

export default PantallaAdministrador;