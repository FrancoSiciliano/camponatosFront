import React, { useState } from "react";
import validateInfo from "../../FuncionesAdministrador/validacion.js"
import "./CargarDatosPartidos.css"
import { Button } from "react-bootstrap"
import {Form} from 'react-bootstrap'

function CargarDatosPartidos() {
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setErrors(validateInfo(values))
  }
  const [errors, setErrors] = useState({});
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    })
  }

  const [values, setValues] = useState({
    nroFecha: "",
    nroZona: "",
    categoria: "",
    incidentes: "",
    clubLocal: "",
    clubVisitante: "",
    golesLocal: "",
    golesVisitante: "",
    fechaPartido: "",
    campeonato: "",
  })
  return (
    <div className="containerLogin">

      <div className="contenedorCargaDatosPartido">
        <h1>Cargar datos del partido</h1>
        <form>
          <div className="rowCargaResultadosPartidos">

            {errors.campeonato && <p className="errorPartido">{errors.campeonato}</p>}
            <label for="campeonato">Campeonato: </label>
            <Form.Control id="campeonato" type="text" name="campeonato" value={values.campeonato} onChange={handleChange} autoComplete="off" placeholder="Ej: Superliga" />
            
          </div>

          {errors.nroFecha && <p className="errorPartido">{errors.nroFecha}</p>}
          <div className="rowCargaResultadosPartidos">
            <label for="nroFecha">Nro. Fecha: </label>
            <Form.Control  id="nroFecha" type="text" name="nroFecha" value={values.nroFecha} onChange={handleChange} autoComplete="off" placeholder="Ej: Fecha 1" />
          </div>

          {errors.nroZona && <p className="errorPartido">{errors.nroZona}</p>}
          <div className="rowCargaResultadosPartidos">
            <label for="nroZona">Nro. Zona: </label>
            <Form.Control  id="nroZona" type="number" name="nroZona" value={values.nroZona} onChange={handleChange} autoComplete="off" placeholder="Ej: 1" />
          </div>

          {errors.fechaPartido && <p className="error">{errors.fechaPartido}</p>}
          <div className="rowCargaResultadosPartidos">
            <label for="fechaPartido">Fecha Partido:</label>
            <Form.Control  id="fechaPartido" type="date" name="fechaPartido" value={values.fechaPartido} onChange={handleChange} autoComplete="off"/>
          </div>

          {errors.clubLocal && <p className="errorPartido">{errors.clubLocal}</p>}
          <div className="rowCargaResultadosPartidos">
            <label for="clubLocal">Club Local: </label>
            <Form.Control  id="clubLocal" type="text" name="clubLocal" value={values.clubLocal} onChange={handleChange} autoComplete="off" placeholder="Ej: Boca"/>
          </div>

          {errors.clubVisitante && <p className="errorPartido">{errors.clubVisitante}</p>}
          <div className="rowCargaResultadosPartidos">
            <label for="clubVisitante">Club Visitante: </label>
            <Form.Control  id="clubVisitante" type="text" name="clubVisitante" value={values.clubVisitante} onChange={handleChange} autoComplete="off" placeholder="Ej: River"/>
          </div>

          {errors.golesLocal && <p className="errorPartido">{errors.golesLocal}</p>}
          <div className="rowCargaResultadosPartidos">
            <label for="golesLocal">Goles Local: </label>
            <Form.Control  id="golesLocal" type="number" name="golesLocal" value={values.golesLocal} onChange={handleChange} autoComplete="off"/>
          </div>

          {errors.golesVisitante && <p className="errorPartido">{errors.golesVisitante}</p>}
          <div className="rowCargaResultadosPartidos">
            <label for="golesVisitante">Goles Visitante:</label>
            <Form.Control id="golesVisitante" type="number" name="golesVisitante" value={values.golesVisitante} onChange={handleChange} autoComplete="off"/>
          </div>

          {errors.incidentes && <p className="errorPartido">{errors.incidentes}</p>}
          <div className="rowCargaResultadosPartidos">
            <label for="incidentes">Incidentes: </label>
            <Form.Control  id="incidentes" type="text" name="incidentes" value={values.incidentes} onChange={handleChange} autoComplete="off"/>
          </div>
          <div>
            <Button type="submit" className="btn btn-success botonDatosPartido" onClick={handleFormSubmit}>Confirmar</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CargarDatosPartidos

//<TextBox type="text" name="usuario" placeholder="usuario"/>