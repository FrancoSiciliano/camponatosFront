import { Table,Button } from "react-bootstrap"
import { useLocation } from 'react-router-dom'
import {useEffect, useState} from "react";
import { axios } from "axios";
export const TablaPosicion=(props)=>{
  let location = useLocation()
  console.log(location)
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
        const response = await axios(`http://localhost:8080/getAllPartidosByCampeonato?idCampeonato=`+location.state);
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
            <th>Club</th>
            <th>G</th>
            <th>E</th>
            <th>P</th>
            <th>GA</th>
            <th>GE</th>
            <th>Dif</th>
            <th>Puntos</th>
            <th>Prom</th>
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
  {data.map((tabla,index)=>{

    <tr key={index}>
      <td>{tabla.nroFecha}</td>
      <td>{tabla.nroZona}</td>
      <td>{tabla.categoria}</td>
      <td>{tabla.clubLocal.nombre}</td>
      <td>{tabla.clubVisitante.nombre}</td>
      <td><Button classname="botonesTablas" type="submit" class="btn btn-primary btn-sm">Validar</Button></td>
    </tr>
  })}
</tbody>
</Table>)}
else{
  return (<h1>Cargando...</h1>)
    }}