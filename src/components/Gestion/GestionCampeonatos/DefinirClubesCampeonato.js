import {useHistory} from "react-router-dom";
import {ClubesDisponiblesCampeonato} from "./InfoClubesParticipantes/ClubesDisponiblesCampeonato";
import './DefinirClubes.css'
import {CardClub} from "./InfoClubesParticipantes/CardClub";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {BiCheck} from "react-icons/all";
import {Button} from "react-bootstrap";
import transitionEndListener from "react-bootstrap/transitionEndListener";
import {PopUp} from "../../PopUp/PopUp";

export const DefinirClubesCampeonato = () => {
    const history = useHistory();
    const [clubesDisponibles, setClubesDisponibles] = useState([]);
    const [clubesAgregados, setClubesAgregados] = useState([]);

    const [mensajeError, setMensajeError] = useState("");
    const [tituloError, setTituloError] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");

    const state = history.location.state;
    const tipo = state.tipo;
    const categoria = state.categoria;

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`http://localhost:8080/getClubesHabilitadosPorCategoria?categoria=${categoria}`);
            const datos = response.data;
            setClubesDisponibles(datos);
        };

        fetchData();
    }, [])

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

    const checkClubes = () => {
        if (tipo === "Puntos") {
            return clubesAgregados.length > 1;
        } else if (tipo === "Zonas") {
            return clubesAgregados.length % 2 === 0 && clubesAgregados.length !== 0 && clubesAgregados.length > state.nroZonas && clubesAgregados.length % state.nroZonas === 0;
        }
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

    const handleClickFinalizar = async () => {

        try {
            const response = await axios.post(`http://localhost:8080/crearCampeonato?descripcion=${state.descripcion}&fechaInicio=${state.fechaInicio.toString().replaceAll("-", "/")}&fechaFin=${state.fechaFin.toString().replaceAll("-", "/")}&estado=Activo`)
            const idCampeonato = response.data;
            for (const club of clubesAgregados) {
                await axios.post(`http://localhost:8080/agregarClubACampeonato?idClub=${club.idClub}&idCampeonato=${idCampeonato}`);
            }
            await axios.post(`http://localhost:8080/definirTipoCampeonatoAndCategoria?cantidadZonas=${state.nroZonas}&idCampeonato=${idCampeonato}&categoria=${categoria}`);
            setMensajeError(`Campeonato ${idCampeonato} - ${state.descripcion} creado con éxito`);
            setTituloError("Campeonato creado exitosamente");
            setModalTitle("Operación exitosa");
            setShowModal(true);
        } catch (e) {
            setMensajeError(e.message);
            setTituloError("Error al crear el campeonato");
            setModalTitle("Error")
            setShowModal(true);
        }

    }

    if (clubesDisponibles) {

        return (
            <div className="contenedor-titulo-definir-clubes">
                <h1 className="titulo-definir-clubes">Seleccione los clubes que participaran en el torneo:</h1>
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
                        <div style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "200px",
                            alignItems: "center"
                        }}>
                            <h5 className="cantidad-card-agregados">
                                {"Cantidad: " + clubesAgregados.length}
                            </h5>
                            {checkClubes() ?
                                <Button className="btn btn-success" style={{margin: "5px 0"}} onClick={handleClickFinalizar}>Finalizar</Button> :
                                <Button className="btn btn-success" style={{margin: "5px 0"}} disabled>Finalizar</Button>}
                        </div>
                    </div>
                </div>
                <PopUp modalTitle={modalTitle} show={showModal} onHide={() => setShowModal(false)} text={mensajeError} title={tituloError}/>
            </div>
            )
    } else {
        return (<h1>The server isnt working...</h1>)
    }
}