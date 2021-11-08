import Container from 'react-bootstrap/Container'
import './NavBarResponsable.css'
import { Navbar,Nav,NavDropdown, Dropdown, Button, Modal, Form} from 'react-bootstrap'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import {MdSportsSoccer} from 'react-icons/all'
import { BiUserCircle, BiLogOut} from 'react-icons/bi';

function NavBarResponsable (props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return(
    <Navbar collapseOnSelect expand="lg" classname="NavbarResponsable">
    <Container fluid>
      <MdSportsSoccer style={{width:'30px', height:'30px', color:'white', marginRight:'10px'}}/>
      <Navbar.Brand style = {{marginRight: '60%'}} href="/home/representante" classname="LogoNavbar">PERFIL REPRESENTANTE</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="me-auto" >
        <div className = 'miperfil'>
          <BiUserCircle style={{position:'relative', top:'5px' ,width:'30px', height:'30px', color:'white'}}/>
          <Nav.Link href="/datos/representante" classname="LinkNavbar">MI PERFIL</Nav.Link>
        </div>
        <div className = 'jugadores-div'>
        <NavDropdown title="GESTIONAR" id="basic-nav-dropdown" classname="LinkNavbar">
          <NavDropdown.Item href="/datos/club">CLUB</NavDropdown.Item>
          <Dropdown>
            <Dropdown.Toggle className= 'ddJugadores'>
              JUGADORES
            </Dropdown.Toggle>
            <Dropdown.Menu>
            <Button className = 'ddJugadores'onClick={handleShow}>
              EDITAR PERFIL
            </Button>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>EDITAR PERFIL JUGADOR</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Ingresar ID del jugador 
                <Form.Control type="text" placeholder="ID Jugador" />  
              </Modal.Body>
              <Modal.Footer>
                <Link className="btn btn-success" to="/datos/edicion/responsable" onClick={handleClose}>
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
        <div className = 'cerrarsesion'>
          <BiLogOut  style={{position:'relative', top:'5px' ,width:'30px', height:'30px', color:'white'}}/>
          <Nav.Link href="/">CERRAR SESION</Nav.Link>
        </div>

      </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )}

export default NavBarResponsable;