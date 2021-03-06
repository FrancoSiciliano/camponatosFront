import {Navbar, Nav, NavDropdown, Dropdown} from 'react-bootstrap'
import './NavBarAdministracion.css'
import {MdSportsSoccer} from 'react-icons/all'
import {BiLogOut} from 'react-icons/bi';
import {BsPencil} from 'react-icons/bs'
import {useHistory} from "react-router-dom";
import {useState} from "react";
import auth from "../../auth";

function NavBarAdministracion() {


    const history = useHistory();

    const handleClick = () => {
        auth.logout(() => {
            localStorage.removeItem("id");
            localStorage.removeItem("rol");
            history.push("/")
        })
    }


    return (
        <Navbar className="navbar-jugador" style={{height: "50px"}}>
            <div className="titulo-nav-jugador">
                <MdSportsSoccer style={{width: '30px', height: '30px', color: 'white', marginRight: '10px'}}/>
                <Navbar.Brand href="/home/administracion"> PERFIL
                    ADMINISTRADOR </Navbar.Brand>
            </div>
            <Nav>
                <div className='editar-admin cerrarsesion'>
                    <BsPencil style={{
                        width: '25px',
                        height: '25px',
                        color: 'white'
                    }}/>
                    <NavDropdown title="OPERACIONES" id="basic-nav-dropdown" classname="LinkNavbar">  
                        <Dropdown>
                            <Dropdown.Toggle className='ddJugadores'>
                                CLUBES
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href="/registro/club">AGREGAR CLUB</Dropdown.Item>
                                <Dropdown.Item href="/administracion/clubes">LISTADO CLUBES</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </NavDropdown>
                </div>
                <div className='cerrarsesion'>
                    <BiLogOut style={{
                        width: '30px',
                        height: '30px',
                        color: 'white'
                    }}/>
                    <Nav.Link onClick={handleClick}>CERRAR SESION</Nav.Link>
                </div>
            </Nav>

        </Navbar>
    )

}

export default NavBarAdministracion;