import {Col, FloatingLabel, Form, Row} from "react-bootstrap"
import {Button} from "react-bootstrap";
import "./RegistroResponsable.css"
import { useState} from "react";
import axios from "axios";
import {PopUp} from "../PopUp/PopUp";
import {useHistory} from 'react-router-dom';
import NavBarResponsable from "../NavBars/NavBarResponsable";
import {yaExisteElMail,yaExisteDocumento,contieneCaracteresEspeciales} from "../../controles";


export const RegistroResponsableByResponsable = () => {
    const history = useHistory();
    let idResponsable = history.location.state;
    const [popUp, setpopUp] = useState ({
        mensaje: "",
        titulo: ""
    })

    const [datos, setDatos] = useState({
        nrodocumento: "",
        nombre: "",
        apellido:"",
        mail:"",
        password:""
    });
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [datosCargados, setDatosCargados] = useState(false);
    const handleChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name]: event.target.value,
        })
    }
    

    const handleSubmit = async (event) => {
        event.preventDefault();

        const existeMail = await yaExisteElMail(datos.mail);
        const existeDocumento = !isNaN(datos.nrodocumento) && await yaExisteDocumento(datos.nrodocumento);

        if (datos.nombre === "" || containsNumbers(datos.nombre) || contieneCaracteresEspeciales(datos.nombre)) {
            setpopUp({mensaje: "Por favor, Ingrese un nombre valido", titulo: "Nombre Invalido"})
            setShowModal(true);
        }
        else if (datos.apellido === "" || containsNumbers(datos.apellido) || contieneCaracteresEspeciales(datos.apellido)) {
            setpopUp({mensaje: "Por favor, Ingrese un apellido valido", titulo: "Apellido Invalido"})
            setShowModal(true);
        }

        else if (datos.nrodocumento === "" || isNaN(datos.nrodocumento) || existeDocumento) {
            setpopUp({mensaje: "Por favor, Ingrese un numero de documento valido", titulo: "Numero de documento Invalido"})
            setShowModal(true);
        }

        else if (datos.mail === "" || !isMail(datos.mail) || existeMail) {
            setpopUp({mensaje: "Por favor, Ingrese un email valido", titulo: "Email Invalido"})
            setShowModal(true);
        }

        else if (datos.password === "") {
            setpopUp({mensaje: "Por favor, Ingrese una contraseña", titulo: "Contraseña Invalido"})
            setShowModal(true);
        } else{
            await postData();
            setShowModal(true);
        }
        
    };
    const postData = async () => {
        try{
            const respuesta = await axios(`http://localhost:8080/getResponsableById?idResponsable=${idResponsable}`)
            const res = respuesta.data;
            await axios.post(`http://localhost:8080/crearResponsable?documento=${datos.nrodocumento}&nombre=${datos.nombre}&apellido=${datos.apellido}&idClub=${res.club.idClub}&mail=${datos.mail}&password=${datos.password}`)
            setpopUp({mensaje: "Se actualizaron los datos", titulo: "Operacion exitosa"})
            setDatosCargados(true);
        }catch(e){
            console.log(e.message)
            setpopUp({mensaje: e.message, titulo: "Operacion fallida"})
            
        }
        setShowModal(false);

    }

    const containsNumbers = (string) => {
        return string.match(/\d+/g) != null;
    }

    const isMail = (string) => {
        return string.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) != null;
    }



    return (
        <div className="main">
            <NavBarResponsable id={idResponsable}/>
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
                    <PopUp show={showModal} onHide={() => ( !datosCargados ? setShowModal(false) : history.push("/home/representante") )} text={popUp.mensaje} title={popUp.titulo}/>
                </Form>
            </div>
        </div>
    );


}