
import React from "react";
import {Col, FloatingLabel, Form, FormControl, InputGroup, Row,Button} from "react-bootstrap"
import "../../../src/components/Register/Registros.css"
import {useState} from "react";
import axios from "axios";
import {PopupRegistro} from "../Login/PopupRegistro";


export const RegistroCampeonato = () => {
    const [post, setPost] = React.useState(null);
    const baseURL = "http://localhost:8080/crearCampeonato";
    const [datos, setDatos] = useState({
        descripcion: "",
        fechaInicio: "",
        fechaFin: "",
        estado: "Activo"
    });
    const createPost= ()=>{
        axios.post(baseURL,{
            descripcion:datos.descripcion,
            fechaInicio:datos.fechaInicio,
            fechaFin:datos.fechaFin,
            estado:datos.estado
        }).then((response) => {
            console.log(response)
            setPost(response.data);
          });
    }

    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name]: event.target.value,
        })
    }
    const handleSubmit = (event) => {
        console.log(datos)
        const res=fetch(`http://localhost:8080/crearCampeonato`,{method:'POST', body:JSON.stringify(datos)})
        .then(res=>res.json())
        console.log(res)
    };

    const handleClick = (event) => {
        console.log(datos)
        const res=fetch(`http://localhost:8080/crearCampeonato`,{method:'POST', body:JSON.stringify(datos)})
        .then(res=>res.json())
        console.log(res)
    };

    const containsNumbers = (string) => {
        return string.match(/\d+/g) != null;
    };
return (
            <div className="main">
                <div className="container main-container-registro">
                    <h1 className="title">Registro Campeonato</h1>
                    <Form>
                        <Row className="mb-3">
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
                        <button onClick={createPost}>Finalizar</button>
                        <Button classname="botonesTablas" type="submit" class="btn btn-primary btn-sm" onClick={createPost}> Finalizar</Button>
                        <PopupRegistro show={showModal} onHide={() => setShowModal(false)} text={error} title="No se puede registrar al jugador"/>
                    </Form>
                </div>
            </div>
        );

}