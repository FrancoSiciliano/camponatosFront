import './App.css';
import {Login} from "./components/Login/Login";
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";
import {RegistroJugador} from "./components/Register/RegistroJugador";
import {RegistroResponsable} from "./components/Register/RegistroResponsable";
import {SeleccionClub} from "./components/Register/SeleccionClub";
import { DatosJugador } from './components/DatosJugador/DatosJugador';
import './index.css'
import { DatosRepresentante } from './components/DatosRepresentante/DatosRepresentante';
import { DatosClub} from './components/DatosClub/DatosClub'
import { Home } from './Paginas/Home'
import { DatosJugadorLanding } from './components/LandingJugador/Datos/DatosJugadorLanding';
import {CarouselCard} from "./components/LandingJugador/Carousel/CarouselCard";
import {LandingJugador} from "./components/LandingJugador/LandingJugador";

function App() {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Login/>
                    </Route>
                    <Route path="/home">
                        <Home/>
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
                        <DatosJugador />
                    </Route>
                    <Route path="/datosRepresentante">
                        <DatosRepresentante />
                    </Route>
                    <Route path="/datosClub">
                        <DatosClub />
                    </Route>
                    <Route path="/landingJugador">
                        <LandingJugador idJugador="60"/>
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
