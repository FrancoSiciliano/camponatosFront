import React from 'react';
import './datos.css';
import Avatar from '../../assets/images/escudofutbol.png';
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import {FloatingLabel} from 'react-bootstrap';
import {Link, useHistory} from 'react-router-dom';
import {useState} from 'react';
import axios from 'axios';
import {useEffect} from 'react';
import {PopUp} from "../PopUp/PopUp";
import NavBarResponsable from '../NavBars/NavBarResponsable';
import NavBarAdministracion from "../NavBars/NavBarAdministracion";

export const DatosClub = (props) => {
    const history = useHistory();
    let idResponsable = localStorage.getItem("id");
    const [data, setData] = useState([]);
    const [responsable, setResponsable] = useState([]);
    const [jugadores, setJugadores] = useState([]);
    const [popUp, setpopUp] = useState({
        mensaje: "",
        titulo: ""
    })
    const [showModal, setShowModal] = useState(false);
    const rol = localStorage.getItem("rol");

    useEffect(() => {
        const fetchData = async () => {
            if (rol === "RESPONSABLE") {
                const respuesta = await axios(`http://localhost:8080/getResponsableById?idResponsable=${idResponsable}`)
                const res = respuesta.data;
                setResponsable(res)
                const club = await axios(`http://localhost:8080/getClubById?idClub=${res.club.idClub}`);
                const jugador = await axios(`http://localhost:8080/getJugadoresByClub?idClub=${res.club.idClub}`);
                const newData = club.data;
                const jugadoresClub = jugador.data;
                setData(newData);
                setJugadores(jugadoresClub);
            } else {
                const respuesta = await axios(`http://localhost:8080/getClubById?idClub=${history.location.state}`);
                const res = respuesta.data;
                try {
                    const jugadores = await axios(`http://localhost:8080/getJugadoresByClub?idClub=${history.location.state}`);
                    const jugadoresClub = jugadores.data;
                    setJugadores(jugadoresClub);
                } catch (e) {
                    setJugadores([]);
                }
                setData(res);
            }
        }
        fetchData();
    }, [])

    const navbar = () => {
        if (localStorage.getItem("rol") === "RESPONSABLE") {
            return <NavBarResponsable/>;
        } else {
            return <NavBarAdministracion/>;
        }
    }

    const handleChange = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value,
        })
    }

    const postData = async (data) => {
        try {
            console.log(responsable);
            await axios.post(`http://localhost:8080/modificarClub?idClub=${responsable.club.idClub}&nombre=${data.nombre}&direccion=${data.direccion}`)
            setpopUp({mensaje: "Se actualizaron los datos", titulo: "Operacion exitosa"})

        } catch (e) {
            console.log(e.message)
            setpopUp({mensaje: e.message, titulo: "Operacion fallida"})

        }
        setShowModal(true);

    }
    const handleSubmit = (event) => {
        event.preventDefault();
        if (data.direccion === "") {
            setpopUp({mensaje: "Dirección no válida", titulo: "Dato erroneo"});
            setShowModal(true);
            return;

        }
        if (data.nombre === "") {
            setpopUp({mensaje: "Nombre no válido", titulo: "Dato erroneo"});
            setShowModal(true);
            return;
        }
        postData(data)
    }

    return (
        <div className="main-container-datos-navbar-jugador">
            {navbar()}
            <div className='main-container-datos'>

                <h2 className='titledatos'>Perfil del Club</h2>

                <div className="datos-perfil-club">
                    <div className='avatar-club'>
                        <img src={Avatar} alt='avatarPerfil' width='300px' height='280px'/>
                    </div>
                    <div className='contenedor-datos'>
                        <Form className="formulario formulario-club" onSubmit={handleSubmit}>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridNombre">
                                    <FloatingLabel className="floatingInputGridRep" label="Nombre"
                                                   style={{fontSize: "19px"}}>
                                        <Form.Control type="text" name="nombre" placeholder="Nombre"
                                                      style={{fontSize: "20px"}} value={data.nombre}
                                                      onChange={handleChange}/>
                                    </FloatingLabel>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridDireccion">
                                    <FloatingLabel className="floatingInputGridJug" label="Dirección"
                                                   style={{fontSize: "19px"}}>
                                        <Form.Control type="text" placeholder="Dirección" name="direccion"
                                                      style={{fontSize: "20px"}} value={data.direccion}
                                                      onChange={handleChange}/>
                                    </FloatingLabel>
                                </Form.Group>

                            </Row>
                            <Row style={{width: "100%"}}>
                                <div className='scrollable'>
                                    <Form.Group as={Col} md='12' controlId="formGridTabla">
                                        <Table>
                                            <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Nombre</th>
                                                <th>Apellido</th>
                                                <th>Documento</th>
                                                <th>Categoria</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                jugadores.map((jugador, index) => {
                                                    return (
                                                        <tr>
                                                            <th> {jugador.idJugador} </th>
                                                            <th> {jugador.nombre} </th>
                                                            <th> {jugador.apellido} </th>
                                                            <th> {jugador.documento} </th>
                                                            <th> {jugador.categoria} </th>
                                                        </tr>);
                                                })
                                            }
                                            </tbody>
                                        </Table>
                                    </Form.Group>
                                </div>
                            </Row>

                            <PopUp show={showModal} onHide={() => setShowModal(false)} text={popUp.mensaje}
                                   title={popUp.titulo}/>

                            <Button type="submit" className="btn btn-success boton"> Actualizar</Button>

                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}