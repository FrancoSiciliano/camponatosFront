import React, { useState, useEffect } from "react";
import validateInfo from "../../FuncionesAdministrador/validacion.js"
import "./CargarDatosPartidos.css"
import { Button } from "react-bootstrap"
import { Form } from 'react-bootstrap'
import { Col, FloatingLabel, Row, Modal, Table } from "react-bootstrap"
import {  useLocation } from "react-router-dom";
import axios from "axios";


export const CargarDatosPartidos = () => {

  const location = useLocation();
  const [faltas, setFaltas] = useState([]);
  const [goles, setGoles] = useState([]);
  const [errors, setErrors] = useState({});
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [values, setValues] = useState({incidentes: "", jugadorGol: "",
    tipoGol: "",
    minutoGol: "",
    tipoFalta: "",
    jugadorFalta: "",
    minutoFalta: ""
  })

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setErrors(validateInfo(values))
  }
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  const [datos, setDatos] = useState({
    idJugadorGol: "",
    tipoGol: "",
    minutoGol: "",
});

const [jugadorSeleccionado,setJugadorSeleccionado]=useState(null);
const handleChangeJugadorSelect = (event) => {
  setJugadorSeleccionado(event.target.value);
}
const [datosFalta, setDatosFalta] = useState({
  tipoFalta: "",
  minutoFalta: "",
});


  useEffect(() => {
    const fetchData = async () => {
      const response = await axios(`http://localhost:8080/getMiembroByPartido?idPartido=${location.state}`);
      const newData = response.data;
      setData(newData);

      const golesRepuesta = await axios(`http://localhost:8080/getGolesByPartido?idPartido=${location.state}`);
      const golesData = golesRepuesta.data;
      setGoles(golesData);

      const faltasRepuesta = await axios(`http://localhost:8080/getFaltasPartido?idPartido=${location.state}`);
      const faltasData = faltasRepuesta.data;
      setFaltas(faltasData);
      
      
    };
    fetchData();
  }, []);


  const handleChange = (event) => {

    setValues({
      ...values,
      [event.target.name]: event.target.value,
    })

  }


  const handleChangeGoles = (event) => {
    setDatos({
        ...datos,
        [event.target.name]: event.target.value,
    })
}


const handleChangeFaltas = (event) => {
  setDatosFalta({
      ...datosFalta,
      [event.target.name]: event.target.value,
  })
}

const handleClickGol = () => {
  console.log(jugadorSeleccionado)
  console.log(location.state)
  console.log(datos.minutoGol)
  console.log(datos.tipoGol)
  axios.post(`http://localhost:8080/cargarGol?idJugador=${jugadorSeleccionado}&idPartido=${location.state}&minuto=${datos.minutoGol}&tipo=${datos.tipoGol}`)
}

const handleClickFalta = () => {
  axios.post(`http://localhost:8080/cargarFalta?idJugador=${datosFalta.idJugadorFalta}&idPartido=${location.state}&minuto=${datosFalta.minutoFalta}&tipo=${datosFalta.tipoFalta}`)
}




