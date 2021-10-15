import {Link} from "react-router-dom";
import {Col, FloatingLabel, Form, FormControl, InputGroup, Row} from "react-bootstrap"
import {Button} from "react-bootstrap";
import "../../../src/components/Register/Registros.css"
import {useEffect, useState} from "react";
import axios from "axios";
import {PopupRegistro} from "../Login/PopupRegistro";

export const RegistroJugador = () => {

    const [datos, setDatos] = useState({
        nombre: "",
        apellido: "",
        mail: "",
        password: "",
        direccion: "",
        nroTelefono: "",
        tipoDoc: "",
        nroDoc: "",
        fechaNacimiento: "",
        idClub: "",
    });

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios(`http://localhost:8080/getClubes`);
            const newData = response.data;
            setData(newData);
        };
        fetchData();
    });

    const handleChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name]: event.target.value,
        })
    }

    const handleClick = (event) => {
        if (datos.nombre === "" || containsNumbers(datos.nombre)) {
            setError("Nombre no válido");
            setShowModal(true);
            return;
        }

        if (datos.apellido === "" || containsNumbers(datos.apellido)) {
            setError("Apellido no válido");
            setShowModal(true);
            return;
        }

        if (datos.tipoDoc === "" || containsNumbers(datos.tipoDoc)){
            setError("Tipo de documento no válido");
            setShowModal(true);
            return;
        }

        if (datos.nroDoc === "" || isNaN(datos.nroDoc)) {
            setError("Número de documento no válido");
            setShowModal(true);
            return;
        }

        if (datos.mail === "" || !isMail(datos.mail)) {
            setError("Correo Electrónico no válido");
            setShowModal(true);
            return;
        }

        if (datos.password === "") {
            setError("No puede dejar la contraseña vacía");
            setShowModal(true);
            return;
        }

        if (datos.direccion === "") {
            setError("Dirección no Válida");
            setShowModal(true);
            return;
        }

        if (datos.nroTelefono === "") {
            setError("Número de telefono no válido");
            setShowModal(true);
            return;
        }

        if (datos.idClub === "" || datos.idClub === "Seleccionar") {
            setError("Por favor, seleccione el club al que pertenece el jugador");
            setShowModal(true);
            return;
        }

        if (datos.fechaNacimiento === "") {
            setError("Por favor, Ingrese una fecha de nacimiento");
            setShowModal(true);
            return;
        }

        alert(JSON.stringify(datos));
    };

    const containsNumbers = (string) => {
        return string.match(/\d+/g) != null;
    };

    const isMail = (string) => {
        return string.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) != null;
    };

    if (data) {
        return (
            <div className="main">
                <div className="container main-container-registro">
                    <h1 className="title">Registro Jugador</h1>

                    <Form>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridEmail">
                                <FloatingLabel controlId="floatingInputGrid" label="Nombre">
                                    <Form.Control type="text" name="nombre" placeholder="Nombre" value={datos.nombre}
                                                  onChange={handleChange}/>
                                </FloatingLabel>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPassword">
                                <FloatingLabel controlId="floatingInputGrid" label="Apellido">
                                    <Form.Control type="text" name="apellido" placeholder="Apellido" value={datos.apellido}
                                                  onChange={handleChange}/>
                                </FloatingLabel>
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridPassword" sm="3">
                                <FloatingLabel controlId="floatingInputGrid" label="Fecha Nacimiento">
                                    <Form.Control type="date" placeholder="Fecha Nacimiento" name="fechaNacimiento" value={datos.fechaNacimiento}
                                                  onChange={handleChange}/>
                                </FloatingLabel>
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridEmail" sm="3">
                                <FloatingLabel controlId="floatingInputGrid" label="Tipo de documento">
                                    <Form.Control type="text" name="tipoDoc" placeholder="Tipo de documento" value={datos.tipoDoc}
                                                  onChange={handleChange}/>
                                </FloatingLabel>
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridPassword" sm="6">
                                <FloatingLabel controlId="floatingInputGrid" label="Numero de documento">
                                    <Form.Control type="text" name="nroDoc" placeholder="Numero de documento" value={datos.nroDoc}
                                                  onChange={handleChange}/>
                                </FloatingLabel>
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">

                            <Form.Group as={Col} controlId="formGridEmail">
                                <FloatingLabel controlId="floatingInputGrid" label="Correo Electrónico">
                                    <Form.Control type="email" placeholder="Correo Electrónico" name="mail" value={datos.mail}
                                                  onChange={handleChange}/>
                                </FloatingLabel>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPassword">
                                <FloatingLabel controlId="floatingInputGrid" label="Password">
                                    <Form.Control type="password" placeholder="Password" name="password" value={datos.password}
                                                  onChange={handleChange}/>
                                </FloatingLabel>
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridEmail">
                                <FloatingLabel controlId="floatingInputGrid" label="Dirección">
                                    <Form.Control type="text" placeholder="Dirección" name="direccion" value={datos.direccion}
                                                  onChange={handleChange}/>
                                </FloatingLabel>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPassword">
                                <FloatingLabel controlId="floatingInputGrid" label="Numero de Telefono">
                                    <Form.Control type="tel" placeholder="Numero de Telefono" name="nroTelefono" value={datos.nroTelefono}
                                                  onChange={handleChange}/>
                                </FloatingLabel>
                            </Form.Group>
                        </Row>

                        <FloatingLabel controlId="floatingSelect" label="Seleccione un equipo">
                            <Form.Select className="label-select" onChange={handleChange} name="idClub">
                                <option>Seleccionar</option>
                                {data.map((club, index) => {
                                    return (
                                        <option key={index}
                                                value={club.idClub}>{`${club.idClub} - ${club.nombre}`}</option>)
                                })}
                            </Form.Select>
                        </FloatingLabel>
                        <Link className="btn btn-success" to="/registroJugador" onClick={handleClick}>Finalizar</Link>


                        <PopupRegistro show={showModal} onHide={() => setShowModal(false)} text={error} title="No se puede registrar al jugador"/>
                    </Form>
                </div>
            </div>
        );
    } else {
        return (<h1>Cargando...</h1>);
    }
}