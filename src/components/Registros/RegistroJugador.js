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
    const regex = /\d/;

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
    const [datosCargados,setDatosCargados] = useState(false);
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
        const existeDocumento = !isNaN(datos.nroDoc) && await yaExisteDocumento(datos.nroDoc);

        if (datos.nombre === "" || contieneNumeros(datos.nombre) || contieneCaracteresEspeciales(datos.nombre)  ) {
            setpopUp({mensaje: "Por favor, Ingrese un nombre valido", titulo: "Nombre Invalido"})
            setShowModal(true);
        }

        else if (datos.apellido === "" || contieneNumeros(datos.apellido) || contieneCaracteresEspeciales(datos.apellido)) {
            setpopUp({mensaje: "Por favor, Ingrese un apellido valido", titulo: "Apellido Invalido"})
            setShowModal(true);
        }

        else if (datos.tipoDoc === "" || contieneNumeros(datos.tipoDoc) || contieneCaracteresEspeciales(datos.tipoDoc)){
            setpopUp({mensaje: "Por favor, Ingrese un tipo de documento valido", titulo: "Tipo de documento Invalido"})
            setShowModal(true);
        }

        else if (datos.nroDoc === "" || existeDocumento || isNaN(datos.nroDoc) ) {
            setpopUp({mensaje: "Por favor, Ingrese un numero de documento valido", titulo: "Numero de documento Invalido"})
            setShowModal(true);
        }

        else if (datos.mail === "" || !esUnMail(datos.mail) || existeMail) {
            setpopUp({mensaje: "Por favor, Ingrese un email valido", titulo: "Email Invalido"})
            setShowModal(true);
        }

        else if (datos.password === "") {
            setpopUp({mensaje: "Por favor, Ingrese una contraseña", titulo: "Contraseña Invalido"})
            setShowModal(true);
        }

        else if (datos.direccion === "") {
            setpopUp({mensaje: "Por favor, Ingrese una direccion valida", titulo: "Direccion Invalido"})
            setShowModal(true);
        }

        else if (datos.nroTelefono === "" || existeTelefono ) {
            setpopUp({mensaje: "Por favor, Ingrese un numero de telefono valido", titulo: "Numero de telefono Invalido"})
            setShowModal(true);
        }
        else if (datos.fechaNacimiento === "") {
            setpopUp({mensaje: "Por favor, Ingrese una fecha de nacimiento", titulo: "Fecha Invalida"})
            setShowModal(true);
        } else {
            await postData();
            setDatosCargados(true);
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
            setpopUp({mensaje: e.response.data.message, titulo: "Operacion fallida"})
            
        }

    }



   
        return (
            <div className="main-page-registro-jugador">
                 <NavBarResponsable />
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
                        <PopUp show={showModal} onHide={() => (!datosCargados ? setShowModal(false) : history.push('/home/representante'))} text={popUp.mensaje} title={popUp.titulo}/>
                    </Form>
                </div>
            </div>
        );
  
}