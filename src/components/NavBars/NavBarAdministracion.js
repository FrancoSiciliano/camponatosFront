import {Navbar, Nav, NavDropdown, Dropdown, Button} from 'react-bootstrap'
import './NavBarAdministracion.css'
import {MdSportsSoccer} from 'react-icons/all'
import {useState} from 'react'
import {BiLogOut} from 'react-icons/bi';
import {BsPencil} from 'react-icons/bs'

function NavBarAdministracion() {
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const [tipo, setTipo] = useState("");
    const handleClick = (tipo) => {
        console.log(tipo);
        setTipo(tipo);
        setShow(true);
    }
    return (
        <Navbar className="navbar-jugador">
            <div className="titulo-nav-jugador">
                <MdSportsSoccer style={{width: '30px', height: '30px', color: 'white', marginRight: '10px'}}/>
                <Navbar.Brand href="/home/administracion"> PERFIL
                    ADMINISTRADOR </Navbar.Brand>
            </div>
            <Nav>
                <div className='editar-admin cerrarsesion'>
                    <BsPencil style={{
                        width: '25px',
                        height: '25px',
                        color: 'white'
                    }}/>
                    <NavDropdown title="EDITAR" id="basic-nav-dropdown" classname="LinkNavbar">
                    <Dropdown>
                            <Dropdown.Toggle className='ddJugadores'>JUGADORES</Dropdown.Toggle>
                            <Dropdown.Menu>
                            <NavDropdown.Item onClick={() => handleClick('JUGADOR')}> PERFIL JUGADOR </NavDropdown.Item>
                            <Dropdown.Item href="/tabla/jugadores">LISTADO JUGADORES</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                       
                        <Dropdown>
                            <Dropdown.Toggle className='ddJugadores'>
                                CLUBES
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Button className='ddJugadores' onClick={() => handleClick('CLUB')}>EDITAR
                                    PERFIL </Button>
                                <Dropdown.Item href="/registro/club">AGREGAR CLUB</Dropdown.Item>
                                <Dropdown.Item href="/tabla/clubes">LISTADO CLUBES</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown>
                            <Dropdown.Toggle className='ddJugadores'>
                                REPRESENTANTES
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href="/registro/responsable">AGREGAR
                                    REPRESENTANTE</Dropdown.Item>
                                <Button className='ddJugadores'
                                        onClick={() => handleClick('REPRESENTANTE')}> EDITAR
                                    REPRESENTANTE </Button>
                                <Dropdown.Item href="/tabla/representantes">LISTADO
                                    REPRESENTATES</Dropdown.Item>
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
            </Nav>

        </Navbar>
    )

}

export default NavBarAdministracion;