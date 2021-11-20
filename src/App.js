import {Login} from "./components/Basura de Franco/Login";
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";
import {RegistroJugador} from "./components/Registros/RegistroJugador";
import {DatosJugador} from "./components/DatosPerfiles/DatosJugador";
import {DatosRepresentante} from "./components/DatosPerfiles/DatosRepresentante";
import {DatosClub} from "./components/DatosPerfiles/DatosClub";
import {LandingJugador} from "./components/LandingJugador/LandingJugador";
import {LandingResponsable} from "./components/LandingResponsable/LandingResponsable";
import CampeonatosResponsable from "./components/Gestion/GestionCampeonatos/CampeonatosResponsable";
import {TablaPosicion} from "./components/Tablas/TablaPosicion";
import ListaJugadoresClub from "./components/Gestion/GestionJugadores/ListaJugadoresClub";
import {RegistroCampeonato} from "./components/Gestion/GestionCampeonatos/CreacionCampeonato";
import {LandingAdministrador} from "./components/LandingAdministrador/LandingAdmistrador";
import CargarDatosPartidos from "./components/Gestion/GestionPartidos/CargarDatosPartidos";
import {DetallesPartido} from "./components/Gestion/GestionPartidos/DetallesPartido";
import {SeleccionCampeonatoADefinir} from "./components/Gestion/GestionPartidos/SeleccionCampeonatoADefinir";
import {CrearPartido} from "./components/Gestion/GestionPartidos/CrearPartido";
import {Home} from "./components/LandingGeneral/Home";
import './App.css'
import {DefinirClubesCampeonato} from "./components/Gestion/GestionCampeonatos/DefinirClubesCampeonato";
import TablaCampeonatos from "./components/Tablas/TablaCampeonatos";
import {TablaPartidosCampeonatos} from "./components/Tablas/TablaPartidosCampeonatos";
import {DatosJugadorResponsable} from "./components/DatosPerfiles/DatosJugadorResponsable";
import {RegistroClub} from "./components/Registros/RegistroClub";
import {TablaClubes} from "./components/Tablas/TablaClubes";
import {TablaResponsables} from "./components/Tablas/Representante/TablaResponsables";
import {RegistroResponsableAdministrador} from "./components/Registros/RegistroResponsableAdministrador";
import {TablaJugadores} from "./components/Tablas/TablaJugadores";
import {RegistroResponsableByResponsable} from "./components/Registros/RegistroResponsableByResponsable";
import {TablaJugadoresPartidos} from "./components/Tablas/TablaJugadoresPartidos";
import {EstadisticasJugadorCampeonato} from "./components/EstadisticasJugadorEnCampeonato/EstadisticasJugadorCampeonato";

function App() {
    return (
        <div className="App">
            <Router>
                <Switch>

                    {/* Todos los Homes esta aca abajo */}
                    <Route exact path="/">
                        <Home/>
                    </Route>
                    <Route path="/login">
                        <Login/>
                    </Route>
                    <Route path="/home/administracion">
                        <LandingAdministrador/>
                    </Route>
                    <Route path="/home/representante">
                        <LandingResponsable/>
                    </Route>
                    <Route path="/home/jugador">
                        <LandingJugador/>
                    </Route>
                    {/* Todos los Homes esta aca arriba */}

                    {/* Todos los registros/Agregar estan aca abajo */}
                    <Route path="/registro/jugador">
                        <RegistroJugador/>
                    </Route>
                    <Route path="/registro/responsable/administrador">
                        <RegistroResponsableAdministrador/>
                    </Route>
                    <Route path="/registro/responsable">
                        <RegistroResponsableByResponsable/>
                    </Route>
                    <Route path="/registro/club">
                        <RegistroClub/>
                    </Route>
                    <Route path="/registro/campeonato">
                        <RegistroCampeonato/>
                    </Route>
                    <Route path="/registro/partido">
                        <SeleccionCampeonatoADefinir/>
                    </Route>
                    <Route path="/agregar/clubes">
                        <DefinirClubesCampeonato/>
                    </Route>
                    <Route path="/cargar/datos/partido">
                        <CargarDatosPartidos/>
                    </Route>
                    <Route path="/crear/partido">
                        <CrearPartido/>
                    </Route>
                    {/* Todos los registros/Agregar estan aca arriba */}

                    {/* Todos los perfiles/datos de cada usuario esta aca abajo */}
                    <Route path="/datos/jugador">
                        <DatosJugador/>
                    </Route>
                    <Route exact path="/datos/edicion/responsable">
                        <DatosJugadorResponsable idJugador="1"/>
                    </Route>
                    <Route path="/datos/representante">
                        <DatosRepresentante/>
                    </Route>
                    <Route path="/datos/club">
                        <DatosClub/>
                    </Route>
                    {/* Todos los perfiles/datos de cada usuario esta aca arriba */}

                    <Route path="/detalles/partidos">
                        <DetallesPartido/>
                    </Route>
                    <Route path="/tabla/habilitacion/jugadores/campeonato">
                        <ListaJugadoresClub/>
                    </Route>
                    <Route path="/tabla/Campeonatos">
                        <TablaCampeonatos/>
                    </Route>
                    <Route path="/tabla/Clubes">
                        <TablaClubes/>
                    </Route>
                    <Route path="/tabla/Jugadores">
                        <TablaJugadores/>
                    </Route>
                    <Route path="/tabla/Posiciones">
                        <TablaPosicion/>
                    </Route>
                    <Route path="/tabla/representantes">
                        <TablaResponsables/>
                    </Route>

                    <Route path="/partidos/campeonatos">
                        <TablaPartidosCampeonatos/>
                    </Route>
                    <Route path="/tabla/partidos/listaJugadores">
                        <TablaJugadoresPartidos/>
                    </Route>


                    <Route path="/partidos/Detalles">
                        <DetallesPartido/>
                    </Route>
                    <Route path="/gestionar/campeonato">
                        <CampeonatosResponsable/>
                    </Route>
                    <Route path="/gestionar/jugadores">
                        <ListaJugadoresClub/>
                    </Route>

                    <Route path="/estadisticas/campeonato">
                        <EstadisticasJugadorCampeonato idCampeonato="1"/>
                    </Route>

                </Switch>
            </Router>
        </div>
    );
}

export default App;
