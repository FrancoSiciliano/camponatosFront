import React from 'react';
import './datos.css';
import Avatar from '../../assets/images/representante.png';
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import {FloatingLabel, Spinner} from 'react-bootstrap';
import {useState, useEffect} from 'react';
import {PopUp} from "../PopUp/PopUp";
import axios from 'axios';
import { useLocation,useHistory } from 'react-router';

export const DatosRepresentante = () => {
    const history = useHistory();
    let idResponsable = history.location.state;
    const [data, setData] = useState(null);
    const [clubes, setClubes] = useState([]);
    const [popUp, setpopUp] = useState({
        mensaje: "",
        titulo: ""
    })
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios(`http://localhost:8080/getResponsableById?idResponsable=${idResponsable}`);
            const response2 = await axios(`http://localhost:8080/getClubes`);
            const newData = response.data;
            const newData2 = response2.data;
            setData(newData);
            setClubes(newData2);
        }
        fetchData();
    }, [])

    const handleChange = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value,
        })
    }

    const handleChangeClub = (event) => {
        setData({
            ...data,
            club: {idClub: event.target.value}
        })
    }

    const postData = async (data) => {
        try {
            await axios.post(`http://localhost:8080/modificarResponsable?legajo=${idResponsable}&nombre=${data.nombre}&idClub=${data.club.idClub}`)
            setpopUp({mensaje: "Se actualizaron los datos", titulo: "Operacion exitosa"})

        } catch (e) {
            console.log(e.message)
            setpopUp({mensaje: e.message, titulo: "Operacion fallida"})

        }
        setShowModal(true);

    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (data.nombre === "") {
            setpopUp({mensaje: "Nombre no válido", titulo: "Dato erroneo"});
            setShowModal(true);
            return;

        }
        if (data.club.idClub === "") {
            setpopUp({mensaje: "Club no válido", titulo: "Dato erroneo"});
            setShowModal(true);
            return;
        }
        postData(data)
    }

    if (data) {
        return (
            <div>
                <div className='main-container-datos'>

                    <h2 className='titledatos'>Perfil del Representante </h2>

                    <div className="datos-perfil">
                        <div className='avatar'>
                            <img src={Avatar} alt='avatarPerfil' width='300px' height='280px'/>
                        </div>
                        <div className='contenedor-datos'>
                            <Form className='formulario' onSubmit={handleSubmit}>
                                <Row className="mb-2">
                                    <Form.Group as={Col} controlId="formGridLegajo">
                                        <FloatingLabel className="floatingInputGridRep" label="Legajo"
                                                       style={{fontSize: "19px"}}>
                                            <Form.Control type="text" name="legajo" placeholder="Legajo"
                                                          style={{fontSize: "20px"}} value={data.legajo} readOnly/>
                                        </FloatingLabel>
                                    </Form.Group>
                                </Row>
                                <Row className="mb-2">
                                    <Form.Group as={Col} controlId="formGridNumeroDoc">
                                        <FloatingLabel className="floatingInputGridRep" label="Numero de documento"
                                                       style={{fontSize: "19px"}}>
                                            <Form.Control type="text" name="documento" placeholder="Numero de documento"
                                                          style={{fontSize: "20px"}} value={data.documento} readOnly/>
                                        </FloatingLabel>
                                    </Form.Group>
                                </Row>
                                <Row className="mb-2">
                                    <Form.Group as={Col} controlId="formGridNombre">
                                        <FloatingLabel className="floatingInputGridRep" label="Nombre"
                                                       style={{fontSize: "19px"}}>
                                            <Form.Control type="text" name="nombre" placeholder="Nombre"
                                                          style={{fontSize: "20px"}} value={data.nombre}
                                                          onChange={handleChange}/>
                                        </FloatingLabel>
                                    </Form.Group>
                                </Row>
                                <Row className="mb-2">
                                    <Form.Group as={Col} controlId="formGridClub">
                                        <FloatingLabel className="floatingInputGridRep" label="Club"
                                                       style={{fontSize: "19px"}}>
                                            <Form.Select name="club.idClub" placeholder="Club"
                                                         style={{fontSize: "20px"}} value={data.club.idClub}
                                                         onChange={handleChangeClub}>
                                                <option>Seleccionar</option>
                                                {clubes.map((club, index) => {
                                                    return (
                                                        <option key={index}
                                                                value={club.idClub}>{`${club.idClub} - ${club.nombre}`}</option>)
                                                })}
                                            </Form.Select>
                                        </FloatingLabel>
                                    </Form.Group>
                                </Row>


                                <PopUp show={showModal} onHide={() => setShowModal(false)} text={popUp.mensaje}
                                       title={popUp.titulo}/>

                                <Button type="submit" className="btn btn-success boton"> Actualizar </Button>

                            </Form>
                        </div>
                    </div>
                </div>
            </div>

        )
    } else {
        return (<h1>Cargando...</h1>);
    }
}