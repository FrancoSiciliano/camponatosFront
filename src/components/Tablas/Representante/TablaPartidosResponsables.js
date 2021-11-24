import { Table} from "react-bootstrap"
import { Link } from 'react-router-dom'
import {useEffect, useState} from "react";
import './TablaPartidosResponsables.css'
import axios from "axios";
export const TablaPartidosResponsables=(props)=>{
  const [clubVisitante, setClubVisitante] = useState(null);
  const [clubLocal,setClubLocal]= useState(null);
  const [responsable, setResponsable] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const respuesta = await axios(`http://localhost:8080/getResponsableById?idResponsable=${props.id}`)
      const res = respuesta.data;
      setResponsable(res);
      const repuestaclubVisitante = await axios(`http://localhost:8080/getPartidosByClubVisitante?idClub=${res.club.idClub}`);
      const clubvisitante = repuestaclubVisitante.data;
      setClubVisitante(clubvisitante);
      const repuestaClubLocal = await axios(`http://localhost:8080/getPartidosByClubLocal?idClub=${res.club.idClub}`);
      const clublocal = repuestaClubLocal.data;
      setClubLocal(clublocal);
    };
    fetchData();
},[]);
const estaValidado = (partido) =>{
  if(partido.clubLocal.idClub === responsable.club.idClub){
    if(partido.convalidaLocal === true){
      return true;
    }
    else{
      return false;
    }
  }
  else{
    if(partido.convalidaVisitante === true){
      return true;
    }
    else{
      return false;
    }
  
  }

}

  if(clubLocal){
    return(
    <div className="TablaPartidosResponsables scrollable-responsable">
    <Table responsive="md">
        <thead>
            <tr><th colSpan="8" className= 'tituloTablaPartidos'>Partidos A Validar</th></tr>
          <tr>
            <th>Fecha</th>
            <th>Categoria</th>
            <th>Club Local</th>
            <th>Club Visitante</th>
            <th>Detalles del partido</th>

    </tr>
  </thead>
  <tbody>
  {clubLocal.map((partido,index)=>{
    var idPartido=partido.idPartido
    if(partido.convalidaLocal == false){
  return(
    <tr key={index}>
      <td>{partido.nroFecha}</td>
      <td>{partido.categoria}</td>
      <td>{partido.clubLocal.nombre}</td>
      <td>{partido.clubVisitante.nombre}</td>
      <td><Link className='btn btn-success botonTablaValidar' style={{ textDecoration: 'none', }} to={{pathname:'/detalles/partidos/responsables', state:idPartido}}> Detalles</Link></td>
    </tr>)
  }})}
  {clubVisitante.map((partido,index)=>{
    var idPartido=partido.idPartido
    if(partido.convalidaVisitante == false){
  return(
    <tr key={index}>
      <td>{partido.nroFecha}</td>
      <td>{partido.categoria}</td>
      <td>{partido.clubLocal.nombre}</td>
      <td>{partido.clubVisitante.nombre}</td>
      <td><Link className='btn btn-success botonTablaValidar' style={{ textDecoration: 'none', }} to={{pathname:'/detalles/partidos/responsables', state:idPartido}}> Detalles</Link></td>
    </tr>)
  }})}
</tbody>
</Table></div> )}
else{
  return(<h1>The server isnt working</h1>)
}}
