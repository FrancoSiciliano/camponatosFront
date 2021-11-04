import { Login } from "./components/Login/Login";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { RegistroJugador } from "./components/Registros/RegistroJugador";
import { RegistroResponsable } from "./components/Registros/RegistroResponsable";
import { SeleccionClub } from "./components/Registros/SeleccionClub";
import { DatosJugador } from "./components/DatosPerfiles/DatosJugador";
import { DatosRepresentante } from "./components/DatosPerfiles/DatosRepresentante";
import { DatosClub } from "./components/DatosPerfiles/DatosClub";
import { LandingJugador } from "./components/LandingJugador/LandingJugador";
import { LandingResponsable } from "./components/LandingResponsable/LandingResponsable";
import CampeonatosResponsable from "./components/Gestion/GestionCampeonatos/CampeonatosResponsable";
import { TablaPartidos } from "./components/Tablas/TablaPartidos";
import { TablaPosicion } from "./components/Tablas/TablaPosicion";
import { PerfilClub } from "./components/LandingResponsable/PerfilClub";
import ListaJugadoresClub from "./components/Gestion/GestionJugadores/ListaJugadoresClub";
import { RegistroCampeonato } from "./components/Gestion/GestionCampeonatos/CreacionCampeonato";
import { HomeAdministrador } from "./components/LandingAdministrador/HomeAdmistrador";
import CargarDatosPartidos from "./components/Gestion/GestionPartidos/CargarDatosPartidos";
import { DetallesPartido } from "./components/Tablas/DetallesPartido";
import { CrearPartido } from "./components/Gestion/GestionPartidos/CrearPartido";
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/landingResponsable">
            <LandingResponsable />
          </Route>
          <Route path="/seleccionClub">
            <SeleccionClub />
          </Route>
          <Route path="/registroJugador">
            <RegistroJugador />
          </Route>
          <Route path="/registroResponsable">
            <RegistroResponsable />
          </Route>
          <Route path="/datosJugador">
            <DatosJugador idJugador="1" />
          </Route>
          <Route path="/detallesPartidos">
            <DetallesPartido />
          </Route>
          <Route path="/datosRepresentante">
            <DatosRepresentante idRepresentante="1" />
          </Route>
          <Route path="/datosClub">
            <DatosClub idClub="1" />
          </Route>
          <Route
            path="/tablaPartidos"
            component={TablaPartidos}
            render={(props) => <TablaPartidos {...props} />}
          ></Route>
          <Route path="/tablaPosiciones">
            <TablaPosicion />
          </Route>
          <Route path="/perfilClub">
            <PerfilClub />
          </Route>
          <Route path="/landingJugador">
            <LandingJugador idJugador="60" />
          </Route>
          <Route path="/gestionar/campeonato">
            <CampeonatosResponsable />
          </Route>
          <Route path="/administracion">
            <HomeAdministrador />
          </Route>
          <Route path="/registroCampeonato">
            <RegistroCampeonato />
          </Route>
          <Route path="/cargarDatosPartido">
            <CargarDatosPartidos />
          </Route>
          <Route path="/crearPartido">
            <CrearPartido/>
          </Route>
          <Route path="/gestionar/jugadores">
            <ListaJugadoresClub />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
