import { Login } from "./components/Login/Login";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { RegistroJugador } from "./components/Registros/RegistroJugador";
import { DatosJugador } from "./components/DatosPerfiles/DatosJugador";
import { DatosRepresentante } from "./components/DatosPerfiles/DatosRepresentante";
import { DatosClub } from "./components/DatosPerfiles/DatosClub";
import { LandingJugador } from "./components/LandingJugador/LandingJugador";
import { LandingResponsable } from "./components/LandingResponsable/LandingResponsable";
import CampeonatosResponsable from "./components/Gestion/GestionCampeonatos/CampeonatosResponsable";
import { TablaPosicion } from "./components/Tablas/TablaPosicion";
import ListaJugadoresClub from "./components/Gestion/GestionJugadores/ListaJugadoresClub";
import { RegistroCampeonato } from "./components/Gestion/GestionCampeonatos/CreacionCampeonato";
import { LandingAdministrador} from "./components/LandingAdministrador/LandingAdmistrador";
import CargarDatosPartidos from "./components/Gestion/GestionPartidos/CargarDatosPartidos";
import { DetallesPartido } from "./components/Gestion/GestionPartidos/DetallesPartido";
import { CrearPartido } from "./components/Gestion/GestionPartidos/CrearPartido";
import {Home} from "./components/LandingGeneral/Home";
import './App.css'
import {DefinirClubesCampeonato} from "./components/Gestion/GestionCampeonatos/DefinirClubesCampeonato";
import TablaCampeonatos from "./components/Tablas/TablaCampeonatos";
import {TablaPartidosCampeonatos} from "./components/Tablas/TablaPartidosCampeonatos";
import { DatosJugadorResponsable } from "./components/DatosPerfiles/DatosJugadorResponsable";
import { RegistroClub } from "./components/Registros/RegistroClub";
import { TablaClubes } from "./components/Tablas/TablaClubes";
import { TablaResponsables } from "./components/Tablas/Representante/TablaResponsables";
import { RegistroResponsableAdministrador } from "./components/Registros/RegistroResponsableAdminsrador";
import { TablaJugadores } from "./components/Tablas/TablaJugadores";
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>

          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/home/administracion">
            <LandingAdministrador />
          </Route>
          <Route path="/home/representante">
            <LandingResponsable />
          </Route>
          <Route path="/home/jugador">
            <LandingJugador />
          </Route>


          <Route path="/registro/jugador"> {/* el registro del jugador lo hace el responsable */}
            <RegistroJugador />
          </Route>
          <Route path="/registro/responsable">
            <RegistroResponsableAdministrador />
          </Route>
          <Route path="/registro/club">
            <RegistroClub/>
          </Route>
          <Route path="/registro/campeonato">
            <RegistroCampeonato />
          </Route>
          <Route path="/agregar/clubes">
            <DefinirClubesCampeonato />
          </Route>


          <Route path="/datos/jugador">
            <DatosJugador idJugador="1" />
          </Route>
          <Route exact path="/datos/edicion/responsable">
            <DatosJugadorResponsable idJugador="1" />
          </Route>
          <Route path="/datos/representante">
            <DatosRepresentante idRepresentante="1" />
          </Route>
          <Route path="/datos/club">
            <DatosClub/>
          </Route>

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


          <Route path="/partidos/Detalles">
            <DetallesPartido/>
          </Route>
          <Route path="/gestionar/campeonato">
            <CampeonatosResponsable />
          </Route>
          
          <Route path="/cargar/datos/partido">
            <CargarDatosPartidos />
          </Route>
          <Route path="/crear/partido">
            <CrearPartido/>
          </Route>
          <Route path="/gestionar/jugadores">
            <ListaJugadoresClub />
          </Route>

          {/*{de aca para abajo van las rutas de prueba,
          arriba solo las oficiales}*/}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
