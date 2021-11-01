import {Link} from "react-router-dom";
import {Col, FloatingLabel, Form,Row} from "react-bootstrap"

import "../../../src/components/Register/Registros.css"
import {useEffect, useState} from "react";
import axios from "axios";
import {PopupRegistro} from "../Login/PopupRegistro";

export const RegistroResponsable = () => {

    const [datos, setDatos] = useState({
        nombre: "",
        documento: "",
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

        if (datos.documento === "" || isNaN(datos.documento)) {
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

        if (datos.idClub === "" || datos.idClub === "Seleccionar") {
            setError("Por favor, seleccione el club al que pertenece el jugador");
            setShowModal(true);
            return;
        }

        alert(JSON.stringify(datos));
    };

    const containsNumbers = (string) => {
        return string.match(/\d+/g) != null;
    }

    const isMail = (string) => {
        return string.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) != null;
    }

    if (data) {
        return (
            <div className="main">
                <div className="container main-container-registro">
                    <h1 className="title">Registro Responsable</h1>

                    <Form>

                        <Form.Group as={Col} controlId="formGridEmail" className="mb-3">
                            <FloatingLabel controlId="floatingInputGrid" label="Nombre">
                                <Form.Control type="text" name="nombre" placeholder="Nombre" value={datos.nombre}
                                              onChange={handleChange}/>
                            </FloatingLabel>
                        </Form.Group>


                        <Form.Group as={Col} controlId="formGridPassword" className="mb-3">
                            <FloatingLabel controlId="floatingInputGrid" label="Numero de documento">
                                <Form.Control type="text" name="nroDoc" placeholder="Numero de documento" value={datos.documento}
                                              onChange={handleChange}/>
                            </FloatingLabel>
                        </Form.Group>

                        <Row className="mb-3">

                            <Form.Group as={Col} controlId="formGridEmail">
                                <FloatingLabel controlId="floatingInputGrid" label="Correo Electrónico">
                                    <Form.Control type="email" placeholder="Correo Electrónico" name="mail"
                                                  value={datos.mail}
                                                  onChange={handleChange}/>
                                </FloatingLabel>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPassword">
                                <FloatingLabel controlId="floatingInputGrid" label="Password">
                                    <Form.Control type="password" placeholder="Password" name="password"
                                                  value={datos.password}
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
                        <Link className="btn btn-success" to="/registroResponsable" onClick={handleClick}>Finalizar</Link>
                        <PopupRegistro show={showModal} onHide={() => setShowModal(false)} text={error}
                                       title="No se puede registrar al jugador"/>

                    </Form>
                </div>
            </div>
        );
    } else {
        return (<h1>Algo salió mal...</h1>);
    }
}