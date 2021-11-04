import Container from 'react-bootstrap/Container'
import './NavBarResponsable.css'
import { Navbar,Nav,NavDropdown, Dropdown} from 'react-bootstrap'

import {MdSportsSoccer} from 'react-icons/all'
function NavBarResponsable (props) {
  return(
    <Navbar collapseOnSelect expand="lg" classname="NavbarResponsable">
    <Container fluid>
      <MdSportsSoccer style={{width:'30px', height:'30px', color:'white', marginRight:'10px'}}/>
      <Navbar.Brand style = {{marginRight: '60%'}} href="/home/responsable" classname="LogoNavbar">PERFIL REPRESENTANTE</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="me-auto" >
        <Nav.Link href="/datos/representante" classname="LinkNavbar">MI PERFIL</Nav.Link>
        <NavDropdown title="GESTIONAR" id="basic-nav-dropdown" classname="LinkNavbar">
          <NavDropdown.Item href="/gestionar/campeonato"> CLUB </NavDropdown.Item>
          <Dropdown>
            <Dropdown.Toggle className= 'ddJugadores'>
              JUGADORES
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">PERFIL</Dropdown.Item>
              <Dropdown.Item href="#/action-2">AGREGAR</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
        </NavDropdown>
        <Nav.Link href="/">CERRAR SESION</Nav.Link>

      </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )}

export default NavBarResponsable;