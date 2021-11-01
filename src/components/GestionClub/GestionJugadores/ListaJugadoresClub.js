import { Table,Button } from "react-bootstrap";
import '../GestionJugadores/ListaJugadoresClub.css'
import {useEffect, useState} from "react";
import axios from "axios";
import NavBarClub from "../../NavBars/NavBarClub";


export const ListaJugadoresClub = (props) =>{
    const [data, setData] = useState(null);
    useEffect(() => {
          const fetchData = async () => {
          const response = await axios(`http://localhost:8080/getJugadores`);
          const newData = response.data;
          setData(newData);};
          fetchData();});
  if(data){
      return( <div>
              <NavBarClub/>
              <div className="TablaJugadores">
              <Table striped bordered hover sm >
                <thead>
                    <tr borderless>
                        <th  colSpan="15">
                          Jugadores del Club
                        </th>
                      </tr>
                  <tr>
                  <th>#</th>
                  <th>Nombre</th>
                  <th>apellido</th>
                  <th>tipoDocumento</th>
                  <th>documento</th>
                  <th>direccion</th>
                  <th>mail</th>
                  <th>telefono</th>
                  <th>categoria</th>
                  <th>fechaNacimiento</th>
                  <th>fechaAlta</th>
                  <th>estado</th>
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
              {data.map((jugadores, index)=>{
              return(
                <tr>
                  <td>{jugadores.idJugador}</td>
                  <td>{jugadores.nombre}</td>
                  <td>{jugadores.apellido}</td>
                  <td>{jugadores.tipoDocumento}</td>
                  <td>{jugadores.documento}</td>
                  <td>{jugadores.direccion}</td>
                  <td>{jugadores.mail}</td>
                  <td>{jugadores.telefono}</td>
                  <td>{jugadores.categoria}</td>
                  <td>{jugadores.fechaNacimiento}</td>
                  <td>{jugadores.fechaAlta}</td>
                  <td>{jugadores.estado}</td>
                  <td><Button classname="botonesTablas" type="submit" class="btn btn-primary btn-sm">Modificar</Button></td>
                  <td><Button classname="botonesTablas" type="submit" class="btn btn-primary btn-sm"> Eliminar</Button></td>
                </tr>)
              })}
            </tbody>
            </Table>
            </div></div>)}
  else{
    return(<h1>Oye que a pasado</h1>)
  }
  }
   
    
    
    
  
  export default ListaJugadoresClub;