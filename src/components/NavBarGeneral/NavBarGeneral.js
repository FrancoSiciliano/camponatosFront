import Container from 'react-bootstrap/Container'
import { Navbar,Nav } from 'react-bootstrap'

function NavBarGeneral (props) {
  const lista = props.enlaces.map((enlace) =>//enlace lista de strings 
  <Nav.Link href={"/" + enlace}>{enlace}</Nav.Link>);
  return(

<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Container>
  <Navbar.Brand href="/home">React-Bootstrap</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="me-auto">
      {lista}
    </Nav>
  </Navbar.Collapse>
  </Container>
</Navbar>)}

export default NavBarGeneral;