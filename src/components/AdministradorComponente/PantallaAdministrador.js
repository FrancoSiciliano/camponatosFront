import { Table,Button } from "react-bootstrap";
import './Listado.css'
import {useEffect, useState} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import NavBarClub from "../../NavBars/NavBarClub";


//<td><Button type="submit" class="btn btn-primary btn-sm">Tabla</Button></td>
//<td><Button type="submit" onClick={"GenerarPartidos"} class="btn btn-primary btn-sm"> <Link to="/TablaPartidos"> Partidos</Link></Button></td>
export const Listado = (props) =>{
  const [data, setData] = useState(null);
  useEffect(() => {
        const fetchData = async () => {
        const response = await axios(`http://localhost:8080/getCampeonatosByClub?idClub=1`);
        const newData = response.data;
        setData(newData);};
        fetchData();});
if(data){
    return( <div>
            <NavBarClub/>
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
                <th colSpan="2">
                  <form  classname ="searchBar" onsubmit="event.preventDefault();" role="search">
                  <input classname="searchBox"
                  id="search" type="search" placeholder="Filtrar por Nombre" autofocus required />
                  <button type="button" classname="botonsearch">search</button>
          </form>
          </th>
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
                <td>{partido.NroFecha}</td>
              </tr>)
            })}
          </tbody>
          </Table>
          </div></div>)}
else{
  return(<h1>Oye que a pasado</h1>)
}
}
 
  
  
  

export default Listado;