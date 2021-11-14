import {Link, useHistory} from "react-router-dom";
import './home.css'
import {useState} from "react";
import {Row, Form} from "react-bootstrap";
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import axios from "axios";

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

    const history = useHistory();

    const [usuario, setUsuario] = useState({
        mail: "",
        password: "",
        rol: "",
    });

    const [showModal, setShowModal] = useState(false);

    const handleClick = async (event) => {
        try {
            let response;

            switch (usuario.rol) {
                case "Admin":
                    response = await axios.get(`http://localhost:8080/validarAdministrador?mail=${usuario.mail}&password=${usuario.password}`)
                    response.data ? history.push("/home/administracion") : setShowModal(true);
                    break;
                case "Responsable":
                    response = await axios.get(`http://localhost:8080/validarResponsable?mail=${usuario.mail}&password=${usuario.password}`)
                    response.data ? history.push("/home/representante") : setShowModal(true);
                    break;
                case "Jugador":
                    response = await axios.get(`http://localhost:8080/validarJugador?mail=${usuario.mail}&password=${usuario.password}`)
                    response.data ? history.push("/home/jugador") : setShowModal(true);
                    break;
                default:
                    setShowModal(true);
            }

        } catch (e) {
            console.log(e);
        }

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
    )
}
