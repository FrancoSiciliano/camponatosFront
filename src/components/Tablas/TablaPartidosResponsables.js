import { Table,Button,Form } from "react-bootstrap"
import { useLocation,Link } from 'react-router-dom'
import {useEffect, useState} from "react";
import './TablaPartidosResponsables.css'
import axios from "axios";
export const TablaPartidosResponsables=()=>{
  let location = useLocation()
  console.log(location)
  var links=`http://localhost:8080/getPartidosByClubLocal?idClub=1`
  var links2=`http://localhost:8080/getPartidosByClubVisitante?idClub=1`
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async (url) => {
        const response = await axios(url);
        const Datanew = response.data;
        setData(Datanew);
    };
    fetchData(links);
    console.log(fetchData(links))
},[]);

  if(data){
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
            <th colSpan="2">
            <Form.Control classname="searchBox"
                                          id="search" type="search" placeholder="Filtrar por Nombre"
                                          onChange={""} autoComplete="off"/>
</th>
    </tr>
  </thead>
  <tbody>
  {data.map((partido,index)=>{
    var ids=partido.idPartido
  return(
    <tr key={index}>
      <td>{partido.nroFecha}</td>
      <td>{partido.categoria}</td>
      <td>{partido.clubLocal.nombre}</td>
      <td>{partido.clubVisitante.nombre}</td>
      <td><Link className='btn btn-success botonTablaValidar' style={{ textDecoration: 'none', }} to={{pathname:'/detallesPartidos', state:ids}}> Detalles</Link></td>
      <td><Button classname="botonTablaValidar" type="submit" class="btn btn-primary btn-sm"> Validar</Button></td>
    </tr>)
  })}
</tbody>
</Table></div> )}
else{
  return(<h1>The server isnt working</h1>)
}}
