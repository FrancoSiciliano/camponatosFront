import React, {useState, useEffect} from "react";
import "./CargarDatosPartidos.css"
import {Button} from "react-bootstrap"
import {Form} from 'react-bootstrap'
import {Col, FloatingLabel, Row, Modal, Table} from "react-bootstrap"
import {useHistory, useLocation} from "react-router-dom";
import axios from "axios";
import NavBarAdministracion from "../../NavBars/NavBarAdministracion.js";
import {PopUp} from "../../PopUp/PopUp.js";


export const CargarDatosPartidos = () => {

    const location = useLocation();
    const [faltas, setFaltas] = useState([]);
    const [goles, setGoles] = useState([]);
    const [data, setData] = useState([]);
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [incidente, setIncidente] = useState("");
    const [modalTitle, setModalTitle] = useState("");
    const [titleBody, setTitleBody] = useState("");
    const [huboErrores, setHuboErrores] = useState(false);
    const history = useHistory();


    const handleClose = () => {
        setShow(false);
        setDatos({
            idJugadorGol: "",
            tipoGol: "",
            minutoGol: "",
        })
    };
    const handleShow = () => setShow(true);

    const handleClose2 = () => {
        setShow2(false);
        setDatosFalta({
            tipoFalta: "",
            minutoFalta: "",
        });
    };

    const handleShow2 = () => setShow2(true);

    const [datos, setDatos] = useState({
        idJugadorGol: "",
        tipoGol: "",
        minutoGol: "",
    });

    const [jugadorSeleccionado, setJugadorSeleccionado] = useState(null);
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
        };
        fetchData();
    }, []);


    const handleChangeIncidente = (event) => {
        setIncidente(event.target.value)
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

    const handleEliminarFalta = (index) => {
        const auxFaltas = faltas.slice();
        auxFaltas.splice(index, 1);
        setFaltas(auxFaltas);
    }

    const handleEliminarGol = (index) => {
        const auxGol = goles.slice();
        auxGol.splice(index, 1);
        setGoles(auxGol);
    }

    const handleClickGol = async () => {
        const auxGoles = goles.slice();
        const res = await axios.get(`http://localhost:8080/encontrarJugador?idJugador=${jugadorSeleccionado}`);
        const jugador = res.data;

        auxGoles.push({
            jugadorSeleccionado: jugadorSeleccionado,
            idPartido: location.state,
            nombre: jugador.nombre,
            apellido: jugador.apellido,
            minutoGol: datos.minutoGol,
            tipoGol: datos.tipoGol.toLowerCase(),
        })
        setGoles(auxGoles);
        handleClose()
    }

    const handleClickFalta = async () => {
        const auxFaltas = faltas.slice();
        const res = await axios.get(`http://localhost:8080/encontrarJugador?idJugador=${jugadorSeleccionado}`);
        const jugador = res.data;

        auxFaltas.push({
            jugadorSeleccionado: jugadorSeleccionado,
            idPartido: location.state,
            nombre: jugador.nombre,
            apellido: jugador.apellido,
            minutoFalta: datosFalta.minutoFalta,
            tipoFalta: datosFalta.tipoFalta.toLowerCase(),
        })
        setFaltas(auxFaltas);
        handleClose2()
    }

    const [showAlert, setShowAlert] = useState(false);
    const [textAlert, setTextAlert] = useState("");
    const handleShowAlert = () => {
        setShowAlert(true)
    }

    const handleHideAlert = () => {
        console.log(huboErrores);
        if (!huboErrores) {
            history.push("/home/administracion");
        } else {
            setShowAlert(false);
        }
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const auxGolesNoCargados = [];
        const auxFaltasNoCargadas = [];
        const mensajeG = [];
        const mensajeL = [];

        for (const gol of goles) {
            try {
                await axios.post(`http://localhost:8080/cargarGol?idJugador=${gol.jugadorSeleccionado}&idPartido=${gol.idPartido}&minuto=${gol.minutoGol}&tipo=${gol.tipoGol}`)
            } catch (e) {
                auxGolesNoCargados.push(gol);
                mensajeG.push(e.response.data.message);
            }
        }

        if (auxGolesNoCargados.length > 0) {
            setGoles(auxGolesNoCargados);
        }

        for (const falta of faltas) {
            try {
                await axios.post(`http://localhost:8080/cargarFalta?idJugador=${falta.jugadorSeleccionado}&idPartido=${falta.idPartido}&minuto=${falta.minutoFalta}&tipo=${falta.tipoFalta}`)
            } catch (e) {
                auxFaltasNoCargadas.push(falta);
                mensajeL.push(e.response.data.message);
            }
        }

        if (auxFaltasNoCargadas.length > 0) {
            setFaltas(auxFaltasNoCargadas);
        }

        if (auxFaltasNoCargadas.length === 0 && auxGolesNoCargados.length === 0) {
            setHuboErrores(false);
        } else {
            setHuboErrores(true);
        }

        await axios.post(`http://localhost:8080/cargarResultadosPartido?idPartido=${location.state}&incidentes=${incidente}`)
        setModalTitle('OPERACION EXITOSA')
        setTitleBody('CARGA DE LOS DATOS REALIZADA.' +
            ((auxGolesNoCargados.length > 0 || auxFaltasNoCargadas.length > 0) ? " ALGUNOS DATOS NO PUDIERON SER CARGADOS POR LAS SIGUIENTES RAZONES: " + mensajeG + "\n" + mensajeL : ""))
        setTextAlert('')
        handleShowAlert()

    }
    return (

        <div className="contenedor-datos-partido">

            <NavBarAdministracion/>
            <div className="tablas-carga-datos">
                <div className="contenedorCargaDatosPartido">
                    <h1>Cargar datos del partido</h1>

                    <Form>
                        <Row className="mb-2">

                            <div id="filaCargaGoles">
                                <p>Goles</p>
                                <Button variant="success" onClick={handleShow} id="botonCargarGolesPartido">
                                    Agregar
                                </Button>
                            </div>


                            <Modal show={show} onHide={handleClose} size="lg">
                                <Modal.Header closeButton>
                                    <Modal.Title>Agregar un gol</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form>
                                        <Row className="mb-2">
                                            <Form.Group as={Col} controlId="formGridJugadorGol" id="formGridJugadorGol"
                                                        sm="3">
                                                <FloatingLabel controlId="floatingInputGrid" label="Jugador">
                                                    <Form.Select type="label-select" name='idJugadorGol'
                                                                 onChange={handleChangeJugadorSelect}>
                                                        <option>
                                                            -
                                                        </option>
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
                                                    <Form.Control type="number" name="minutoGol" className="formMinuto"
                                                                  value={datos.minutoGol}
                                                                  onChange={handleChangeGoles}/>
                                                </FloatingLabel>
                                            </Form.Group>
                                            <Form.Group as={Col} controlId="formGridTipoGol" sm="3"
                                                        style={{width: "150px"}}>
                                                <FloatingLabel controlId="floatingSelect" label="Tipo de gol">
                                                    <Form.Select className="label-select" onChange={handleChangeGoles}
                                                                 name="tipoGol"
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
                        </Row>
                    </Form>


                    <PopUp show={showAlert} onHide={handleHideAlert} modalTitle={modalTitle} title={titleBody}
                           text={textAlert}/>

                    <Form>
                        <Row className="mb-2">

                            <div id="filaCargaFaltas">
                                <p>Faltas</p>
                                <Button variant="success" onClick={handleShow2} id="botonCargarFaltasPartido">
                                    Agregar
                                </Button>
                            </div>
                            <Modal show={show2} onHide={handleClose2} size="lg" id="faltas">
                                <Modal.Header closeButton>
                                    <Modal.Title>Agregar una falta</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form>
                                        <Row className="mb-2">
                                            <Form.Group as={Col} controlId="formGridJugadorFalta"
                                                        id="formGridJugadorFalta" sm="3">
                                                <FloatingLabel controlId="floatingInputGrid" label="Jugador">
                                                    <Form.Select type="label-select" name='jugadorFalta'
                                                                 onChange={handleChangeJugadorSelect}>
                                                        <option>
                                                            -
                                                        </option>
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
                                            <Form.Group as={Col} controlId="formGridMinutoFalta" sm="3">
                                                <FloatingLabel controlId="floatingInputGrid" label="Minuto">
                                                    <Form.Control type="number" name="minutoFalta"
                                                                  className="formMinuto" value={datosFalta.minutoFalta}
                                                                  onChange={handleChangeFaltas}/>
                                                </FloatingLabel>
                                            </Form.Group>
                                            <Form.Group as={Col} controlId="formGridTipoFalta" sm="3"
                                                        style={{width: "150px"}}>
                                                <FloatingLabel controlId="floatingSelect" label="Tipo de falta">
                                                    <Form.Select className="label-select" onChange={handleChangeFaltas}
                                                                 name="tipoFalta"
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
                        </Row>
                    </Form>

                    <div id="filaIncidentesPartido">
                        <label className="labelCargarResultadosPartido" for="incidente">Incidentes</label>
                        <Form.Control type="text-area" name="incidente" value={incidente}
                                      onChange={handleChangeIncidente} autoComplete="off"/>
                    </div>

                    <div id="filaBotonConfirmarResultados">
                        <Button className="btn btn-success botonDatosPartido"
                                onClick={handleFormSubmit}> Confirmar </Button>
                    </div>

                </div>

                <div className="contenedorValidacionGolesAndFaltas">
                    <div className="tabla-resultado-goles">
                        <p className="labelCargarResultadosPartido">Goles del partido</p>
                        <div className="tablaGolesCargaPartidos">
                            <Table striped bordered hover size="sm">
                                <thead>
                                <tr>
                                    <th>Id Jug</th>
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
                                            <td>{gol.jugadorSeleccionado}</td>
                                            <td>{gol.nombre}</td>
                                            <td>{gol.apellido}</td>
                                            <td>{gol.minutoGol}</td>
                                            <td>{gol.tipoGol.toUpperCase()}</td>
                                            <td><Button className="btn btn-success"
                                                        onClick={() => handleEliminarGol(index)}>Eliminar</Button></td>
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </Table>
                        </div>

                    </div>
                    <div className="tabla-resultado-falta">
                        <p className="labelCargarResultadosPartido">Faltas del partido</p>
                        <div className="tablaFaltasCargaPartidos">
                            <Table striped bordered hover size="sm">
                                <thead>
                                <tr>
                                    <th>Id Jug</th>
                                    <th>Nombre</th>
                                    <th>Apellido</th>
                                    <th>Minuto</th>
                                    <th>Tipo falta</th>
                                </tr>
                                </thead>
                                <tbody>
                                {faltas.map((falta, index) => {
                                    return (
                                        <tr>
                                            <td>{falta.jugadorSeleccionado}</td>
                                            <td>{falta.nombre}</td>
                                            <td>{falta.apellido}</td>
                                            <td>{falta.minutoFalta}</td>
                                            <td>{falta.tipoFalta.toUpperCase()}</td>
                                            <td><Button className="btn btn-success"
                                                        onClick={() => handleEliminarFalta(index)}>Eliminar</Button>
                                            </td>
                                        </tr>
                                    )
                                })}

                                </tbody>
                            </Table>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    );

}

export default CargarDatosPartidos

