import Container from 'react-bootstrap/Container'
import './NavBarResponsable.css'
import { Navbar,Nav,NavDropdown } from 'react-bootstrap'
function NavBarResponsable (props) {
  return(
    <Navbar classname="NavbarResponsable">
    <Container>
      <Navbar.Brand href="/homeClub" classname="LogoNavbar">Campiones</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/datosRepresentante" classname="LinkNavbar">Perfil</Nav.Link>
          <NavDropdown title="Gestionar" id="basic-nav-dropdown" classname="LinkNavbar">
            <NavDropdown.Item href="/gestionar/campeonato">Campeonatos</NavDropdown.Item>
            <NavDropdown.Item href="/gestionar/jugadores"> Jugadores</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link href="/">Exit</Nav.Link>
          
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>)}

export default NavBarResponsable;