import { useState} from "react";
import '../../../src/components/Login/Login.css'
import {Row, Form, Button} from "react-bootstrap";
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import {Link} from "react-router-dom";
import {PopUp} from "../PopUp/PopUp";

const roles = [
    {
        value: "Admin",
        label: "FuncionesAdministrador",
    }, {
        value: "Responsable",
        label: "Responsable",
    }, {
        value: "Jugador",
        label: "Jugador",
    }
]

export const Login = () => {
    const [usuario, setUsuario] = useState({
        mail: "",
        password: "",
        rol: "",
    });

    const [showModal, setShowModal] = useState(false);

    const handleClick = (event) => {
        alert(JSON.stringify(usuario));
    };

    const handleChange = (event) => {
        setUsuario({
            ...usuario,
            [event.target.name]: event.target.value,
        });
    };

    const handleClickLink = (event) => {
        if (usuario.rol !== "Responsable" && usuario.rol !== "Jugador") {
            event.preventDefault();
            setShowModal(true);
        }
    }

    return (
        <div>
            <div className="container-fluid main-container">
                <h1>Iniciar Sesión</h1>
                <Row className="g-1 columna-sign-in">
                    <FloatingLabel controlId="floatingSelectGrid" label="Rol">
                        <Form.Select aria-label="Floating label select example" name="rol" onChange={handleChange}>
                            <option>Seleccionar</option>
                            {roles.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </Form.Select>
                    </FloatingLabel>
                </Row>
                <Row className="g-1 columna-sign-in">
                    <FloatingLabel controlId="floatingInputGrid" label="Email address">
                        <Form.Control type="email" placeholder="name@example.com" name="mail" value={usuario.mail}
                                      onChange={handleChange}/>
                    </FloatingLabel>
                </Row>
                <Row className="g-1 columna-sign-in">
                    <FloatingLabel controlId="floatingInputGrid" label="Password">
                        <Form.Control type="password" placeholder="Password" name="password" value={usuario.password}
                                      onChange={handleChange}/>
                    </FloatingLabel>
                </Row>
                <Row className="g-1 columna-sign-in">
                    <Button type="submit" onClick={handleClick} className="btn-success">
                        Iniciar Sesión
                    </Button>
                </Row>
                <Row>
                    <Link to={usuario.rol === "Responsable" ? "/registroResponsable" : "registroJugador"}  style={{color: "black"}} onClick={handleClickLink}> ¿Aún no estas registrado? Haz Clic aquí</Link>
                    <PopUp show={showModal} onHide={() => setShowModal(false)} text="No puede acceder al registro sin seleccionar un rol. No puede registrarse como administrador." title="Debe seleccionar un rol"/>
                </Row>
            </div>
        </div>
    )
}