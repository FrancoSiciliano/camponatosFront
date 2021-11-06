import React from "react";
import {Col, FloatingLabel, Form, Row, Button} from "react-bootstrap"
import {useState} from "react";
import axios from "axios";
import './CreacionCampeonato.css'
import {PopUp} from "../../PopUp/PopUp";
import {Link, Redirect, useHistory} from "react-router-dom";

export const RegistroCampeonato = () => {
    const url = 'http://localhost:8080/';
    const history = useHistory();

    const today = new Date().toLocaleString('es-ES', {
        month: "2-digit",
        year: "numeric",
        day: "2-digit"
    }).replaceAll("/", "-");
    const [dia, mes, anio] = today.split("-");
    const minFecha = `${anio}-${mes}-${dia}`

    const [mensajeError, setMensajeError] = useState("");
    const [tituloError, setTituloError] = useState("");
    const [showModal, setShowModal] = useState(false);

    const [datos, setDatos] = useState({
        descripcion: "",
        fechaInicio: "",
        fechaFin: "",
        tipo: "nada",
        categoria: "",
        estado: "Activo"
    });

    // const postData = async (datos) => {
    //     await axios.post(url + `crearCampeonato?descripcion=${datos.descripcion}&fechaInicio=${datos.fechaInicio.replaceAll("-", "/")}&fechaFin=${datos.fechaFin.replaceAll("-", "/")}&estado=${datos.estado}`)
    // }

    const controlInputs = () => {
        if (datos.fechaInicio > datos.fechaFin) {
            setMensajeError("La fecha de inicio del campeonato no puede ser mayor a la de finalización");
            setTituloError("Fechas no válidas");
            setShowModal(true);
            return false;

        } else if (datos.fechaInicio === "" || datos.fechaFin === "") {
            setMensajeError("Ingrese fechas válidas");
            setTituloError("Fechas no válidas");
            setShowModal(true);
            return false;

        } else if (datos.tipo === "nada") {
            setMensajeError("Por favor, seleccione el tipo de campeonato que desea crear");
            setTituloError("Tipo no válido");
            setShowModal(true)
            return false;

        } else if (datos.categoria <= 0 || datos.categoria === "") {
            setMensajeError("Ingrese una categoría válida");
            setTituloError("Categoría no válida");
            setShowModal(true);
            return false;

        } else if (datos.descripcion === "") {
            setMensajeError("Por favor, ingrese un nombre para el torneo");
            setTituloError("Nombre no válido");
            setShowModal(true);
            return false;
        }

        return true;

    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (controlInputs()) history.push("/agregar/clubes", datos);
    }

    const handleChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name]: event.target.value,
        })
    }

    return (
        <div className="main">
            <div className="main-container-registro">
                <h1 className="TituloRegistroCampeonato">Crear Campeonato</h1>
                <Form onSubmit={handleSubmit}>
                    <Row className="mb-2">
                        <Form.Group as={Col} controlId="formGridFecha" sm="3">
                            <FloatingLabel controlId="floatingInputGrid" label="Fecha de Inicio">
                                <Form.Control type="date" name="fechaInicio" value={datos.fechaInicio}
                                              onChange={handleChange} min={minFecha}/>
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridFecha" sm="3">
                            <FloatingLabel controlId="floatingInputGrid" label="Fecha de Finalización">
                                <Form.Control type="date" name="fechaFin" value={datos.fechaFin}
                                              onChange={handleChange} min={minFecha}/>
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridTipo" sm="3" style={{width: "200px"}}>
                            <FloatingLabel controlId="floatingSelect" label="Tipo de torneo">
                                <Form.Select className="label-select" onChange={handleChange} name="tipo"
                                             value={datos.tipo}>
                                    <option value="nada">Seleccionar</option>
                                    <option value="Puntos">Puntos</option>
                                    <option value="Zonas">Zonas</option>
                                </Form.Select>
                            </FloatingLabel>
                        </Form.Group>

                    </Row>
                    <Row className="mb-2">
                        <Form.Group as={Col} sm="3" controlId="formGridInput" className="col-2">
                            <FloatingLabel controlId="floatingInputGrid" label="Categoria">
                                <Form.Control type="number" placeholder="Categoria" name="categoria"
                                              value={datos.categoria}
                                              onChange={handleChange}
                                />
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group as={Col} sm="8" controlId="formGridDescripcion">
                            <FloatingLabel controlId="floatingInputGrid" label="Nombre del campeonato">
                                <Form.Control autoComplete="off" type="textarea" name="descripcion"
                                              placeholder="descripcion" value={datos.descripcion}
                                              onChange={handleChange}/>
                            </FloatingLabel>
                        </Form.Group>
                    </Row>
                    <Row className="justify-content-center">
                        <Button type="submit" className="btn btn-success btn-lg col-2">Siguiente</Button>
                    </Row>
                </Form>

                <PopUp show={showModal} onHide={() => setShowModal(false)} text={mensajeError} title={tituloError}/>
            </div>
        </div>
    );

}