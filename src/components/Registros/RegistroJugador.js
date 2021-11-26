import {Col, FloatingLabel, Form,Row,Button} from "react-bootstrap"
import { useHistory } from "react-router";
import "./RegistroJugador.css"
import {useEffect, useState} from "react";
import axios from "axios";
import {PopUp} from "../PopUp/PopUp";
import {contieneNumeros, esUnMail, yaExisteElMail,contieneCaracteresEspeciales, yaExisteDocumento, yaExisteTelefono} from "../../controles";
import NavBarResponsable from "../NavBars/NavBarResponsable";
import { ErrorPagina } from "../NotFound/ErrorPagina";

export const RegistroJugador = () => {
    const history = useHistory();
    const idResponsable = localStorage.getItem('id');


    const [popUp, setpopUp] = useState ({
        mensaje: "",
        titulo: ""
    })
    const [datos, setDatos] = useState({
        nombre: "",
        apellido: "",
        mail: "",
        password: "",
        direccion: "",
        nroTelefono: "",
        tipoDoc: "",
        nroDoc: "",
        fechaNacimiento: "",
        idClub: "",
    });

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name]: event.target.value,
            
        },
        console.log(datos))
    }



    const handleSubmit = async (event) => {
        event.preventDefault();


        const existeMail = await yaExisteElMail(datos.mail);
        const existeTelefono = await yaExisteTelefono(datos.nroTelefono);
        const existeDocumento = await yaExisteDocumento(datos.nroDoc);

        if (datos.nombre === "" || contieneNumeros(datos.nombre) || contieneCaracteresEspeciales(datos.nombre)) {
            setError("Nombre no válido");
            setShowModal(true);
        }

        else if (datos.apellido === "" || contieneNumeros(datos.apellido) || contieneCaracteresEspeciales(datos.nombre)) {
            setError("Apellido no válido");
            setShowModal(true);
        }

        else if (datos.tipoDoc === "" || contieneNumeros(datos.tipoDoc) || contieneCaracteresEspeciales(datos.nombre)){
            setError("Tipo de documento no válido");
            setShowModal(true);
        }

        else if (datos.nroDoc === "" || isNaN(datos.nroDoc) || existeDocumento ) {
            setError("Número de documento no válido");
            setShowModal(true);
        }

        else if (datos.mail === "" || !esUnMail(datos.mail) || existeMail) {
            setError("Correo Electrónico no válido");
            setShowModal(true);
        }

        else if (datos.password === "") {
            setError("No puede dejar la contraseña vacía");
            setShowModal(true);
        }

        else if (datos.direccion === "") {
            setError("Dirección no Válida");
            setShowModal(true);
        }

        else if (datos.nroTelefono === "" || isNaN(datos.nroTelefono) || existeTelefono ) {
            setError("Número de telefono no válido");
            setShowModal(true);
        }
        else if (datos.fechaNacimiento === "") {
            setError("Por favor, Ingrese una fecha de nacimiento");
            setShowModal(true);
        } else {
            postData();
            setShowModal(true);
        }

    };
    const postData = async () => {
        try{
            const respuesta = await axios(`http://localhost:8080/getResponsableById?idResponsable=${idResponsable}`);
            const res = respuesta.data;
            axios.post(`http://localhost:8080/crearJugador?tipoDoc=${datos.tipoDoc}&documento=${datos.nroDoc}&nombre=${datos.nombre}&apellido=${datos.apellido}&idClub=${res.club.idClub}&fechaNac=${datos.fechaNacimiento.replace(/-/g,"/")}&direccion=${datos.direccion}&mail=${datos.mail}&password=${datos.password}&telefono=${datos.nroTelefono}`)
            setpopUp({mensaje: "Se actualizaron los datos", titulo: "Operacion exitosa"})
            
        }catch(e){
            console.log(e.message)
            setpopUp({mensaje: e.message, titulo: "Operacion fallida"})
            
        }
        setShowModal(false);

    }



   
        return (
            <div className="main">
                 <NavBarResponsable id={idResponsable}/>
                <div className="main-container-registro-Jugador">
               
                    <h1 className="titulo-responsable">Registro Jugador</h1>

                    <Form onSubmit={handleSubmit}>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridEmail">
                                <FloatingLabel controlId="floatingInputGrid" label="Nombre">
                                    <Form.Control type="text" name="nombre" placeholder="Nombre" value={datos.nombre}
                                                  onChange={handleChange}/>
                                </FloatingLabel>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPassword">
                                <FloatingLabel controlId="floatingInputGrid" label="Apellido">
                                    <Form.Control type="text" name="apellido" placeholder="Apellido" value={datos.apellido}
                                                  onChange={handleChange}/>
                                </FloatingLabel>
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridPassword" sm="3">
                                <FloatingLabel controlId="floatingInputGrid" label="Fecha Nacimiento" style={{fontSize: "14px"}}>
                                    <Form.Control type="date" placeholder="Fecha Nacimiento" name="fechaNacimiento" value={datos.fechaNacimiento}
                                                  onChange={handleChange} style={{fontSize: "13px"}}/>
                                </FloatingLabel>
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridEmail" sm="3">
                                <FloatingLabel controlId="floatingInputGrid" label="Tipo de documento" style={{fontSize: "12px"}}>
                                    <Form.Control type="text" name="tipoDoc" placeholder="Tipo de documento" value={datos.tipoDoc}
                                                  onChange={handleChange} id="tipoDoc"/>
                                </FloatingLabel>
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridPassword" sm="6">
                                <FloatingLabel controlId="floatingInputGrid" label="Numero de documento">
                                    <Form.Control type="text" name="nroDoc" placeholder="Numero de documento" value={datos.nroDoc}
                                                  onChange={handleChange}/>
                                </FloatingLabel>
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">

                            <Form.Group as={Col} controlId="formGridEmail">
                                <FloatingLabel controlId="floatingInputGrid" label="Correo Electrónico">
                                    <Form.Control type="email" placeholder="Correo Electrónico" name="mail" value={datos.mail} 
                                                  onChange={handleChange}/>
                                </FloatingLabel>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPassword">
                                <FloatingLabel controlId="floatingInputGrid" label="Password">
                                    <Form.Control type="password" placeholder="Password" name="password" value={datos.password}
                                                  onChange={handleChange}/>
                                </FloatingLabel>
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridEmail">
                                <FloatingLabel controlId="floatingInputGrid" label="Dirección">
                                    <Form.Control type="text" placeholder="Dirección" name="direccion" value={datos.direccion}
                                                  onChange={handleChange}/>
                                </FloatingLabel>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPassword">
                                <FloatingLabel controlId="floatingInputGrid" label="Numero de Telefono">
                                    <Form.Control type="tel" placeholder="Numero de Telefono" name="nroTelefono" value={datos.nroTelefono}
                                                  onChange={handleChange}/>
                                </FloatingLabel>
                            </Form.Group>
                        </Row>
                        <Button type="submit" className="btn-success">Finalizar</Button>
                        <PopUp show={showModal} onHide={() => setShowModal(false)} text={error} title="No se puede registrar al jugador"/>
                    </Form>
                </div>
            </div>
        );
  
}