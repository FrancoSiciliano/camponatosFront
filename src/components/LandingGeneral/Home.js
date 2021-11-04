import {Link} from "react-router-dom";
import './home.css'

const lista1 = ["hola", "adios", "mañana"]
export const Home = () => {
    return (
        <div className="contenedor-home">
            <div>
                <h1 className="titulo-home">Furvo</h1>
            </div>
            <div className="botones-home">
                <Link to="/login" className="boton-home btn btn-success">Iniciar Sesión</Link>
                <Link to="/registro/responsable" className="boton-home btn btn-success">Registrarse</Link>
            </div>
        </div>
    )
}
