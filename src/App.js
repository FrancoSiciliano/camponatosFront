import './App.css';
import {Login} from "./components/Login/Login";
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";
import {RegistroJugador} from "./components/Register/RegistroJugador";
import {RegistroResponsable} from "./components/Register/RegistroResponsable";
import {SeleccionClub} from "./components/Register/SeleccionClub";
import { DatosJugador } from './components/DatosJugador/DatosJugador';
import './index.css'
import { DatosRepresentante } from './components/DatosRepresentante/DatosRepresentante';

function App() {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Login/>
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
                </Switch>
            </Router>
        </div>
    );
}

export default App;
