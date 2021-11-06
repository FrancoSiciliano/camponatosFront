import {useHistory} from "react-router-dom";
import {ClubesDisponiblesCampeonato} from "./InfoClubesParticipantes/ClubesDisponiblesCampeonato";
import './DefinirClubes.css'
import {CardClub} from "./InfoClubesParticipantes/CardClub";
import {useEffect, useState} from "react";
import axios from "axios";
import {BiCheck} from "react-icons/all";

export const DefinirClubesCampeonato = () => {
    const history = useHistory();
    const [clubesDisponibles, setClubesDisponibles] = useState([]);
    const [clubesAgregados, setClubesAgregados] = useState([]);
    const tipo = history.location.state.tipo;

    useEffect(() => {
        const fetchData = async () => {
          const response = await axios.get(`http://localhost:8080/getClubes`);
          const datos = response.data;
          setClubesDisponibles(datos);
        };

        fetchData();
    },[])

    const handleClickDisponible = (idClub) => {
        let auxAgregados = clubesAgregados.concat(clubesDisponibles.filter((elem) => {
            return elem.idClub === idClub;
        }));

        let auxDisponibles = clubesDisponibles.filter((elem) => {
            return elem.idClub !== idClub;
        });


        setClubesAgregados(auxAgregados);

        setClubesDisponibles(auxDisponibles);
    }

    const handleClickAgregado = (idClub) => {

        let auxDisponibles = clubesDisponibles.concat(clubesAgregados.filter((elem) => {
            return elem.idClub === idClub;
        }));

        let auxAgregados = clubesAgregados.filter((elem) => {
            return elem.idClub !== idClub;
        });


        setClubesAgregados(auxAgregados);

        setClubesDisponibles(auxDisponibles);
    }

    if (clubesDisponibles) {

        return (
            <div className="contenedor-principal-difinir-clubes">
            <div>
                <div className="contenedor-principal-cards-club">
                    <h3>Clubes disponibles:</h3>
                    <div className="contenedor-cards-club scrollable">
                        {clubesDisponibles.map((club, index) => {
                            return (
                                <CardClub key={index}
                                          idClub={club.idClub}
                                          nombre={club.nombre}
                                          onClick={() => handleClickDisponible(club.idClub)}
                                          tipo="disponible"
                                />
                            )
                        })}
                    </div>
                </div>
            </div>
            <div className="contenedor-principal-cards-club">
                <h3>Clubes agregados:</h3>
                <div className="contenedor-cards-club scrollable">
                    {clubesAgregados.map((club, index) => {
                        return (
                            <CardClub key={index}
                                      idClub={club.idClub}
                                      nombre={club.nombre}
                                      onClick={() => handleClickAgregado(club.idClub)}
                                      tipo="agregado"
                            />
                        )
                    })}
                </div>
                <h5 className="cantidad-card-agregados">
                    {"Cantidad: " + clubesAgregados.length}
                </h5>
            </div>
        </div>)
    }
    else {
        return (<h1>HOla</h1>)
    }
}