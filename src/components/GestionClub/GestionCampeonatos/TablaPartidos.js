import { Table,Button } from "react-bootstrap"
import { useLocation } from 'react-router-dom'
import {useEffect, useState} from "react";
import axios from "axios";
export const TablaPartidos=(props)=>{
  let location = useLocation()
  console.log(location)
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
        const response = await axios(`http://localhost:8080/getPartidosByCampeonato?idCampeonato=`+location.state);
        const newData = response.data;
        setData(newData);
    };
    fetchData();
});
  if(data){
    return(
    <Table striped bordered hover>
        <thead>
            <tr><th colSpan="6">Nombre Campeonato</th></tr>
          <tr>
            <th>Fecha</th>
            <th>NroZona</th>
            <th>Categoria</th>
            <th>ClubLocal</th>
            <th>ClubVisitante</th>
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
  {data.map((partido,index)=>{
  return(
    <tr key={index}>
      <td>{partido.nroFecha}</td>
      <td>{partido.nroZona}</td>
      <td>{partido.categoria}</td>
      <td>{partido.clubLocal.nombre}</td>
      <td>{partido.clubVisitante.nombre}</td>
      <td><Button classname="botonesTablas" type="submit" class="btn btn-primary btn-sm">Validar</Button></td>
    </tr>)
  })}
</tbody>
</Table>)}
else{
  return (<h1>Cargando...</h1>)
    }}
