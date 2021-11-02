import {Login} from "./components/Login/Login";
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";
import {RegistroJugador} from "./components/Register/RegistroJugador";
import {RegistroResponsable} from "./components/Register/RegistroResponsable";
import {SeleccionClub} from "./components/Register/SeleccionClub";
import { DatosJugador } from './components/Datos/DatosJugador';
import { DatosRepresentante } from './components/Datos/DatosRepresentante';
import { DatosClub} from './components/Datos/DatosClub'
import {LandingJugador} from "./components/LandingJugador/LandingJugador";
import { HomeClub } from './Paginas/SeccionClub/HomeClub'
import Listado from './components/GestionClub/GestionCampeonatos/Listado';
import { TablaPartidos } from './components/GestionClub/GestionCampeonatos/TablaPartidos';
import { TablaPosicion } from './components/GestionClub/GestionCampeonatos/TablaPosicion';
import { PerfilClub } from './Paginas/SeccionClub/PerfilClub';
import ListaJugadoresClub from './components/GestionClub/GestionJugadores/ListaJugadoresClub';
import { RegistroCampeonato } from './components/AdministradorComponente/CreacionCampeonato';
import { HomeAdministrador } from './Paginas/SeccionAdministrador/HomeAdmistrador';
import CargarDatosPartidos from './components/AdministradorComponente/CargarDatosPartidos';
import { DetallesPartido} from './components/GestionClub/GestionCampeonatos/DetallesPartido';
function App() {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Login/>
                    </Route>
                    <Route path="/homeClub">
                        <HomeClub/>
                    </Route>
                    <Route path="/seleccionClub">
                        <SeleccionClub/>
                    </Route>
                    <Route path="/registroJugador">
                        <RegistroJugador/>
                    </Route>
                    <Route path="/registroResponsable">
                        <RegistroResponsable/>
                    </Route>
                    <Route path="/datosJugador">
                        <DatosJugador idJugador="1" />
                    </Route>
                    <Route path="/detallesPartidos">
                        <DetallesPartido/>
                    </Route>
                    <Route path="/datosRepresentante">
                        <DatosRepresentante idRepresentante="1"/>
                    </Route>
                    <Route path="/datosClub">
                        <DatosClub idClub="1" />
                    </Route>
                    <Route path="/tablaPartidos" component={TablaPartidos} render={props=> <TablaPartidos{...props}/>}>
                    </Route>
                    <Route path="/tablaPosiciones">
                        <TablaPosicion/>
                    </Route>
                    <Route path="/perfilClub">
                        <PerfilClub/>
                    </Route>
                    <Route path="/landingJugador">
                        <LandingJugador idJugador="60"/>
                    </Route>
                    <Route path="/gestionar/campeonato">
                        <Listado/>
                    </Route>
                    <Route path="/administracion">
                        <HomeAdministrador/>
                    </Route>
                    <Route path="/registroCampeonato">
                        <RegistroCampeonato/>
                    </Route>
                    <Route path="/cargarDatosPartido">
                        <CargarDatosPartidos/>
                    </Route>
                    <Route path="/gestionar/jugadores">
                        <ListaJugadoresClub/>
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
