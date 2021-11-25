import {Navbar, Nav} from 'react-bootstrap'
import {MdSportsSoccer} from 'react-icons/all'
import {BiUserCircle, BiLogOut} from 'react-icons/bi';
import './NavBarJugador.css'
import {useHistory} from "react-router-dom";
import auth from "../../auth";


function NavBarJugador() {
    const history = useHistory();

    const handleClick = () => {
        auth.logout(() => {
            localStorage.removeItem("id");
            localStorage.removeItem("rol");
            history.push("/")
        })
    }


    return (
        // style={{marginRight: '70%'}}
        <Navbar className="navbar-jugador">
            <div className="titulo-nav-jugador">
                <MdSportsSoccer style={{width: '30px', height: '30px', color: 'white', marginRight: '10px'}}/>

                <Navbar.Brand href="/home/jugador"> PERFIL JUGADOR </Navbar.Brand>

            </div>
            <Nav>
                <div className="botones-nav">
                    <div className='miperfil'>
                        <BiUserCircle
                            style={{
                                width: '30px',
                                height: '30px',
                                color: 'white'
                            }}/>


                        <Nav.Link href="/datos/jugador"> MI PERFIL </Nav.Link>

                    </div>
                    <div className='cerrarsesion'>
                        <BiLogOut
                            style={{
                                width: '30px',
                                height: '30px',
                                color: 'white'
                            }}/>
                        <Nav.Link onClick={handleClick}> CERRAR SESION </Nav.Link>
                    </div>
                </div>
            </Nav>

        </Navbar>
    )

}

export default NavBarJugador;
