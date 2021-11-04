
import React from "react";
import {Col, FloatingLabel, Form,Row,Button} from "react-bootstrap"
import "../../../src/components/Register/Registros.css"
import {useState} from "react";
import axios from "axios";


export const RegistroCampeonato = () => {
    const [datos, setDatos] = useState({
        descripcion: "",
        fechaInicio: "",
        fechaFin: "",
        estado: "Activo"
    },[]);


    const handleChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name]: event.target.value,
        })
    }
    const handleClick = (event) => {
        console.log("HOOOOOOOOOOOOOOOO")
        const res=axios.post(`http://localhost:8080/crearCampeonato?descripcion=${datos.descripcion}&fechaInicio=${datos.fechaInicio}&fechaFin=${datos.fechaFin}&estado=activo`)
        console.log(res)
    };

return (
            <div className="main">
                <div className="container main-container-registro">
                    <h1 className="TituloRegistroCampeonato">Registro Campeonato</h1>
                    <Form>
                        <Row className="mb-1">
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
                            <Form.Group as={Col} controlId="formGridDescripcion">
                                <FloatingLabel controlId="floatingInputGrid" label="Descripcion">
                                    <Form.Control autoComplete="off" type="textarea" name="descripcion" placeholder="descripcion" value={datos.descripcion}
                                                  onChange={handleChange}/>
                                </FloatingLabel>
                            </Form.Group>
                        </Row>
                        <Button classname="botonesTablas" type="submit" class="btn btn-primary btn-sm" onClick={handleClick}> Finalizar</Button>
                    </Form>
                </div>
            </div>
        );

}