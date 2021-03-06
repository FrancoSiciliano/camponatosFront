import { useHistory} from "react-router-dom";
import './home.css'
import React, {useState} from "react";
import {Row, Form} from "react-bootstrap";
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import axios from "axios";
import {PopUp} from "../PopUp/PopUp";
import auth from "../../auth";
import {GiSoccerKick} from "react-icons/all";

export const Home = () => {

    const history = useHistory();
    const [mensajeError, setMensajeError] = useState("");
    const [tituloError, setTituloError] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [validated, setValidated] = useState(false);

    const [usuario, setUsuario] = useState({
        mail: "",
        password: "",
        rol: "",
    });


    const handleClick = async (event) => {
        const form = event.currentTarget;
        event.preventDefault();

        if (form.checkValidity() === false) {
            event.stopPropagation();
        }

        setValidated(true);

        await axios.get(`http://localhost:8080/loginAdministrador?mail=${usuario.mail}&password=${usuario.password}`)
            .then((res) => {
                auth.login(() => {
                    localStorage.setItem("id", res.data);
                    localStorage.setItem("rol", "ADMIN");
                    history.push("/home/administracion");
                })
            })
            .catch(async () => {
                await axios.get(`http://localhost:8080/loginResponsable?mail=${usuario.mail}&password=${usuario.password}`)
                    .then((res) => {
                        auth.login(() => {
                            localStorage.setItem("id", res.data);
                            localStorage.setItem("rol", "RESPONSABLE");
                            history.push("/home/representante");
                        })
                    })
                    .catch(async () => {
                        await axios.get(`http://localhost:8080/loginJugador?mail=${usuario.mail}&password=${usuario.password}`)
                            .then((res) => {
                                auth.login(() => {
                                    localStorage.setItem("id", res.data);
                                    localStorage.setItem("rol", "JUGADOR");
                                    history.push("/home/jugador");
                                })
                            })
                            .catch((e) => {
                                setModalTitle("No es posible iniciar sesi??n")
                                setTituloError("Credenciales incorrectas");
                                setMensajeError("No existe un jugador, administrador o representante con ese email o contrase??a");
                                setShowModal(true);
                            })
                    })
            });
    };

    const handleChange = (event) => {
        setUsuario({
            ...usuario,
            [event.target.name]: event.target.value,
        });
    };

    return (
        <div className="contenedor-home">
            <div>
                <h1 className="titulo-home">MATCHDAY <GiSoccerKick/></h1>
            </div>
            <Form className="botones-home" onSubmit={handleClick} noValidate validated={validated}>
                <Row className="g-1 ColumnasHome">
                    <FloatingLabel controlId="floatingInputGrid" label="Email address" >
                        <Form.Control type="email" placeholder="name@example.com" name="mail" value={usuario.mail}
                                      onChange={handleChange} required/>
                        <Form.Control.Feedback type="invalid" style={{color: "white"}}>
                            Por favor, ingrese un email v??lido.
                        </Form.Control.Feedback>
                    </FloatingLabel>
                </Row>
                <Row className="g-1 ColumnasHome" >
                    <FloatingLabel controlId="floatingInputGrid" label="Password">
                        <Form.Control type="password" placeholder="Password" name="password" value={usuario.password}
                                      onChange={handleChange} required/>
                        <Form.Control.Feedback type="invalid" style={{color: "white"}}>
                            Por favor, ingrese una contrase??a.
                        </Form.Control.Feedback>
                    </FloatingLabel>
                </Row>
                <button type="submit" className="boton-home btn btn-success">Iniciar Sesi??n</button>
            </Form>
            <PopUp modalTitle={modalTitle} show={showModal} onHide={() => setShowModal(false)} text={mensajeError}
                   title={tituloError}/>
        </div>
    )
}
