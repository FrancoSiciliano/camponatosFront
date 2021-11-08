import { Table,Button,Form } from "react-bootstrap"
import { useLocation,Link } from 'react-router-dom'
import {useEffect, useState} from "react";

import axios from "axios";
import NavBarResponsable from "../NavBars/NavBarResponsable";

import './TablaPartidosCampeonatos.css'
import NavBarAdministracion from "../NavBars/NavBarAdministracion";
export const TablaPartidosCampeonatos=()=>{
  let location = useLocation()
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
        const response = await axios(`http://localhost:8080/getPartidosByCampeonato?idCampeonato=${location.state.id}`);
        const newData = response.data;
        setData(newData);
    };
    fetchData();
},[]);
  if(data){
    return(<div><NavBarAdministracion/>
      <div className="TablaPartidosCampeoantos">
    <Table striped bordered hover>
        <thead>
            <tr><th colSpan="8">{location.state.descrip}</th></tr>
          <tr>
            <th>Fecha</th>
            <th>Nro Zona</th>
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
    var validadoLocal=partido.convalidaLocal
    var validadoVisitante=partido.convalidaVisitante

  return(
    <tr key={index}>
      <td>{partido.nroFecha}</td>
      <td>{partido.nroZona}</td>
      <td>{partido.categoria}</td>
      <td>{partido.clubLocal.nombre}</td>
      <td>{partido.clubVisitante.nombre}</td>
      <td><Button classname="botonesTablasAdministracion" type="submit" class="btn btn-primary btn-sm"><Link to={{pathname:'/detallesPartidos', state:ids}}> Detalles</Link></Button></td>
    </tr>)
  })}
</tbody>
</Table></div></div>)}
else{
  return (<div>
    <NavBarAdministracion/><h1>The server isnt working</h1></div>)
    }}
