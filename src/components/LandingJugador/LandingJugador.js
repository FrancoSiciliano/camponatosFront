import NavBarJugador from "../NavBars/NavBarJugador";
import {PerfilJugador} from "./Datos/PerfilJugador";
import {CarouselCard} from "./Carousel/CarouselCard";
import './landingPageJugador.css'
import {useEffect, useState} from "react";
import axios from "axios";
import {useHistory} from "react-router-dom";
import {PantallaCarga} from "../PantallaCarga/PantallaCarga";

export const LandingJugador = () => {
    const [jugador, setJugador] = useState(false);
    const [stats, setStats] = useState(false);
    const history = useHistory();

    const idJugador = localStorage.getItem("id");


    useEffect(() => {
        const fetchData = async () => {
            const datos = await axios.get(`http://localhost:8080/encontrarJugador?idJugador=${idJugador}`);
            setJugador(datos.data);
            const estadisticas = await axios.get(`http://localhost:8080/getStatsByClub?idJugador=${idJugador}&idClub=${datos.data.club.idClub}`);
            setStats(estadisticas.data);
        }

        fetchData();
    }, [])

        return (
            <div className = 'contenedor-home-jugador'>
                <NavBarJugador idJugador={idJugador}/>
                {jugador && <div className="contenido-landing-jugador">
                    <PerfilJugador jugadorData={jugador} estadisticas={stats}/>
                    {stats && <CarouselCard idClub={stats.idClub}/>}
                </div>}
            </div>
        )
}