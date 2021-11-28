import {Col, FloatingLabel, Form, Row, Spinner} from "react-bootstrap"
import {Button} from "react-bootstrap";
import "./RegistroResponsable.css"
import {useEffect, useState} from "react";
import axios from "axios";
import {PopUp} from "../PopUp/PopUp";
import NavBarResponsable from "../NavBars/NavBarResponsable";
import {useHistory} from "react-router-dom";
import {contieneCaracteresEspeciales, contieneNumeros, esUnMail, yaExisteDocumento, yaExisteElMail} from "../../controles";
import NavBarAdministracion from "../NavBars/NavBarAdministracion";

export const RegistroResponsableAdministrador = () => {

    const history = useHistory();
    const datosClub = history.location.state;

    const [title, setTitle] = useState("");
    const [modalTitle, setModalTitle] = useState("");

    const [datos, setDatos] = useState({
        nrodocumento: "",
        nombre: "",
        apellido:"",
        mail:"",
        password:""
    });

    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [datosCargados, setDatosCagados] = useState(false);

    const handleChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name]: event.target.value,
        })
        console.log(datosClub)
    }
    

    const handleSubmit = async (event) => {
        event.preventDefault();

        const existeMail = await yaExisteElMail(datos.mail);
        const existeDocumento = await yaExisteDocumento(datos.nrodocumento);


        if (datos.nombre === "" || contieneNumeros(datos.nombre) || contieneCaracteresEspeciales(datos.nombre)) {
            setError("Nombre no válido");
            setTitle("Error en nombre");
            setModalTitle("Advertencia");
            setShowModal(true);
        }
        else if (datos.apellido === "" || contieneNumeros(datos.apellido) || contieneCaracteresEspeciales(datos.apellido)) {
            setError("Apellido no válido");
            setTitle("Error en apellido");
            setModalTitle("Advertencia");
            setShowModal(true);
        }

        else if (datos.nrodocumento === "" || isNaN(datos.nrodocumento) || existeDocumento) {
            setError("Número de documento no válido");
            setTitle("Error en numero de documento");
            setModalTitle("Advertencia");
            setShowModal(true);
        }

        else if (datos.mail === "" || !esUnMail(datos.mail) || existeMail) {
            setError(existeMail ? "El correo electrónico ingresado ya existe" : "Correo Electrónico no válido");
            setTitle("Error en el correo electrónico");
            setModalTitle("Advertencia");
            setDatosCagados(true);
            setShowModal(true);
        }

        else if (datos.password === "") {
            setError("No puede dejar la contraseña vacía");
            setTitle("Error en la contraseña");
            setModalTitle("Advertencia");
            setShowModal(true);
        } else {
            postData();
        }
    };

    const postData = async () => {
        try{
            console.log(datosClub)
            await axios.post(`http://localhost:8080/crearClub?nombre=${datosClub.nombre}&direccion=${datosClub.direccion}&idClub=${parseInt(datosClub.id)}`)
            await axios.post(`http://localhost:8080/crearResponsable?documento=${datos.nrodocumento}&nombre=${datos.nombre}&apellido=${datos.apellido}&idClub=${parseInt(datosClub.id)}&mail=${datos.mail}&password=${datos.password}`)
            setError("Se registró el responsable con éxito");
            setTitle("Registro completado");
            setModalTitle("Operación exitosa");
            setShowModal(true);
        }catch(e){
            setError("No se pudo registrar el responsable");
            setTitle("Registro fallido");
            setModalTitle("Operación fallida");
            setShowModal(true);
        }

    }

    return (
        <div className="main">
            <NavBarAdministracion/>
            <div className="main-container-registro-Responsable">
                <h1 className="titulo-responsable">Registro Responsable</h1>

                <Form onSubmit={handleSubmit}>

                    <Form.Group as={Col} controlId="formGridEmail" className="mb-3">
                        <FloatingLabel controlId="floatingInputGrid" label="Nombre">
                            <Form.Control type="text" name="nombre" placeholder="Nombre" value={datos.nombre}
                                          onChange={handleChange}/>
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridEmail" className="mb-3">
                        <FloatingLabel controlId="floatingInputGrid" label="Apellido">
                            <Form.Control type="text" name="apellido" placeholder="Apellido" value={datos.apellido}
                                          onChange={handleChange}/>
                        </FloatingLabel>
                    </Form.Group>


                    <Form.Group as={Col} controlId="formGridEmail" className="mb-3">
                        <FloatingLabel controlId="floatingInputGrid" label="Numero de documento">
                            <Form.Control type="text" name="nrodocumento" placeholder="Numero de documento"
                                          value={datos.nrodocumento}
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
                    <Button type="submit" className="btn-success">Finalizar</Button>
                    <PopUp show={showModal} onHide={() => (!datosCargados ? setShowModal(false) : history.push("/home/administracion"))} text={error} title={title} modalTitle={modalTitle}/>
                </Form>
            </div>
        </div>
    );


}