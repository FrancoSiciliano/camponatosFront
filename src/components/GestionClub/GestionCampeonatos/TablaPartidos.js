import { Table,Button } from "react-bootstrap"
import { useLocation,Link } from 'react-router-dom'
import {useEffect, useState} from "react";
import './Listado.css'
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
      <div className="Tabla">
    <Table striped bordered hover>
        <thead>
            <tr><th colSpan="8">Nombre Campeonato</th></tr>
          <tr>
            <th>Fecha</th>
            <th>Nro Zona</th>
            <th>Categoria</th>
            <th>Club Local</th>
            <th>Club Visitante</th>
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
    var ids=partido.idPartido
    var validadoLocal=partido.convalidaLocal
    var validadoVisitante=partido.convalidaVisitante
  
  return(
    <tr key={index}>
      <td>{partido.nroFecha}</td>
      <td>{partido.nroZona}</td>
      <td>{partido.categoria}</td>
      <td>{partido.clubLocal.nombre}</td>
      <td>{partido.clubVisitante.nombre}</td>
      <td><Button classname="botonesTablas" type="submit" class="btn btn-primary btn-sm"><Link to={{pathname:'/detallesPartidos', state:ids}}> Detalles</Link></Button></td>
      <td><Button classname="botonesTablas" type="submit" class="btn btn-primary btn-sm"> Validar</Button></td>
    </tr>)
  })}
</tbody>
</Table></div>)}
else{
  return (<h1>No se crearon Partidos para este campeonato</h1>)
    }}
