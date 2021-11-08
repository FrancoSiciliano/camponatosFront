import {Link} from "react-router-dom";
import './home.css'
import { useState} from "react";
import {Row, Form} from "react-bootstrap";
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
    }]

export const Home = () => {

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
    return (
        <div>
        <div className="contenedor-home">
            <div>
                <h1 className="titulo-home">Furvo</h1>
            </div>
            <div className="botones-home">
                <Row className="g-1 ColumnasHome">
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
                <Row className="g-1 ColumnasHome">
                    <FloatingLabel controlId="floatingInputGrid" label="Email address">
                        <Form.Control type="email" placeholder="name@example.com" name="mail" value={usuario.mail}
                                      onChange={handleChange}/>
                    </FloatingLabel>
                </Row>
                <Row className="g-1 ColumnasHome">
                    <FloatingLabel controlId="floatingInputGrid" label="Password">
                        <Form.Control type="password" placeholder="Password" name="password" value={usuario.password}
                                      onChange={handleChange}/>
                    </FloatingLabel>
                </Row>
                <Row className="g-1 ColumnasHomeBotones">
                <Link to="/" className="boton-home btn btn-success" onClick={handleClick}>Iniciar Sesión</Link>
                </Row>
                <Row className="g-1 ColumnasHomeBotones">
                <Link to="/registro/responsable" className="boton-home btn btn-success">Registrarse</Link>
                </Row>
            </div>
        </div>
        </div>
    )
}
