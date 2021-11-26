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
import {LandingAdministrador} from "./components/LandingAdministrador/LandingAdmistrador";
import {DetallesPartido} from "./components/Gestion/GestionPartidos/DetallesPartido";
import {Home} from "./components/LandingGeneral/Home";
import './App.css'
import {RegistroCampeonato} from "./components/Gestion/GestionCampeonatos/CreacionCampeonato";
import CargarDatosPartidos from "./components/Gestion/GestionPartidos/CargarDatosPartidos";
import {CrearPartido} from "./components/Gestion/GestionPartidos/CrearPartido";
import {RegistroClub} from "./components/Registros/RegistroClub";
import {RegistroResponsableAdministrador} from "./components/Registros/RegistroResponsableAdministrador";
import {RegistroResponsableByResponsable} from "./components/Registros/RegistroResponsableByResponsable";
import {DefinirClubesCampeonato} from "./components/Gestion/GestionCampeonatos/DefinirClubesCampeonato";
import {SeleccionCampeonatoADefinir} from "./components/Gestion/GestionPartidos/SeleccionCampeonatoADefinir";

import TablaCampeonatos from "./components/Tablas/TablaCampeonatos";
import {TablaPartidosCampeonatos} from "./components/Tablas/TablaPartidosCampeonatos";
import {DatosJugadorResponsable} from "./components/DatosPerfiles/DatosJugadorResponsable";
import {TablaClubes} from "./components/Tablas/TablaClubes";
import {TablaJugadores} from "./components/Tablas/TablaJugadores";
import {TablaJugadoresPartidos} from "./components/Tablas/TablaJugadoresPartidos";
import {EstadisticasJugadorCampeonato} from "./components/EstadisticasJugadorEnCampeonato/EstadisticasJugadorCampeonato";
import {DetallesPartidoResponsable} from "./components/Gestion/GestionPartidos/DetallesPartidoResponsable";
import {TablaPartidosAdministrador} from "./components/Tablas/TablaPartidosAdministrador";
import {TablaListaJugadoresAdministrador} from "./components/Tablas/TablaListaJugadoresAdministrador";
import {ProtectedRoute} from "./protected.route";
import { IngresoEgreso } from "./components/Gestion/GestionJugadores/IngresoEgreso";

