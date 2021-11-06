import {Button} from "react-bootstrap";
import './ClubesDisponibles.css'

export const CardClub = (props) => {
    return (
        <div className="card-club">
            <p className="identificador-card-club">{props.idClub+" - "+props.nombre}</p>
            <Button className="btn-outline-success btn-light" onClick={props.onClick}>{props.tipo === "disponible" ? "Agregar" : "Quitar"}</Button>
        </div>
    )
}