import NavBarJugador from "../NavBars/NavBarJugador";
import {PerfilJugador} from "./Datos/PerfilJugador";
import {CarouselCard} from "./Carousel/CarouselCard";
import './landingPageJugador.css'
import {useEffect, useState} from "react";
import axios from "axios";
import {useHistory} from "react-router-dom";

export const LandingJugador = () => {
    const [jugador, setJugador] = useState(false);
    const [stats, setStats] = useState(false);
    const history = useHistory();
    const idJugador = history.location.state;

    useEffect(() => {
        const fetchData = async () => {
            const datos = await axios.get(`http://localhost:8080/encontrarJugador?idJugador=${idJugador}`);
            setJugador(datos.data);
            const estadisticas = await axios.get(`http://localhost:8080/getStatsByClub?idJugador=${idJugador}&idClub=${datos.data.club.idClub}`);
            setStats(estadisticas.data);
        }

        fetchData();
    }, [])

    if (jugador && stats) {
        return (
            <div className = 'contenedor-home-jugador'>
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