function App() {
    return (
        <div className="App">
            <Router>
                <Switch>

                    {/* Todos los Homes esta aca abajo */}
                    <Route exact path="/">
                        <Home/>
                    </Route>

                    <ProtectedRoute exact path="/detalles/partidos" rol={["RESPONSABLE", "ADMIN"]} componente={DetallesPartido}>
                    </ProtectedRoute>

                    {/*RUTAS RESPONSABLES*/}


                    <ProtectedRoute exact path="/home/representante" rol={["RESPONSABLE"]} componente={LandingResponsable}>
                    </ProtectedRoute>

                    <ProtectedRoute exact path="/registro/responsable" rol={["RESPONSABLE"]}
                                    componente={RegistroResponsableByResponsable}>
                    </ProtectedRoute>

                    <ProtectedRoute exact path="/datos/edicion/responsable" rol={["RESPONSABLE"]}
                                    componente={DatosJugadorResponsable}>
                    </ProtectedRoute>

                    <ProtectedRoute exact path="/detalles/partidos/responsables" rol={["RESPONSABLE"]}
                                    componente={DetallesPartidoResponsable}>
                    </ProtectedRoute>

                    <ProtectedRoute exact path="/datos/representante" rol={["RESPONSABLE"]} componente={DatosRepresentante}>
                    </ProtectedRoute>

                    <ProtectedRoute exact path="/datos/club" rol={["RESPONSABLE", "ADMIN"]} componente={DatosClub}>
                    </ProtectedRoute>

                    <ProtectedRoute exact path="/tabla/jugadores" rol={["RESPONSABLE"]} componente={TablaJugadores}>
                    </ProtectedRoute>

                    <ProtectedRoute exact path="/registro/jugador" rol={["RESPONSABLE"]} componente={RegistroJugador}>
                    </ProtectedRoute>

                    <ProtectedRoute exact path="/tabla/habilitacion/jugadores/campeonato" rol={["RESPONSABLE"]} componente={ListaJugadoresClub}>
                        <ListaJugadoresClub/>
                    </ProtectedRoute>

                    <ProtectedRoute exact path="/tabla/posiciones" rol={["RESPONSABLE", "JUGADOR", "ADMIN"]} componente={TablaPosicion}>
                    </ProtectedRoute>

                    <ProtectedRoute exact path="/partidos/campeonatos" rol={["RESPONSABLE"]} componente={TablaPartidosCampeonatos}>
                    </ProtectedRoute>

                    <ProtectedRoute exact path="/tabla/partidos/lista_jugadores" rol={["RESPONSABLE"]} componente={TablaJugadoresPartidos}>
                    </ProtectedRoute>

                    {/*RUTAS ADMIN*/}

                    <ProtectedRoute exact path="/home/administracion" rol={["ADMIN"]} componente={LandingAdministrador}>
                    </ProtectedRoute>

                    <ProtectedRoute exact path="/registro/responsable/administrador" rol={["ADMIN"]} componente={RegistroResponsableAdministrador}>
                    </ProtectedRoute>

                    <ProtectedRoute exact path="/registro/club" rol={["ADMIN"]} componente={RegistroClub}>
                    </ProtectedRoute>

                    <ProtectedRoute exact path="/registro/campeonato" rol={["ADMIN"]} componente={RegistroCampeonato}>
                    </ProtectedRoute>
                    <ProtectedRoute exact path="/cargar/datos/partido/ingresoEgreso" rol={["ADMIN"]} componente={IngresoEgreso}>
                    </ProtectedRoute>

                    <ProtectedRoute exact path="/cargar/datos/partido" rol={["ADMIN"]} componente={CargarDatosPartidos}>
                    </ProtectedRoute>

                    <ProtectedRoute exact path="/registro/partido" rol={["ADMIN"]} componente={SeleccionCampeonatoADefinir}>
                    </ProtectedRoute>

                    <ProtectedRoute exact path="/agregar/clubes" rol={["ADMIN"]} componente={DefinirClubesCampeonato}>
                    </ProtectedRoute>

                    <ProtectedRoute exact path="/crear/partido" rol={["ADMIN"]} componente={CrearPartido}>
                    </ProtectedRoute>

                    <ProtectedRoute exact path="/administracion/campeonatos" rol={["ADMIN"]} componente={TablaCampeonatos}>
                    </ProtectedRoute>

                    <ProtectedRoute exact path="/administracion/clubes" rol={["ADMIN"]} componente={TablaClubes}>
                    </ProtectedRoute>

                    <ProtectedRoute exact path="/administrador/campeonatos/partidos" rol={["ADMIN"]} componente={TablaPartidosAdministrador}>
                    </ProtectedRoute>

                    <ProtectedRoute exact path="/administrador/campeonatos/partidos/jugadores" rol={["ADMIN"]} componente={TablaListaJugadoresAdministrador}>
                    </ProtectedRoute>
                    {/*RUTAS JUGADOR*/}

                    <ProtectedRoute exact path="/home/jugador" rol={["JUGADOR"]} componente={LandingJugador}>
                    </ProtectedRoute>

                    <ProtectedRoute exact path="/datos/jugador" rol={["JUGADOR"]} componente={DatosJugador}>
                    </ProtectedRoute>

                    <ProtectedRoute exact path="/administrador/campeonatos/partidos/jugadores" rol={["ADMIN"]} componente={TablaListaJugadoresAdministrador}>
                    </ProtectedRoute>

                    <ProtectedRoute exact path="/estadisticas/campeonato" rol={["JUGADOR"]} componente={EstadisticasJugadorCampeonato}>
                    </ProtectedRoute>


                    {/*<Route path="/tabla/representantes">*/}
                    {/*    <TablaResponsables/>*/}
                    {/*</Route> NO ESTABA EN USO ????????????????????*/}


                    <ProtectedRoute exact path="/cargar/minutos" rol={["ADMIN"]} componente={IngresoEgreso}> </ProtectedRoute>
                    <ProtectedRoute exact path="/cargar/datos/partido" rol={["ADMIN"]} componente={CargarDatosPartidos}></ProtectedRoute>
                    
                    <Route path="/partidos/Detalles">
                        <DetallesPartido/>
                    </Route>

                    <Route path="/gestionar/campeonato">
                        <CampeonatosResponsable/>
                    </Route>
                    <Route path="/gestionar/jugadores">
                        <ListaJugadoresClub/>
                    </Route>

                    <Route path="*" component={() => "404 NOT FOUND"}/>

                </Switch>
            </Router>
        </div>);
}

export default App;
