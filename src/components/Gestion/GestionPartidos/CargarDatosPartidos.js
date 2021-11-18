import React, { useState, useEffect } from "react";
import validateInfo from "../../FuncionesAdministrador/validacion.js"
import "./CargarDatosPartidos.css"
import { Button } from "react-bootstrap"
import { Form } from 'react-bootstrap'
import { Col, FloatingLabel, Row, Modal } from "react-bootstrap"
import { PopUp } from "../../PopUp/PopUp";
import { useHistory } from "react-router-dom";
import axios from "axios";


export const CargarDatosPartidos = (props = 1) => {

  const [errors, setErrors] = useState({});
  const [data, setData] = useState(null);
  const [jugadores, setJugadores] = useState([]);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);


  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setErrors(validateInfo(values))
  }



  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios(`http://localhost:8080/getJugadoresByClub?idClub=${props.idPartido}`);
      const newData = response.data;
      setData(newData);
    };
    fetchData();
  }, []);


  const handleChange = (event) => {
    setValues({
      ...data,
      [event.target.name]: event.target.value,
    })
  }

  const handleChangeJugador = (event) => {
    setData({
      ...data,
      jugador: { idJugador: event.target.value }
    })
  }


  const [values, setValues] = useState({
    incidentes: "",
    jugadorGol: "",
    tipoGol: "",
    minutoGol: "",
    tipoFalta: "",
    jugadorFalta: "",
    minutoFalta: ""
  })
  return (

    <div className="containerLogin">

      <div className="contenedorCargaDatosPartido">
        <h1>Cargar datos del partido</h1>

        <Form>
          <Row className="mb-2">
            <label className="labelCargarResultadosPartido">Goles</label>
            <>
              <Button variant="success" onClick={handleShow} id="botonCargarGolesPartido">
                Agregar gol
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
                          <Form.Select type="label-select" name="jugador" value={data.jugador.idJugador}
                            onChange={handleChangeJugador} />
                          <option>Seleccionar</option>
                          {jugadores.map((jugador, index) => {
                            return (
                              <option key={index}
                                value={jugador.idJugador}>{`${jugador.idJugador} - ${jugador.nombre}`}</option>)
                          })}

                        </FloatingLabel>
                      </Form.Group>
                      <Form.Group as={Col} controlId="formGridMinutoGol" sm="3">
                        <FloatingLabel controlId="floatingInputGrid" label="Minuto">
                          <Form.Control type="number" name="minutoGol" className="formMinuto" value={values.minutoGol}
                            onChange={handleChange} />
                        </FloatingLabel>
                      </Form.Group>
                      <Form.Group as={Col} controlId="formGridTipoGol" sm="3" style={{ width: "150px" }}>
                        <FloatingLabel controlId="floatingSelect" label="Tipo de gol">
                          <Form.Select className="label-select" onChange={handleChange} name="tipoGol"
                            value={values.tipoGol}>
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
                  <Button variant="success" onClick={handleClose}>
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
                Agregar falta
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
                          <Form.Select type="label-select" name="jugador" value={values.jugadorFalta}
                            onChange={handleChange} />

                        </FloatingLabel>
                      </Form.Group>
                      <Form.Group as={Col} controlId="formGridMinutoFalta" sm="3">
                        <FloatingLabel controlId="floatingInputGrid" label="Minuto">
                          <Form.Control type="number" name="minutoFalta" className="formMinuto" value={values.minutoFalta}
                            onChange={handleChange} />
                        </FloatingLabel>
                      </Form.Group>
                      <Form.Group as={Col} controlId="formGridTipoFalta" sm="3" style={{ width: "150px" }}>
                        <FloatingLabel controlId="floatingSelect" label="Tipo de falta">
                          <Form.Select className="label-select" onChange={handleChange} name="tipoFalta"
                            value={values.tipoFalta}>
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
                  <Button variant="success" onClick={handleClose2}>
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
        <label className="labelCargarResultadosPartido">Faltas</label>
      </div>
    </div>

  );

}

export default CargarDatosPartidos

//<TextBox type="text" name="usuario" placeholder="usuario"/>