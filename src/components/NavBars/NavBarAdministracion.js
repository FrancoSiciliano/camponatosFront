import Container from 'react-bootstrap/Container'
import { Navbar,Nav, NavDropdown, Dropdown, Button, Modal, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './NavBarAdministracion.css'
import {MdSportsSoccer} from 'react-icons/all'
import { useState } from 'react'
import { BiLogOut} from 'react-icons/bi';
import { BsPencil } from 'react-icons/bs'
import { PopUpEdicion } from '../PopUp/PopUpEdicion'

function NavBarAdministracion () {
  const [show, setShow] = useState(false);
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
                <NavDropdown.Item onClick={()=> handleClick('CLUB')} > PERFIL CLUB </NavDropdown.Item>
                <NavDropdown.Item onClick={()=> handleClick('REPRESENTANTE')} > PERFIL REPRESENTANTE </NavDropdown.Item>
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