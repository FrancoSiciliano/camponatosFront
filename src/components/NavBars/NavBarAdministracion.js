import Container from 'react-bootstrap/Container'
import { Navbar,Nav } from 'react-bootstrap'
import './NavBarAdministracion.css'
import {MdSportsSoccer} from 'react-icons/all'

function NavBarAdministracion () {
  return(
      <Navbar>
      <Container fluid>
        <MdSportsSoccer style={{width:'30px', height:'30px', color:'white', marginRight:'10px'}} />
        <Navbar.Brand  style = {{marginRight: '70%'}} href="#"> PERFIL ADMINISTRADOR </Navbar.Brand>
        <Nav className="me-auto" >
          <Nav.Link href = "/"  > CERRAR SESION </Nav.Link>
        </Nav>
        
      </Container>
        </Navbar>   
  )
  
}

export default NavBarAdministracion;