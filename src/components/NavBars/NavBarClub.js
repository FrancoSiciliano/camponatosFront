import Container from 'react-bootstrap/Container'
import './NavBarCampeonatos.css'
import { Navbar,Nav,NavDropdown } from 'react-bootstrap'
function NavBarClub (props) {
  return(
    <div className="NavBarResponsable">
    <Navbar bg="dark" classname="Navbarcamp">
    <Container>
      <Navbar.Brand href="/homeClub">Campiones</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/homeClub">Home</Nav.Link>
          <Nav.Link href="/perfilClub">Perfil</Nav.Link>
          <NavDropdown title="Gestionar" id="basic-nav-dropdown">
            <NavDropdown.Item href="/gestionar/campeonato">Campeonatos</NavDropdown.Item>
            
            <NavDropdown.Item href="/gestionar/jugadores"> Jugadores</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link href="/">Exit</Nav.Link>
          
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar></div>)}

export default NavBarClub;