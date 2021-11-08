import { Navbar, Container, Nav } from 'react-bootstrap'
import {MdSportsSoccer} from 'react-icons/all'
import { BiUserCircle, BiLogOut} from 'react-icons/bi';
import './NavBarJugador.css'

function NavBarJugador () {
    return(
        <Navbar>
        <Container fluid>
          <MdSportsSoccer style={{width:'30px', height:'30px', color:'white', marginRight:'10px'}}/>
          <Navbar.Brand  style = {{marginRight: '70%'}} href="#"> PERFIL JUGADOR </Navbar.Brand>
          <Nav className="me-auto" >
            <div className = 'miperfil'>
              <BiUserCircle style={{position:'relative', top:'5px' ,width:'30px', height:'30px', color:'white'}}/>
              <Nav.Link href = "/datos/jugador"  >  MI PERFIL </Nav.Link>
            </div>
            <div className = 'cerrarsesion'>
              <BiLogOut  style={{position:'relative', top:'5px' ,width:'30px', height:'30px', color:'white'}}/>
              <Nav.Link href = "/"  > CERRAR SESION </Nav.Link>
            </div>
          </Nav>
          
        </Container>
          </Navbar>   
    )
    
}

export default NavBarJugador;
