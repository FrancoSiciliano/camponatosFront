import {Spinner} from "react-bootstrap";
import NavBarAdministracion from "../NavBars/NavBarAdministracion";
import NavBarResponsable from "../NavBars/NavBarResponsable";
import NavBarJugador from "../NavBars/NavBarJugador";
import './pantalla de carga.css'

export const PantallaCarga = () => {
    const rol = localStorage.getItem("rol");

    const navbar = () => {
        switch (rol) {
            case "ADMIN":
                return <NavBarAdministracion/>
            case "RESPONSABLE":
                return <NavBarResponsable/>
            default:
                return <NavBarJugador/>
        }
    }

    return (
        <div style={{height: "100vh"}}>
            {navbar()}
            <div className="center">
                <Spinner animation="border"/>
                <p style={{position: "relative", top: "-23px", fontSize: "50px"}}>Cargando...</p>
            </div>
        </div>
    )
}