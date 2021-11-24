import './NavBarResponsable.css'
import {Navbar, Nav, NavDropdown, Dropdown, Button, Modal, Form, Col, FloatingLabel} from 'react-bootstrap'
import React, {useEffect, useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {MdSportsSoccer} from 'react-icons/all'
import {BiUserCircle, BiLogOut} from 'react-icons/bi';
import axios from "axios";

function NavBarResponsable() {
    const history = useHistory();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const id = localStorage.getItem("id");
    const [listaJugadoresClub, setListaJugadoresClub] = useState(null);
    const [jugadorSeleccionado, setJugadorSeleccionado] = useState(null);

    const handleClick = () => {
        localStorage.removeItem("id");
        history.push("/")
    }

    const handleClickMiPerfil = () => {
        history.push("/datos/representante", id);
    }
    const handleClickListadoJugadores = () => {
        history.push("/tabla/Jugadores", id)
    }
    const handleClickPerfilClub = () => {
        history.push("/datos/club", id);
    }
    const handleClickAgregarResponsable = () => {
        history.push("/registro/responsable", id);
    }
    const handleClickAgregarJugador = () => {
        history.push("/registro/jugador", id);
    }
    const handleClickPerfilRepresentante = () => {
        history.push("/home/representante", id);
    }

    const handleChangeJugadorSelect = (event) => {
        setJugadorSeleccionado(event.target.value)
    }

    useEffect(async () => {
        const fetchDataClub = async () => {
            const res = await axios.get(`http://localhost:8080/getResponsableById?idResponsable=${id}`);
            return res.data;
        }

        const fetchDataJugadores = async () => {
            const responsable = await fetchDataClub();
            const club = responsable.club.idClub;
            const res = await axios.get(`http://localhost:8080/getJugadoresByClub?idClub=${club}`);
            setListaJugadoresClub(res.data);
        }
        await fetchDataJugadores();
    }, [])

    return (
        <Navbar className="navbar-jugador">
            <div className="titulo-nav-jugador">
                <MdSportsSoccer style={{width: '30px', height: '30px', color: 'white', marginRight: '10px'}}/>
                <Navbar.Brand classname="LogoNavbar" onClick={handleClickPerfilRepresentante} style={{cursor:"pointer"}}>PERFIL
                    REPRESENTANTE</Navbar.Brand>
            </div>

            <Nav>
                <div className="botones-nav">
                    <div className='miperfil'>
                        <BiUserCircle style={{
                            width: '30px',
                            height: '30px',
                            color: 'white'
                        }}/>
                        <Nav.Link classname="LinkNavbar" onClick={handleClickMiPerfil}> MI PERFIL</Nav.Link>
                    </div>
                    <div className='jugadores-div'>
                        <NavDropdown title="GESTIONAR" id="basic-nav-dropdown" classname="LinkNavbar">
                            <Dropdown>
                                <Dropdown.Toggle className='ddJugadores'>
                                    CLUB
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <NavDropdown.Item onClick={handleClickPerfilClub}>PERFIL CLUB</NavDropdown.Item>
                                    <Dropdown.Item onClick={handleClickAgregarResponsable}>AGREGAR
                                        RESPONSABLE</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>

                            <Dropdown>
                                <Dropdown.Toggle className='ddJugadores'>
                                    JUGADORES
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Button className='ddJugadores' onClick={handleShow}>
                                        EDITAR PERFIL
                                    </Button>

                                    {listaJugadoresClub &&
                                    <Modal show={show} onHide={handleClose}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>EDITAR PERFIL JUGADOR</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <Form.Group controlId="formGridJugadorGol" id="formGridJugadorGol">
                                                <FloatingLabel controlId="floatingInputGrid" label="Jugador">
                                                    <Form.Select type="label-select" name='idJugador'
                                                                 onChange={handleChangeJugadorSelect}>
                                                        <option>
                                                            -
                                                        </option>
                                                        {listaJugadoresClub.map((dato, index) => {
                                                            return (
                                                                <option
                                                                    key={index}
                                                                    value={dato.idJugador}> {`${dato.idJugador} - ${dato.nombre} ${dato.apellido}`}
                                                                </option>
                                                            )
                                                        })}
                                                    </Form.Select>
                                                </FloatingLabel>
                                            </Form.Group>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            {jugadorSeleccionado && <Link className="btn btn-success" to={{
                                                pathname: "/datos/edicion/responsable",
                                                state: {idJugador: jugadorSeleccionado}
                                            }}
                                                                          onClick={handleClose}>
                                                Editar
                                            </Link>}
                                            <Button variant="secondary" onClick={handleClose}>
                                                Cerrar
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>}
                                    <Dropdown.Item onClick={handleClickAgregarJugador}>AGREGAR JUGADOR</Dropdown.Item>
                                    <Dropdown.Item onClick={handleClickListadoJugadores}>LISTADO
                                        JUGADORES</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </NavDropdown>
                    </div>
                    <div className='cerrarsesion'>
                        <BiLogOut style={{
                            width: '30px',
                            height: '30px',
                            color: 'white'
                        }}/>
                        <Nav.Link onClick={handleClick}>CERRAR SESION</Nav.Link>
                    </div>
                </div>
            </Nav>
        </Navbar>
    )
}

export default NavBarResponsable;