import validacion from "./validacion"
import React, { useState } from "react";


  function CargarDatosPartidos(){
    const handleFormSubmit = async ( event)=>{
      event.preventDefault(); 
      setErrors(validacion(values))
    }
    const [errors,setErrors]= useState({});
    const handleChange = (event) => {
      setValues({
          ...values,
          [event.target.name]: event.target.value,
      })
  }
    
    const [values,setValues]= useState({
      nroFecha:"",
      nroZona :"",
      categoria :"",
      incidentes:"",
      clubLocal:"",
      clubVisitante:"",
      golesLocal:"",
      golesVisitante:"",
      fechaPartido:"",
      campeonato:"",
    })
    return(
    <div className="containerLogin">
      <div className="ContenedorTitulo">
        <h2 className="titulo">Cargar datos del Partido</h2>
      </div>
      <div className="CargarValores">
      <form className="Contendorform">
        <div className="nroFecha">
          <label className="labelPartidos">nroFecha</label>
          <input className="input" type="text" name="nroFecha" value={values.nroFecha} onChange={handleChange} autoComplete="off" placeholder="fecha"/>
        </div>
        {errors.nroFecha && <p className="error">{errors.nroFecha}</p>}
        <div className="nroZona">
          <label className="labelPartidos">nroZona</label>
          <input className="input" type="number"  name="nroZona" value={values.nroZona} onChange={handleChange} autoComplete="off"/>
        </div>
        {errors.nroZona && <p className="error">{errors.nroZona}</p>}
        <div className="incidentes">
          <label className="labelPartidos">incidentes</label>
          <input className="input" type="text" name="incidentes" value={values.incidentes} onChange={handleChange} autoComplete="off"/>
        </div>
        {errors.incidentes && <p className="error">{errors.incidentes}</p>}
        <div className="clubLocal">
          <label className="labelPartidos">clubLocal</label>
          <input className="input" type="text" name="clubLocal" value={values.clubLocal} onChange={handleChange} autoComplete="off"/>
        </div>
        {errors.clubLocal && <p className="error">{errors.clubLocal}</p>}
        <div className="clubVisitante">
          <label className="labelPartidos">clubVisitante</label>
          <input className="input" type="text" name="clubVisitante" value={values.clubVisitante} onChange={handleChange} autoComplete="off"/>
        </div>
        {errors.clubVisitante && <p className="error">{errors.clubVisitante}</p>}
        <div className="golesLocal">
          <label className="labelPartidos">golesLocal</label>
          <input className="input" type="number"  name="golesLocal" value={values.golesLocal} onChange={handleChange} autoComplete="off"/>
        </div>
        {errors.golesLocal && <p className="error">{errors.golesLocal}</p>}
        <div className="golesVisitante">
          <label className="labelPartidos">golesVisitante</label>
          <input className="input" type="number"  name="golesVisitante" value={values.golesVisitante} onChange={handleChange} autoComplete="off"/>
        </div>
        {errors.golesVisitante && <p className="error">{errors.golesVisitante}</p>}
        <div className="fechaPartido">
          <label className="labelPartidos">fechaPartido</label>
          <input className="input" type="date" name="fechaPartido" value={values.fechaPartido} onChange={handleChange} autoComplete="off"/>
        </div>
        {errors.fechaPartido && <p className="error">{errors.fechaPartido}</p>}
        <div className="campeonato">
          <label className="labelPartidos">campeonato</label>
          <input className="input" type="text" name="campeonato" value={values.campeonato} onChange={handleChange} autoComplete="off"/>
        </div>
        {errors.campeonato && <p className="error">{errors.campeonato}</p>}
        <div className="submit-boton">
          <button className="Boton" onClick={handleFormSubmit}> SignUp</button>
        </div>
      </form>
      </div>
      </div>
  )}
    
export default CargarDatosPartidos 

//<TextBox type="text" name="usuario" placeholder="usuario"/>