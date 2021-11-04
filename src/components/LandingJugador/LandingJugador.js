import NavBarJugador from "../NavBars/NavBarJugador";
import {PerfilJugador} from "./Datos/PerfilJugador";
import {CarouselCard} from "./Carousel/CarouselCard";
import './landingPageJugador.css'
import {useEffect, useState} from "react";
import axios from "axios";

export const LandingJugador = (props) => {
    const [jugador, setJugador] = useState(false);
    const [stats, setStats] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const datos = await axios.get(`http://localhost:8080/encontrarJugador?idJugador=${props.idJugador}`);
            setJugador(datos.data);
            console.log(JSON.stringify(jugador))
            const estadisticas = await axios.get(`http://localhost:8080/getStatsByClub?idJugador=${props.idJugador}&idClub=${datos.data.club.idClub}`);
            setStats(estadisticas.data);
        }

        fetchData();
    }, [])

    if (jugador && stats) {
        return (
            <div>
                <NavBarJugador/>
                <div className="contenido-landing-jugador">
                    <PerfilJugador jugadorData={jugador} estadisticas={stats}/>
                    <CarouselCard idClub={stats.idClub}/>
                </div>
            </div>
        )
    } else {
        return (<h1>The server isnt working</h1>)
    }
}