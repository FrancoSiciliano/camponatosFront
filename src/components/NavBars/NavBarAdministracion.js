import Container from 'react-bootstrap/Container'
import { Navbar,Nav,NavDropdown } from 'react-bootstrap'
import './NavBarAdministracion.css'
function NavBarAdministracion (props) {
  return(
    <Navbar bg="dark" classname="Navbarcamp">
    <Container>
      <Navbar.Brand href="/administracion">Administracion</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/perfilAdministrador">Perfil</Nav.Link>          
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>)}

export default NavBarAdministracion;