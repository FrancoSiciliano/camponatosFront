import React from 'react';
import './datos.css';
import Avatar from '../../assets/images/avatar-perfil.png';
import {Col, FloatingLabel, Form, Row, Button} from "react-bootstrap";
import {useEffect, useState} from "react";
import axios from "axios";
import {PopUp} from "../PopUp/PopUp";
import NavBarResponsable from '../NavBars/NavBarResponsable';
import {useHistory} from "react-router-dom";
import {contieneNumeros, esUnMail} from "../../controles";

export const DatosJugadorResponsable = () => {

    const history = useHistory();
    const [datosJugador, setDatosJugador] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [popUp, setpopUp] = useState({
        mensaje: "",
        titulo: ""
    })

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios(`http://localhost:8080/encontrarJugador?idJugador=${history.location.state.idJugador}`);
            const newData = response.data;
            setDatosJugador(newData);
        }

        fetchData();
    }, []);

    const handleChange = (event) => {
        setDatosJugador({
            ...datosJugador,
            [event.target.name]: event.target.value,
        })
    }
    const url = 'http://localhost:8080/'

    const postData = async (data) => {
        console.log(data.nombre)
        console.log(data.apellido)
        console.log(data.fechaNacimiento)
        console.log(data.documento)
        console.log(data.tipoDocumento)
        console.log(data.direccion)
        console.log(data.mail)
        console.log(data.telefono)
        console.log(data.password)
        try {
            /* AGREGAR METODOS QUE FALTAN PARA MODIFICAR LOS DATOS*/
            await axios.post(url + `modificarNombre?idJugador=${history.location.state.idJugador}&nombre=${data.nombre}`)
            await axios.post(url + `modificarApellido?idJugador=${history.location.state.idJugador}&apellido=${data.apellido}`)
            await axios.post(url + `modificarFechaNac?idJugador=${history.location.state.idJugador}&fechaNac=${data.fechaNacimiento.replaceAll('-','/')}`)
            await axios.post(url + `modificarDocumento?idJugador=${history.location.state.idJugador}&documento=${data.documento}&tipoDoc=${data.tipoDocumento}`)
            await axios.post(url + `modificarTipoDocumento?idJugador=${history.location.state.idJugador}&tipo=${data.tipoDocumento}`)
            await axios.post(url + `modificarDireccion?idJugador=${history.location.state.idJugador}&direccion=${data.direccion}`)
            await axios.post(url + `modificarMail?idJugador=${history.location.state.idJugador}&mail=${data.mail}`)
            await axios.post(url + `modificarTelefono?idJugador=${history.location.state.idJugador}&telefono=${data.telefono}`)
            await axios.post(url + `cambiarPasswordJugador?idJugador=${history.location.state.idJugador}&password=${data.password}`)
            setpopUp({mensaje: "Se actualizaron los datos", titulo: "Operacion exitosa"})

        } catch (e) {
            setpopUp({mensaje: e.response.data.message, titulo: "Operacion fallida"})

        }
        setShowModal(true);

    }
    const handleSubmit = (event) => {
        event.preventDefault();

        if (datosJugador.nombre === "" || contieneNumeros(datosJugador.nombre)) {
            setpopUp({mensaje: "Nombre no válido", titulo: "Dato erroneo"});
            setShowModal(true);
        } else if (datosJugador.apellido === "" || contieneNumeros(datosJugador.apellido)) {
            setpopUp({mensaje: "Apellido no válido", titulo: "Dato erroneo"});
            setShowModal(true);
        } else if (datosJugador.tipoDocumento === "" || contieneNumeros(datosJugador.tipoDocumento)) {
            setpopUp({mensaje: "Tipo de documento no válido", titulo: "Dato erroneo"});
            setShowModal(true);
        } else if (datosJugador.documento === "" || isNaN(datosJugador.documento)) {
            setpopUp({mensaje: "Número de documento no válido", titulo: "Dato erroneo"});
            setShowModal(true);
        } else if (datosJugador.direccion === "") {
            setpopUp({mensaje: "Dirección no válida", titulo: "Dato erroneo"});
            setShowModal(true);
        } else if (datosJugador.mail === "" || !esUnMail(datosJugador.mail)) {
            setpopUp({mensaje: "E-Mail no válido", titulo: "Dato erroneo"});
            setShowModal(true);
        } else if (datosJugador.telefono === "" || isNaN(datosJugador.telefono)) {
            setpopUp({mensaje: "Telefono no válido", titulo: "Dato erroneo"});
            setShowModal(true);
        } else if (datosJugador.password === "") {
            setpopUp({mensaje: "Password inválida", titulo: "Dato erroneo"});
            setShowModal(true);
        } else{
            postData(datosJugador)
        }
       
    }

    return (
        <div className="main-container-datos-navbar-jugador">
            <NavBarResponsable/>
            <div className='main-container-datos'>
               
                <h2 className='titledatos'>Perfil del Jugador</h2>
                <div className="datos-perfil">
                    <div className='avatar'>
                        <img src={Avatar} alt='avatarPerfil' width='300px' height='280px'/>
                    </div>
                    <div className='contenedor-datos'>
                        <Form className='formulario' onSubmit={handleSubmit}>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridNombre" sm="4">
                                    <FloatingLabel className="floatingInputGridJug" label="Nombre"
                                                   style={{fontSize: "19px"}}>
                                        <Form.Control type="text" name="nombre" placeholder="Nombre"
                                                      style={{fontSize: "20px"}} value={datosJugador.nombre} onChange={handleChange}/>
                                    </FloatingLabel>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridApellido" sm="4">
                                    <FloatingLabel className="floatingInputGridJug" label="Apellido"
                                                   style={{fontSize: "19px"}}>
                                        <Form.Control type="text" name="apellido" placeholder="Apellido"
                                                      style={{fontSize: "20px"}} value={datosJugador.apellido} onChange={handleChange}/>
                                    </FloatingLabel>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridFechaNac" sm="3">
                                    <FloatingLabel className="floatingInputGridJug" label="Fecha Nacimiento"
                                                   style={{fontSize: "19px"}}>
                                        <Form.Control type="date" placeholder="Fecha Nacimiento" name="fechaNacimiento"
                                                      style={{fontSize: "20px"}} value={datosJugador.fechaNacimiento} onChange={handleChange}/>
                                    </FloatingLabel>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridCategoria" sm="1">
                                    <FloatingLabel className="floatingInputGridJug" label="Categ."
                                                   style={{fontSize: "19px"}}>
                                        <Form.Control type="text" name="categoria" placeholder="Categ."
                                                      style={{fontSize: "20px"}} value={datosJugador.categoria} readOnly/>
                                    </FloatingLabel>
                                </Form.Group>
                            </Row>

                            <Row className="mb-3">

                                <Form.Group as={Col} controlId="formGridTipoDocumento" sm="3">
                                    <FloatingLabel className="floatingInputGridJug" label="Tipo documento"
                                                   style={{fontSize: "19px"}}>
                                        <Form.Control type="text" name="tipoDocumento" placeholder="Tipo documento"
                                                      style={{fontSize: "20px"}} value={datosJugador.tipoDocumento} onChange={handleChange}/>
                                    </FloatingLabel>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridNumeroDoc" sm="3">
                                    <FloatingLabel className="floatingInputGridJug" label="Numero de documento"
                                                   style={{fontSize: "19px"}}>
                                        <Form.Control type="text" name="documento" placeholder="Numero de documento"
                                                      style={{fontSize: "20px"}} value={datosJugador.documento} onChange={handleChange}/>
                                    </FloatingLabel>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridDireccion" sm="4">
                                    <FloatingLabel className="floatingInputGridJug" label="Dirección"
                                                   style={{fontSize: "19px"}}>
                                        <Form.Control type="text" placeholder="Dirección" name="direccion"
                                                      style={{fontSize: "20px"}} value={datosJugador.direccion}
                                                      onChange={handleChange}/>
                                    </FloatingLabel>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridEstado" sm="2">
                                    <FloatingLabel className="floatingInputGridJug" label="Estado"
                                                   style={{fontSize: "19px"}}>
                                        <Form.Control type="text" name="estado" placeholder="Estado"
                                                      style={{fontSize: "20px"}}
                                                      value={datosJugador.estado ? "Habilitado" : "Deshabilitado"}/>
                                    </FloatingLabel>
                                </Form.Group>
                            </Row>

                            <Row className="mb-3">

                                <Form.Group as={Col} controlId="formGridTelefono">
                                    <FloatingLabel className="floatingInputGridJug" label="Numero de Telefono"
                                                   style={{fontSize: "19px"}}>
                                        <Form.Control type="tel" placeholder="Numero de Telefono" name="telefono"
                                                      style={{fontSize: "20px"}} value={datosJugador.telefono}
                                                      onChange={handleChange}/>
                                    </FloatingLabel>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridEmail">
                                    <FloatingLabel className="floatingInputGridJug" label="Correo Electrónico"
                                                   style={{fontSize: "19px"}}>
                                        <Form.Control type="email" placeholder="mail" name="mail"
                                                      style={{fontSize: "20px"}} value={datosJugador.mail}
                                                      onChange={handleChange}/>
                                    </FloatingLabel>
                                </Form.Group>


                                <Form.Group as={Col} controlId="formGridPassword">
                                    <FloatingLabel className="floatingInputGridJug" label="Password"
                                                   style={{fontSize: "19px"}}>
                                        <Form.Control type="text" placeholder="Password" name="password"
                                                      style={{fontSize: "20px"}} value={datosJugador.password}
                                        onChange={handleChange}/>
                                    </FloatingLabel>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridFechaAlta" sm="3">
                                    <FloatingLabel className="floatingInputGridJug" label="Fecha Alta"
                                                   style={{fontSize: "19px"}}>
                                        <Form.Control type="date" placeholder="Fecha Alta" name="fechaAlta"
                                                      style={{fontSize: "20px"}} value={datosJugador.fechaAlta} readOnly/>
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