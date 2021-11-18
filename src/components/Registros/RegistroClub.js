import {Link, useHistory} from "react-router-dom";
import {Col, FloatingLabel, Form, Row, Button} from "react-bootstrap"
import React from "react";
import "./RegistroClub.css"
import {useState} from "react";

import axios from "axios";
import {PopUp} from "../PopUp/PopUp";
import NavBarAdministracion from "../NavBars/NavBarAdministracion";
import {contieneCaracteresEspeciales, contieneNumeros} from "../../controles";

export const RegistroClub = () => {

    const history = useHistory();

    const [showModal, setShowModal] = useState(false);
    const [datos, setDatos] = useState({
        nombre: "",
        direccion: "",
        id: "",
    });

    const [error, setError] = useState("");
    const [title, setTitle] = useState("");
    const [modalTitle, setModalTitle] = useState("");


    const handleChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name]: event.target.value,
        })
    }

    const existeClub = async (idClub) => {
        try {
            let club = await axios.get(`http://localhost:8080/getClubById?idClub=${datos.id}`);
            return true;
        } catch (e) {
            return false;
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (datos.nombre === "" || contieneNumeros(datos.nombre) || contieneCaracteresEspeciales(datos.nombre)) {
            setError("El nombre ingresado no es válido");
            setTitle("Nombre no válido");
            setModalTitle("Advertencia")
            setShowModal(true);

        } else if (datos.direccion === "" || contieneCaracteresEspeciales(datos.nombre)) {
            setError("Por favor, ingrese una dirección válida");
            setTitle("Dirección no Válida");
            setModalTitle("Advertencia")
            setShowModal(true);

        } else if (datos.id === "" || await existeClub()) {
            setError("No ingreso un Id Club o el mismo ya existe");
            setTitle("Id no valida");
            setModalTitle("Advertencia")
            setShowModal(true);

        } else {
            history.push("/registro/responsable", datos);
        }
    };

    return (
        <div className="main">
            <NavBarAdministracion/>
            <div className="main-container-registro-Club">
                <h1 className="titulo-responsable">Registro Club</h1>
                <Form onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridEmail">
                            <FloatingLabel controlId="floatingInputGrid" label="Nombre">
                                <Form.Control type="text" name="nombre" placeholder="Nombre" value={datos.nombre}
                                              onChange={handleChange} autoComplete="off"/>
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridEmail">
                            <FloatingLabel controlId="floatingInputGrid" label="Dirección">
                                <Form.Control type="text" placeholder="Dirección" name="direccion"
                                              value={datos.direccion}
                                              onChange={handleChange} autoComplete="off"/>
                            </FloatingLabel>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridEmail">
                            <FloatingLabel controlId="floatingInputGrid" label="IdClub">
                                <Form.Control type="number" placeholder="Dirección" name="id" value={datos.id}
                                              onChange={handleChange} autoComplete="off"/>
                            </FloatingLabel>
                        </Form.Group>
                    </Row>
                    <PopUp show={showModal} onHide={() => setShowModal(false)} text={error}
                           title={title} modalTitle={modalTitle}/>
                    <Button type="submit" className="btn btn-success boton">Registrar</Button>
                </Form>
            </div>
        </div>
    )
}