import { useState} from "react";
import './Login.css'
import {Row, Form, Button} from "react-bootstrap";
import FloatingLabel from 'react-bootstrap/FloatingLabel'


const roles = [
    {
        value: "Admin",
        label: "Administrador",
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
            </div>
        </div>
    )
}