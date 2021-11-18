import {Col, FloatingLabel, Form,Row,Button} from "react-bootstrap"

import "./RegistroJugador.css"
import {useEffect, useState} from "react";
import axios from "axios";
import {PopUp} from "../PopUp/PopUp";
import {contieneNumeros, esUnMail} from "../../controles";

export const RegistroJugador = () => {

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

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios(`http://localhost:8080/getClubes`);
            const newData = response.data;
            setData(newData);
        };
        fetchData();
    },[]);

    const handleChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name]: event.target.value,
            
        },
        console.log(datos))
    }

    const handleSubmit = (event) => {
        console.log(datos.fechaNacimiento)
        if (datos.nombre === "" || contieneNumeros(datos.nombre)) {
            setError("Nombre no válido");
            setShowModal(true);
        }

        else if (datos.apellido === "" || contieneNumeros(datos.apellido)) {
            setError("Apellido no válido");
            setShowModal(true);
        }

        else if (datos.tipoDoc === "" || contieneNumeros(datos.tipoDoc)){
            setError("Tipo de documento no válido");
            setShowModal(true);
        }

        else if (datos.nroDoc === "" || isNaN(datos.nroDoc)) {
            setError("Número de documento no válido");
            setShowModal(true);
        }

        else if (datos.mail === "" || !esUnMail(datos.mail)) {
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

        else if (datos.nroTelefono === "" || isNaN(datos.nroTelefono) ) {
            setError("Número de telefono no válido");
            setShowModal(true);
        }

        else if (datos.idClub === "" || datos.idClub === "Seleccionar") {
            setError("Por favor, seleccione el club al que pertenece el jugador");
            setShowModal(true);
        }

        else if (datos.fechaNacimiento === "") {
            setError("Por favor, Ingrese una fecha de nacimiento");
            setShowModal(true);
        }

        postData();
    };
    const postData = async () => {
        try{
            axios.post(`http://localhost:8080/crearJugador?tipoDoc=${datos.tipoDoc}&documento=${datos.nroDoc}&nombre=${datos.nombre}&apellido=${datos.apellido}&idClub=1&fechaNac=${datos.fechaNacimiento.replace(/-/g,"/")}&direccion=${datos.direccion}&mail=${datos.mail}&password=${datos.password}&telefono=${datos.nroTelefono}`)
            setpopUp({mensaje: "Se actualizaron los datos", titulo: "Operacion exitosa"})
            
        }catch(e){
            console.log(e.message)
            setpopUp({mensaje: e.message, titulo: "Operacion fallida"})
            
        }
        setShowModal(true);

    }



    if (data) {
        return (
            <div className="main">
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
    } else {
        return (<h1>Cargando...</h1>);
    }
}