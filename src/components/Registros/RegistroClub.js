import {Link} from "react-router-dom";
import {Col, FloatingLabel, Form,Row,Button} from "react-bootstrap"
import React from "react";
import ".//Registros.css"
import { useState} from "react";

import axios from "axios";
import {PopUp} from "../PopUp/PopUp";
import NavBarAdministracion from "../NavBars/NavBarAdministracion";
export const RegistroClub = () => {
    const [popUp, setpopUp] = useState ({
        mensaje: "",
        titulo: ""
    })


    const [showModal, setShowModal] = useState(false);
    const [datos, setDatos] = useState({
        nombre: "",
        direccion: "",
        id: "",
    });
    const [error, setError] = useState(null);


    const handleChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name]: event.target.value,
        })
    }
    const postData = async () => {
        try{
            await axios.post(`http://localhost:8080/crearClub?idClub=${datos.id}&nombre=${datos.nombre}&direccion=${datos.direccion}`)
            setpopUp({mensaje: "Se actualizaron los datos", titulo: "Operacion exitosa"})
            
        }catch(e){
            console.log(e.message)
            setpopUp({mensaje: e.message, titulo: "Operacion fallida"})
            
        }
        setShowModal(true);

    }

    const handleSubmit = (event) => {
        if (datos.nombre === "" || containsNumbers(datos.nombre)) {
            setError("Nombre no válido");
            setShowModal(true);
            return;
        }
        else if (datos.direccion === "") {
            setError("Dirección no Válida");
            setShowModal(true);
            return;
        }
        postData()
     
    };
    const containsNumbers = (string) => {
        return string.match(/\d+/g) != null;
    };
        return (
            <div className="main">
                <NavBarAdministracion/>
                <div className="main-container-registro">
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
                                    <Form.Control type="text" placeholder="Dirección" name="direccion" value={datos.direccion}
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
                        <PopUp show={showModal} onHide={() => setShowModal(false)} text={error} title="No se puede registrar al Club"/>
                        <Button type="submit" className="btn btn-success boton"> Registrar</Button>
                    </Form>
                </div>
            </div>
        )
}