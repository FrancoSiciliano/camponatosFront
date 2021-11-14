import Container from 'react-bootstrap/Container'
import { Navbar,Nav, NavDropdown, Dropdown, Button, Modal, Form } from 'react-bootstrap'
import './NavBarAdministracion.css'
import {MdSportsSoccer} from 'react-icons/all'
import { useState } from 'react'
import { BiLogOut} from 'react-icons/bi';
import { BsPencil } from 'react-icons/bs'
import { PopUpEdicion } from '../PopUp/PopUpEdicion'

function NavBarAdministracion () {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [tipo, setTipo] = useState("");
  const handleClick = (tipo) => {
    console.log(tipo);
    setTipo(tipo);
    setShow(true);
  }
  return(
      <Navbar>
      <Container fluid>
          <MdSportsSoccer style={{width:'30px', height:'30px', color:'white', marginRight:'10px'}}/>
          <Navbar.Brand  style = {{marginRight: '60%'}} href="/home/administracion"> PERFIL ADMINISTRADOR </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto" >
            <div className = 'editar-admin cerrarsesion'>
              <BsPencil style={{position:'relative', top:'5px' ,width:'25px', height:'25px', color:'white'}}/>
              <NavDropdown title="EDITAR" id="basic-nav-dropdown" classname="LinkNavbar">
                <NavDropdown.Item onClick={()=> handleClick('JUGADOR')} > PERFIL JUGADOR </NavDropdown.Item>
                <Dropdown>
                  <Dropdown.Toggle className= 'ddJugadores'>
                    CLUBES
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Button className = 'ddJugadores'onClick={()=> handleClick('CLUB')}>EDITAR PERFIL </Button>
                    <Dropdown.Item href="/registro/club">AGREGAR CLUB</Dropdown.Item>
                    <Dropdown.Item href="/tabla/clubes">LISTADO CLUBES</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Dropdown>
                  <Dropdown.Toggle className= 'ddJugadores'>
                    REPRESENTANTES
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="/registro/responsable">AGREGAR REPRESENTANTE</Dropdown.Item>
                    <Button className = 'ddJugadores'onClick={()=> handleClick('REPRESENTANTE')}> EDITAR REPRESENTANTE </Button>
                    <Dropdown.Item href="/tabla/representantes">LISTADO REPRESENTATES</Dropdown.Item>
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
          
          <PopUpEdicion handleClose={handleClose} show={show} tipo={tipo ? tipo : "a"}/> 
          
          
      </Container>
      
      </Navbar>   
  )
  
}

export default NavBarAdministracion;