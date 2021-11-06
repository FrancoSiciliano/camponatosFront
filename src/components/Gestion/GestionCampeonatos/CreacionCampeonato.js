
import React from "react";
import {Col, FloatingLabel, Form,Row,Button} from "react-bootstrap"
import "../../Registros/Registros.css"
import {useState} from "react";
import axios from "axios";

export const RegistroCampeonato = () => {
    const url = 'http://localhost:8080/'

    const [datos, setDatos] = useState({
        descripcion: "",
        fechaInicio: "",
        fechaFin: "",
        tipo:"",
        categoria:"",
        estado: "Activo"
    },[]);
    const postData = async (datos) => {
        await axios.post(url + `crearCampeonato?descripcion=${datos.descripcion}&fechaInicio=${datos.fechaInicio}&fechaFin=${datos.fechaFin}&estado=${datos.estado}`) 
    }

    const handleSubmit = (event) => {
        postData(datos)
    }

    const handleChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name]: event.target.value,
        })
    }
return (
            <div className="main">
                <div className="container main-container-registro">
                    <h1 className="TituloRegistroCampeonato">Registro Campeonato</h1>
                    <Form onSubmit = {handleSubmit}>
                        <Row className="mb-2">
                            <Form.Group as={Col} controlId="formGridFecha" sm="3">
                                <FloatingLabel controlId="floatingInputGrid" label="FechaInicio">
                                    <Form.Control type="date"  name="fechaInicio" value={datos.fechaInicio}onChange={handleChange}/>
                                </FloatingLabel>
                                <FloatingLabel controlId="floatingInputGrid" label="FechaFin">
                                    <Form.Control type="date" name="fechaFin" value={datos.fechaFin}onChange={handleChange}/>
                                </FloatingLabel>
                            </Form.Group>
                          
                        </Row>
                        <Row className="mb-3">

              
                    <FloatingLabel controlId="floatingSelect" label="Tipo">
                    <Form.Select className="label-select" onChange={handleChange} name="tipo" value={datos.tipo} >
                        <select>
                            <option value="Eliminacion">Eliminacion</option>
                            <option value="Zonas">Lime</option>
                            </select></Form.Select>
                    </FloatingLabel>

                <Form.Group as={Col} controlId="formGridInput">
                    <FloatingLabel controlId="floatingInputGrid" label="Categoria">
                        <Form.Control type="text" placeholder="Categoria" name="categoria"
                                    value={datos.categoria}
                                    onChange={handleChange}/>
                    </FloatingLabel>
                </Form.Group>
                </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridDescripcion">
                                <FloatingLabel controlId="floatingInputGrid" label="Descripcion">
                                    <Form.Control autoComplete="off" type="textarea" name="descripcion" placeholder="descripcion" value={datos.descripcion}
                                                  onChange={handleChange}/>
                                </FloatingLabel>
                            </Form.Group>
                        </Row>
                        <Button type="submit" class="btn btn-primary btn-sm"> Finalizar</Button>
                    </Form>
                </div>
            </div>
        );

}