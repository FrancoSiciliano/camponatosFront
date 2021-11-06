import {CardClub} from "./CardClub";
import {Button} from "react-bootstrap";

export const ClubesDisponiblesCampeonato = (props) => {
    return (
        <div className="contenedor-principal-cards-club">
            <h3>Clubes disponibles:</h3>
            <div className="contenedor-cards-club scrollable" >
                <CardClub/>
                <CardClub/>
                <CardClub/>
                <CardClub/>
                <CardClub/>
                <CardClub/>
                <CardClub/>
                <CardClub/>
                <CardClub/>
            </div>
        </div>
    )
}
