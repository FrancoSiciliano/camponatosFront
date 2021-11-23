import {Navbar, Nav} from 'react-bootstrap'
import {MdSportsSoccer} from 'react-icons/all'
import {BiUserCircle, BiLogOut} from 'react-icons/bi';
import { useHistory } from 'react-router';
import './NavBarJugador.css'

function NavBarJugador(props) {
    const history = useHistory();
    console.log(props.idJugador)
    const handleClickPerfilJugador = ()=>{
        history.push("/datos/jugador", props.idJugador);
    }
    const handleClickLandingJugador = ()=>{
        history.push("/home/jugador", props.idJugador);
    }
    return (
        // style={{marginRight: '70%'}}
        <Navbar className="navbar-jugador">
            <div className="titulo-nav-jugador">
                <MdSportsSoccer style={{width: '30px', height: '30px', color: 'white', marginRight: '10px'}}/>
                <Navbar.Brand onClick={handleClickLandingJugador} > PERFIL JUGADOR </Navbar.Brand>
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
                            
                        <Nav.Link onClick={handleClickPerfilJugador}> MI PERFIL </Nav.Link>
                    </div>
                    <div className='cerrarsesion'>
                        <BiLogOut
                            style={{
                                width: '30px',
                                height: '30px',
                                color: 'white'
                            }}/>
                        <Nav.Link href="/"> CERRAR SESION </Nav.Link>
                    </div>
                </div>
            </Nav>

        </Navbar>
    )

}

export default NavBarJugador;