return (

  <div className="containerLogin">

    <div className="contenedorCargaDatosPartido">
      <h1>Cargar datos del partido</h1>

      <Form>
        <Row className="mb-2">
          <label className="labelCargarResultadosPartido">Goles</label>
          <>
            <Button variant="success" onClick={handleShow} id="botonCargarGolesPartido">
              Agregar
            </Button>

            <Modal show={show} onHide={handleClose} size="lg">
              <Modal.Header closeButton>
                <Modal.Title>Agregar un gol</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Row className="mb-2">
                    <Form.Group as={Col} controlId="formGridJugadorGol" id="formGridJugadorGol" sm="3">
                      <FloatingLabel controlId="floatingInputGrid" label="Jugador">
                        <Form.Select type="label-select" name='idJugadorGol' onChange={handleChangeJugadorSelect} >
                          {data.map((dato, index) => {
                            return (
                              <option
                                key={index}
                                value={dato.jugador.idJugador}> {`${dato.jugador.idJugador} - ${dato.jugador.nombre} ${dato.jugador.apellido}`}
                              </option>
                            )

                          })}
                        </Form.Select>
                      </FloatingLabel>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridMinutoGol" sm="3">
                      <FloatingLabel controlId="floatingInputGrid" label="Minuto">
                        <Form.Control type="number" name="minutoGol" className="formMinuto" value={datos.minutoGol}
                          onChange={handleChangeGoles} />
                      </FloatingLabel>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridTipoGol" sm="3" style={{ width: "150px" }}>
                      <FloatingLabel controlId="floatingSelect" label="Tipo de gol">
                        <Form.Select className="label-select" onChange={handleChangeGoles} name="tipoGol"
                          value={datos.tipoGol}>
                          <option value="Nada">-</option>
                          <option value="A favor">A favor</option>
                          <option value="En contra">En contra</option>
                        </Form.Select>
                      </FloatingLabel>
                    </Form.Group>
                  </Row>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Cerrar
                </Button>
                <Button variant="success" onClick={handleClickGol}>
                  Agregar
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        </Row>
      </Form>




      <Form>
        <Row className="mb-2">
          <label className="labelCargarResultadosPartido">Faltas</label>
          <>
            <Button variant="success" onClick={handleShow2} id="botonCargarFaltasPartido">
              Agregar
            </Button>

            <Modal show={show2} onHide={handleClose2} size="lg" id="faltas">
              <Modal.Header closeButton>
                <Modal.Title>Agregar una falta</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Row className="mb-2">
                    <Form.Group as={Col} controlId="formGridJugadorFalta" id="formGridJugadorFalta" sm="3">
                      <FloatingLabel controlId="floatingInputGrid" label="Jugador">
                        <Form.Select type="label-select" name='jugadorFalta' onChange={handleChangeJugadorSelect} >
                          {data.map((dato, index) => {
                            return (
                              <option
                                key={index}
                                value={jugadorSeleccionado}> {`${dato.jugador.idJugador} - ${dato.jugador.nombre}`}
                              </option>
                            )

                          })}
                        </Form.Select>
                      </FloatingLabel>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridMinutoFalta" sm="3">
                      <FloatingLabel controlId="floatingInputGrid" label="Minuto">
                        <Form.Control type="number" name="minutoFalta" className="formMinuto" value={datosFalta.minutoFalta}
                          onChange={handleChangeFaltas} />
                      </FloatingLabel>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridTipoFalta" sm="3" style={{ width: "150px" }}>
                      <FloatingLabel controlId="floatingSelect" label="Tipo de falta">
                        <Form.Select className="label-select" onChange={handleChangeFaltas} name="tipoFalta"
                          value={datosFalta.tipoFalta}>
                          <option value="Nada">-</option>
                          <option value="Amarilla">Amarilla</option>
                          <option value="Roja">Roja</option>
                        </Form.Select>
                      </FloatingLabel>
                    </Form.Group>
                  </Row>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose2}>
                  Cerrar
                </Button>
                <Button variant="success" onClick={handleClickFalta}>
                  Agregar
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        </Row>
      </Form>

      <div className="rowCargaResultadosPartidos">
        <label className="labelCargarResultadosPartido" for="incidentes">Incidentes</label>
        <Form.Control id="incidentes" type="text-area" name="incidentes" value={values.incidentes} onChange={handleChange} autoComplete="off" />
      </div>

      <div>
        <Button type="submit" className="btn btn-success botonDatosPartido" onClick={handleFormSubmit}>Confirmar</Button>
      </div>

    </div>





    <div className="contenedorValidacionGolesAndFaltas">
      <label className="labelCargarResultadosPartido">Goles</label>
      <Table striped bordered hover size="sm" className="tablaGolesCargaPartidos">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Minuto</th>
            <th>Tipo gol</th>
          </tr>
        </thead>
        <tbody>
          {goles.map((gol, index) => {
            return (
              <tr>
                <td>{gol.jugador.idJugador}</td>
                <td>{gol.jugador.nombre}</td>
                <td>{gol.jugador.apellido}</td>
                <td>{gol.minuto}</td>
                <td>{gol.tipo}</td>
              </tr>
            )
          })}
        </tbody>

      </Table>
      <label className="labelCargarResultadosPartido">Faltas</label>
      <Table striped bordered hover size="sm" className="tablaFaltasCargaPartidos">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Minuto</th>
            <th>Tipo gol</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
            <td>@fat</td>
          </tr>
        </tbody>
      </Table>
    </div>
  </div >

);

}

export default CargarDatosPartidos

