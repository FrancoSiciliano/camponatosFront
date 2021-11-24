import './NavBarResponsable.css'
import {Navbar, Nav, NavDropdown, Dropdown, Button, Modal, Form} from 'react-bootstrap'
import {useState} from 'react'
import {Link,useHistory} from 'react-router-dom'
import {MdSportsSoccer} from 'react-icons/all'
import {BiUserCircle, BiLogOut} from 'react-icons/bi';

function NavBarResponsable() {
    const history = useHistory();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const id = localStorage.getItem("id");

    const handleClick = () => {
        localStorage.removeItem("id");
        history.push("/")
    }

    const handleClickMiPerfil = () =>{
        history.push("/datos/representante", id);
    }
    const handleClickListadoJugadores = ()=>{
        history.push("/tabla/Jugadores",props.id)
    }
    const handleClickPerfilClub = () =>{
        history.push("/datos/club", id);
    }
    const handleClickAgregarResponsable = () =>{
        history.push("/registro/responsable", id);
    }
    const handleClickAgregarJugador = () =>{
        history.push("/registro/jugador", id);
    }
    const handleClickPerfilRepresentante = () =>{
        history.push("/home/representante", id);
    }
    return (
        <Navbar className="navbar-jugador">
            <div className="titulo-nav-jugador">
                <MdSportsSoccer style={{width: '30px', height: '30px', color: 'white', marginRight: '10px'}}/>
                <Navbar.Brand classname="LogoNavbar" onClick={handleClickPerfilRepresentante}>PERFIL REPRESENTANTE</Navbar.Brand>
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
                                    <NavDropdown.Item  onClick={handleClickPerfilClub}>PERFIL CLUB</NavDropdown.Item>
                                    <Dropdown.Item onClick={handleClickAgregarResponsable}>AGREGAR RESPONSABLE</Dropdown.Item>
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
                                    <Dropdown.Item onClick={handleClickAgregarJugador}>AGREGAR JUGADOR</Dropdown.Item>
                                    <Dropdown.Item onClick={handleClickListadoJugadores}>LISTADO JUGADORES</Dropdown.Item>
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