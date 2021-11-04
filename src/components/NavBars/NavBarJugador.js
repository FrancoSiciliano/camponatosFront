import { Navbar, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom';

function NavBarJugador () {
    return(
        <Navbar bg="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#"> Perfil del Jugador </Navbar.Brand>
          <div style = {{display:'flex', width:'400px',position: 'relative' , right: '50px', justifyContent:'space-around'}} >
            <Link to = "/datosJugador"  > MODIFICAR PERFIL </Link>
            <Link to = "/"  > CERRAR SESION </Link>
          </div>
          
        </Container>
          </Navbar>   
    )
    
}

export default NavBarJugador;
