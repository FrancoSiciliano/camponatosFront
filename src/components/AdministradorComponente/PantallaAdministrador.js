import { Table,Button } from "react-bootstrap";
import {useEffect, useState} from "react";
import axios from "axios";
import './PantallaAdministador.css'
import { Link } from "react-router-dom";
import NavBarAdministracion from "../NavBars/NavBarAdministracion";

//<td><Button type="submit" class="btn btn-primary btn-sm">Tabla</Button></td>
//<td><Button type="submit" onClick={"GenerarPartidos"} class="btn btn-primary btn-sm"> <Link to="/TablaPartidos"> Partidos</Link></Button></td>
export const PantallaAdministrador = (props) =>{
  
  const [data, setData] = useState(null);
  useEffect(() => {
        const fetchData = async () => {
        const response = await axios(`http://localhost:8080/getPartidosByCampeonato?idCampeonato=1`);
        const newData = response.data;
        setData(newData);};
        fetchData();});
if(data){
    return( <div> <NavBarAdministracion/><div className="Administracion">
           
            <div className="Tabla">
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
               var ids=partido.idPartido
            return(
              <tr key={partido.descripcion}>
                <td>{partido.campeonato.descripcion}</td>
                <td>{partido.clubLocal.nombre}</td>
                <td>{partido.clubVisitante.nombre}</td>
                <td>{partido.fechaPartido}</td>
                <td><Button classname="botonesTablas" type="submit" class="btn btn-primary btn-sm"><Link to="/cargarDatosPartido">Cargar Datos</Link></Button></td>
              </tr>)
            })}
          </tbody>
          </Table>
          </div>
          <div className="d-grid">
          <Button className ="botonesAdmin" variant="primary" size="sm"><Link to="/registroCampeonato">
                Crear Campeonatos
                </Link>
              </Button>
            <Button className="botonesAdmin" variant="primary" size="sm">
                Crear Partidos
            </Button>
            <Button className="botonesAdmin" variant="primary" size="sm">
                Ver Tablas
              </Button>
          </div>
          </div>
          </div>)}
else{
  return(<h1>Oye que a pasado</h1>)
}
}
 
  
  
  

export default PantallaAdministrador;