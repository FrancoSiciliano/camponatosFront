import Container from 'react-bootstrap/Container'
import './NavBarResponsable.css'
import {Navbar, Nav, NavDropdown, Dropdown, Button, Modal, Form} from 'react-bootstrap'
import {useState} from 'react'
import {Link} from 'react-router-dom'
import {MdSportsSoccer} from 'react-icons/all'
import {BiUserCircle, BiLogOut} from 'react-icons/bi';

function NavBarResponsable(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <Navbar className="navbar-jugador">
            <div className="titulo-nav-jugador">
                <MdSportsSoccer style={{width: '30px', height: '30px', color: 'white', marginRight: '10px'}}/>
                <Navbar.Brand href="/home/representante" classname="LogoNavbar">PERFIL
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
                        <Nav.Link href="/datos/representante" classname="LinkNavbar">MI PERFIL</Nav.Link>
                    </div>
                    <div className='jugadores-div'>
                        <NavDropdown title="GESTIONAR" id="basic-nav-dropdown" classname="LinkNavbar">
                        <Dropdown>
                                <Dropdown.Toggle className='ddJugadores'>
                                CLUB
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <NavDropdown.Item href="/datos/club">PERFIL CLUB</NavDropdown.Item>
                                    <Dropdown.Item href="/registro/responsable">AGREGAR RESPONSABLE</Dropdown.Item>
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

                                    <Modal show={show} onHide={handleClose}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>EDITAR PERFIL JUGADOR</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            Ingresar ID del jugador
                                            <Form.Control type="text" placeholder="ID Jugador"/>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Link className="btn btn-success" to="/datos/edicion/responsable"
                                                  onClick={handleClose}>
                                                Editar
                                            </Link>
                                            <Button variant="secondary" onClick={handleClose}>
                                                Cerrar
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>
                                    <Dropdown.Item href="/registro/jugador">AGREGAR</Dropdown.Item>
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
                        <Nav.Link href="/">CERRAR SESION</Nav.Link>
                    </div>
                </div>
            </Nav>
        </Navbar>
    )
}

export default NavBarResponsable;