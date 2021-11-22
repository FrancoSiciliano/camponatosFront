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
  const [errors, setErrors] = useState({});
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [values, setValues] = useState({
    incidentes: "",
    jugadorGol: "",
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


const [datosFalta, setDatosFalta] = useState({
  idJugadorFalta: "",
  tipoFalta: "",
  minutoFalta: "",
});


  useEffect(() => {
    const fetchData = async () => {
      const response = await axios(`http://localhost:8080/getMiembroByPartido?idPartido=1`);
      const newData = response.data;
      setData(newData);
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
  axios.post(`http://localhost:3000/cargarGol?idJugador=${datos.idJugadorGol}&idPartido=${location.state}&minuto=${datos.minutoGol}&tipo=${datos.tipoGol}`)
}

const handleClickFalta = () => {
  axios.post(`http://localhost:3000/cargarFalta?idJugador=${datosFalta.idJugadorFalta}&idPartido=${location.state}&minuto=${datosFalta.minutoFalta}&tipo=${datosFalta.tipoFalta}`)
}

const handleClick = (props) => {
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
                        <Form.Select type="label-select" name='jugadorGol' onChange={handleChangeGoles} >
                          {data.map((dato, index) => {
                            return (
                              <option
                                key={index}
                                value={dato.jugador.idJugador}> {`${dato.jugador.idJugador} - ${dato.jugador.nombre}`}
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
                        <Form.Select type="label-select" name='jugadorFalta' onChange={handleChangeFaltas} >
                          {data.map((dato, index) => {
                            return (
                              <option
                                key={index}
                                value={dato.jugador.idJugador}> {`${dato.jugador.idJugador} - ${dato.jugador.nombre}`}
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
                <Button variant="success" onClick={handleClick}>
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
          {data.map((dato, index) => {
            return (
              <tr>
                <td>dato.jugador.idJugador</td>
                <td>dato.jugador.nombre</td>
                <td>dato.jugador.apellido</td>
                <td>1</td>
                <td>1</td>
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

