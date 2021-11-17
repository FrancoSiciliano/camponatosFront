import {Col, FloatingLabel, Form, Row, Spinner} from "react-bootstrap"
import {Button} from "react-bootstrap";
import "./RegistroResponsable.css"
import {useEffect, useState} from "react";
import axios from "axios";
import {PopUp} from "../PopUp/PopUp";
import NavBarResponsable from "../NavBars/NavBarResponsable";
import { useLocation } from "react-router";
import NavBarAdministracion from "../NavBars/NavBarAdministracion";

export const RegistroResponsableAdministrador = () => {
    const location = useLocation();
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
    }, [data]);

    const handleChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name]: event.target.value,
        })
    }
    

    const handleSubmit = (event) => {
        if (datos.nombre === "" || containsNumbers(datos.nombre)) {
            setError("Nombre no válido");
            setShowModal(true);
        }
        else if (datos.apellido === "" || isNaN(datos.apellido)) {
            setError("Apellido no válido");
            setShowModal(true);
        }


        else if (datos.nrodocumento === "" || isNaN(datos.nrodocumento)) {
            setError("Número de documento no válido");
            setShowModal(true);
        }

        else if (datos.mail === "" || !isMail(datos.mail)) {
            setError("Correo Electrónico no válido");
            setShowModal(true);
        }

        else if (datos.password === "") {
            setError("No puede dejar la contraseña vacía");
            setShowModal(true);
        }
        postData()
    };
    const postData = async () => {
        try{
            await axios.post(`http://localhost:8080/crearClub?idClub=${location.state.idClub}&nombre=${location.state.nombreClub}&direccion=${location.state.direccionClub}`)
            await axios.post(`http://localhost:8080/crearResponsable?documento=${datos.nrodocumento}&nombre=${datos.nombre}&apellido=${datos.apellido}&idClub=${location.state.idClub}&mail=${datos.mail}&password=${datos.password}`)
            setpopUp({mensaje: "Se actualizaron los datos", titulo: "Operacion exitosa"})
            
        }catch(e){
            console.log(e.message)
            setpopUp({mensaje: e.message, titulo: "Operacion fallida"})
            
        }
        setShowModal(true);

    }

    const containsNumbers = (string) => {
        return string.match(/\d+/g) != null;
    }

    const isMail = (string) => {
        return string.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) != null;
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
                    <PopUp show={showModal} onHide={() => setShowModal(false)} text={error} title="No se puede registrar al responsable"/>
                </Form>
            </div>
        </div>
    );


}