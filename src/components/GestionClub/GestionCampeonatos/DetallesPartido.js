import { Table,Button } from "react-bootstrap"
import { useLocation } from 'react-router-dom'
import {useEffect, useState} from "react";
import axios from "axios";
export const DetallesPartido=()=>{
  let location = useLocation()
  console.log(location)
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
        const response = await axios(`http://localhost:8080/encontrarPartido?idPartido=2`);
        const newData = response.data;
        setData(newData);
    };
    fetchData();
});
console.log(data)
  if(data){
    data.map((partido,index)=>{
    return(
    <form className="Detalles">
    <label className="Detalles-Label">NroFecha:{partido.nroFecha}</label>
    <label className="Detalles-Label">NroZona:{partido.nroZona}</label>
    <label className="Detalles-Label">Categoria:{partido.categoria}</label>
    <label className="Detalles-Label">Incidentes:{partido.incidentes}</label>
    <label className="Detalles-Label">Club Local:{partido.clubLocal.nombre}</label>
    <label className="Detalles-Label">Club Visitante:{partido.clubVisitante.nombre}</label>
    <label className="Detalles-Label">Goles Locales:{partido.golesLocal}</label>
    <label className="Detalles-Label">Goles Visitantes:{partido.golesVisitante}</label>
    <label className="Detalles-Label">Campeonato:{partido.campeonato.descripcion}</label>
    <label className="Detalles-Label">Jugadores Locales:{partido.nroFecha}</label>
    <label className="Detalles-Label">Jugadores Visitantes:{partido.nroFecha}</label>
    <label className="Detalles-Label">Jugadores Locales:{partido.nroFecha}</label>
    <label className="Detalles-Label">Faltas:{partido.nroFecha} </label>
    <label className="Detalles-Label">Goles:{partido.nroFecha} </label>
    </form>
    )})}
else{
  return (<h1>No se crearon Partidos para este campeonato</h1>)
    }}
