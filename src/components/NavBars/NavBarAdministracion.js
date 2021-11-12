import Container from 'react-bootstrap/Container'
import { Navbar,Nav, NavDropdown, Dropdown, Button, Modal, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './NavBarAdministracion.css'
import {MdSportsSoccer} from 'react-icons/all'
import { useState } from 'react'
import { BiLogOut} from 'react-icons/bi';
import { BsPencil } from 'react-icons/bs'

function NavBarAdministracion () {
  
  return(
      <Navbar>
      <Container fluid>
          <MdSportsSoccer style={{width:'30px', height:'30px', color:'white', marginRight:'10px'}}/>
          <Navbar.Brand  style = {{marginRight: '60%'}} href="/home/administracion"> PERFIL ADMINISTRADOR </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto" >
            <div className = 'cerrarsesionadmin'>
              <BiLogOut  style={{position:'relative', top:'5px' ,width:'30px', height:'30px', color:'white'}}/>
              <Nav.Link href="/">CERRAR SESION</Nav.Link>
            </div>
            </Nav>
          </Navbar.Collapse>
          
         
          
          
      </Container>
      
      </Navbar>   
  )
  
}

export default NavBarAdministracion;