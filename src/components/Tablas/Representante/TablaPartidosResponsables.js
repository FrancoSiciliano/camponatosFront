import { Table,Button,Form } from "react-bootstrap"
import { useLocation,Link } from 'react-router-dom'
import {useEffect, useState} from "react";
import './TablaPartidosResponsables.css'
import axios from "axios";
export const TablaPartidosResponsables=()=>{
  let location = useLocation()
  console.log(location)
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async (url) => {
        const response = await axios(`http://localhost:8080/getPartidosByClub?idClub=1`);
        const Datanew = response.data;
        setData(Datanew);
    };
    fetchData();
},[]);
const handleClick = () =>{
}

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
      <td><Link className='btn btn-success botonTablaValidar' style={{ textDecoration: 'none', }} to={{pathname:'/partidos/Detalles', state:ids}}> Detalles</Link></td>
      <td><Button classname="botonTablaValidar" type="submit" class="btn btn-success" onClick={handleClick}> Validar</Button></td>
    </tr>)
  })}
</tbody>
</Table></div> )}
else{
  return(<h1>The server isnt working</h1>)
}}
