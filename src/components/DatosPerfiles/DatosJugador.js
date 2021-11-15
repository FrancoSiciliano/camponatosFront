import React from 'react';
import './datos.css';
import Avatar from '../../assets/images/avatar-perfil.png';
import {Col, FloatingLabel, Form, Row, Button} from "react-bootstrap"
import {useEffect, useState} from "react";
import axios from "axios";
import {PopUp} from "../PopUp/PopUp";
import NavBarJugador from '../NavBars/NavBarJugador';

export const DatosJugador = (props) => {

    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [popUp, setpopUp] = useState({
        mensaje: "",
        titulo: ""
    })

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios(`http://localhost:8080/encontrarJugador?idJugador=${props.idJugador}`);
            const newData = response.data;
            setData(newData);
        }
        fetchData();
    }, []);

    const handleChange = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value,
        })
    }
    const url = 'http://localhost:8080/'

    const postData = async (data) => {
        try {
            await axios.post(url + `modificarDireccion?idJugador=${props.idJugador}&direccion=${data.direccion}`)
            await axios.post(url + `modificarMail?idJugador=${props.idJugador}&mail=${data.mail}`)
            await axios.post(url + `modificarTelefono?idJugador=${props.idJugador}&telefono=${data.telefono}`)
            setpopUp({mensaje: "Se actualizaron los datos", titulo: "Operacion exitosa"})

        } catch (e) {
            setpopUp({mensaje: e.message, titulo: "Operacion fallida"})

        }
        setShowModal(true);

    }
    const handleSubmit = (event) => {
        event.preventDefault();
        if (data.direccion === "") {
            setpopUp({mensaje: "Dirección no válida", titulo: "Dato erroneo"});
            setShowModal(true);

        } else if (data.mail === "" || !isMail(data.mail)) {
            setpopUp({mensaje: "E-Mail no válido", titulo: "Dato erroneo"});
            setShowModal(true);

        } else if (data.telefono === "" || isNaN(data.telefono)) {
            setpopUp({mensaje: "Telefono no válido", titulo: "Dato erroneo"});
            setShowModal(true);
            ;
        }
        postData(data)
    }

    const isMail = (string) => {
        return string.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) != null;
    };

   
    return (
        <div>
            <NavBarJugador/>
            <div className='main-container-datos'>
                
                <h2 className='titledatos'>Perfil del Jugador</h2>

                <div className="datos-perfil">
                    <div className='avatar'>
                        <img src={Avatar} alt='avatarPerfil' width='300px' height='280px'/>
                    </div>
                    <div className='contenedor-datos'>
                        <Form className='formulario' onSubmit={handleSubmit}>
                            <Row className="mb-5">
                                <Form.Group as={Col} controlId="formGridNombre" sm="4">
                                    <FloatingLabel className="floatingInputGridJug" label="Nombre"
                                                   style={{fontSize: "19px"}}>
                                        <Form.Control type="text" name="nombre" placeholder="Nombre"
                                                      style={{fontSize: "20px"}} value={data.nombre} readOnly/>
                                    </FloatingLabel>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridApellido" sm="4">
                                    <FloatingLabel className="floatingInputGridJug" label="Apellido"
                                                   style={{fontSize: "19px"}}>
                                        <Form.Control type="text" name="apellido" placeholder="Apellido"
                                                      style={{fontSize: "20px"}} value={data.apellido} readOnly/>
                                    </FloatingLabel>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridFechaNac" sm="3">
                                    <FloatingLabel className="floatingInputGridJug" label="Fecha Nacimiento"
                                                   style={{fontSize: "19px"}}>
                                        <Form.Control type="date" placeholder="Fecha Nacimiento" name="fechaNacimiento"
                                                      style={{fontSize: "20px"}} value={data.fechaNacimiento} readOnly/>
                                    </FloatingLabel>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridCategoria" sm="1">
                                    <FloatingLabel className="floatingInputGridJug" label="Categ."
                                                   style={{fontSize: "19px"}}>
                                        <Form.Control type="text" name="categoria" placeholder="Categ."
                                                      style={{fontSize: "20px"}} value={data.categoria} readOnly/>
                                    </FloatingLabel>
                                </Form.Group>
                            </Row>

                            <Row className="mb-5">

                                <Form.Group as={Col} controlId="formGridTipoDocumento" sm="3">
                                    <FloatingLabel className="floatingInputGridJug" label="Tipo documento"
                                                   style={{fontSize: "19px"}}>
                                        <Form.Control type="text" name="tipodocumento" placeholder="Tipo documento"
                                                      style={{fontSize: "20px"}} value={data.tipoDocumento} readOnly/>
                                    </FloatingLabel>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridNumeroDoc" sm="3">
                                    <FloatingLabel className="floatingInputGridJug" label="Numero de documento"
                                                   style={{fontSize: "19px"}}>
                                        <Form.Control type="text" name="nrodoc" placeholder="Numero de documento"
                                                      style={{fontSize: "20px"}} value={data.documento} readOnly/>
                                    </FloatingLabel>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridDireccion" sm="4">
                                    <FloatingLabel className="floatingInputGridJug" label="Dirección"
                                                   style={{fontSize: "19px"}}>
                                        <Form.Control type="text" placeholder="Dirección" name="direccion"
                                                      style={{fontSize: "20px"}} value={data.direccion}
                                                      onChange={handleChange}/>
                                    </FloatingLabel>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridEstado" sm="2">
                                    <FloatingLabel className="floatingInputGridJug" label="Estado"
                                                   style={{fontSize: "19px"}}>
                                        <Form.Control type="text" name="estado" placeholder="Estado"
                                                      style={{fontSize: "20px"}} value={data.estado ? "Habilitado" : "Inhabilitado"} readOnly/>
                                    </FloatingLabel>
                                </Form.Group>
                            </Row>

                            <Row className="mb-5">

                                <Form.Group as={Col} controlId="formGridTelefono">
                                    <FloatingLabel className="floatingInputGridJug" label="Numero de Telefono"
                                                   style={{fontSize: "19px"}}>
                                        <Form.Control type="tel" placeholder="Numero de Telefono" name="telefono"
                                                      style={{fontSize: "20px"}} value={data.telefono}
                                                      onChange={handleChange}/>
                                    </FloatingLabel>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridEmail">
                                    <FloatingLabel className="floatingInputGridJug" label="Correo Electrónico"
                                                   style={{fontSize: "19px"}}>
                                        <Form.Control type="email" placeholder="mail" name="mail"
                                                      style={{fontSize: "20px"}}
                                                      value={data.mail} onChange={handleChange}/>
                                    </FloatingLabel>
                                </Form.Group>


                                <Form.Group as={Col} controlId="formGridPassword">
                                    <FloatingLabel className="floatingInputGridJug" label="Password"
                                                   style={{fontSize: "19px"}}>
                                        <Form.Control type="text" placeholder="Password" name="password"
                                                      style={{fontSize: "20px"}}/>
                                    </FloatingLabel>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridFechaAlta" sm="3">
                                    <FloatingLabel className="floatingInputGridJug" label="Fecha Alta"
                                                   style={{fontSize: "19px"}}>
                                        <Form.Control type="date" placeholder="Fecha Alta" name="fechalta"
                                                      style={{fontSize: "20px"}} value={data.fechaAlta} readOnly/>
                                    </FloatingLabel>
                                </Form.Group>
                            </Row>

                            <Button type="submit" className="btn btn-success boton"> Actualizar</Button>
                            <PopUp show={showModal} onHide={() => setShowModal(false)} text={popUp.mensaje}
                                   title={popUp.titulo}/>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}