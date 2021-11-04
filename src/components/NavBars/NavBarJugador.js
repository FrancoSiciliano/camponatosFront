import { Navbar, Container, Nav } from 'react-bootstrap'
import {MdSportsSoccer} from 'react-icons/all'

function NavBarJugador () {
    return(
        <Navbar>
        <Container fluid>
          <MdSportsSoccer style={{width:'30px', height:'30px', color:'white', marginRight:'10px'}}/>
          <Navbar.Brand  style = {{marginRight: '70%'}} href="#"> PERFIL JUGADOR </Navbar.Brand>
          <Nav className="me-auto" >
            <Nav.Link href = "/datos/jugador"  > MI PERFIL </Nav.Link>
            <Nav.Link href = "/"  > CERRAR SESION </Nav.Link>
          </Nav>
          
        </Container>
          </Navbar>   
    )
    
}

export default NavBarJugador;
