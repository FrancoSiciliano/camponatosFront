import {Link} from "react-router-dom";
import {Col, FloatingLabel, Form, FormControl, InputGroup, Row} from "react-bootstrap"
import "../../../src/components/Register/Registros.css"
import {useEffect, useState} from "react";
import axios from "axios";
import {PopupRegistro} from "../Login/PopupRegistro";

export const RegistroCampeonato = () => {

    const [datos, setDatos] = useState({
        descripcion: "",
        fechaInicio: "",
        fechaFin: "",
        estado: "Activo"
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
    });

    const handleChange = (event) => {
        setDatos({
            ...datos,
            [event.target.descripcion]: event.target.value,
            [event.target.fechaInicio]: event.target.value,
            [event.target.fechaFin]: event.target.value,
        })
    }

    const handleClick = (event) => {
        if (datos.descripcion === "" || containsNumbers(datos.descripcion)) {
            setError("Nombre no válido");
            setShowModal(true);
            return;
        }
        const response =  axios.post("localhost:3000/crearCampeonato",datos)
        console.log(response)
    };

    const containsNumbers = (string) => {
        return string.match(/\d+/g) != null;
    };
return (
            <div className="main">
                <div className="container main-container-registro">
                    <h1 className="title">Registro Campeonato</h1>
                    <Form>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridDescripcion">
                                <FloatingLabel controlId="floatingInputGrid" label="Descripcion">
                                    <Form.Control type="text" name="descripcion" placeholder="descripcion" value={datos.descripcion}
                                                  onChange={handleChange}/>
                                </FloatingLabel>
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridFecha" sm="3">
                                <FloatingLabel controlId="floatingInputGrid" label="FechaInicio">
                                    <Form.Control type="date"  name="fechaInicio" value={datos.fechaInicio}onChange={handleChange}/>
                                </FloatingLabel>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridFecha" sm="3">
                                <FloatingLabel controlId="floatingInputGrid" label="FechaFin">
                                    <Form.Control type="date" name="fechaFin" value={datos.fechaFin}onChange={handleChange}/>
                                </FloatingLabel>
                            </Form.Group>
                        </Row>
                        <Link className="btn btn-success" to="/registroJugador" onClick={handleClick}>Finalizar</Link>
                        <PopupRegistro show={showModal} onHide={() => setShowModal(false)} text={error} title="No se puede registrar al jugador"/>
                    </Form>
                </div>
            </div>
        );

}