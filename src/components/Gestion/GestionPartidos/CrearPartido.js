import NavBarAdministracion from "../../NavBars/NavBarAdministracion";
import './CrearPartido.css'
import React, {useState} from "react";
import axios from "axios";
import {useEffect} from "react";
import {Table, Form, Row, Button, Col} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import {PopUp} from "../../PopUp/PopUp";
import {Login} from "../../Basura de Franco/Login";

export const CrearPartido = () => {
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState("");
    const [title, setTitle] = useState("");
    const [modalTitle, setModalTitle] = useState("");

    const history = useHistory();
    const idCampeonato = history.location.state;
    const [listadoClubes, setListadoClubes] = useState([]);
    const [nroFecha, setNroFecha] = useState(null);
    const [fechaIniMin, setFechaIniMin] = useState(null);
    const [fechaLimite, setFechaLimite] = useState(null);
    const [datosPartido, setDatosPartido] = useState({
        clubLocal: "",
        clubVisitante: "",
        fechaPartidoL: "",
        fechaPartidoV: "",
        nroFecha: "",
        categoria: "",
    })

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`http://localhost:8080/getClubesByCampeonato?idCampeonato=${idCampeonato}`);
            const data = response.data;
            setListadoClubes(data);

            const res = await axios.get(`http://localhost:8080/getUltimoNroFechaByCampeonato?idCampeonato=${idCampeonato}`);
            setNroFecha(res.data + 1);

            const response2 = await axios.get(`http://localhost:8080/getLimitesDeFechasByCampeonato?idCampeonato=${idCampeonato}`);
            const fechas = response2.data.split(" ");

            const categoriaRes = await axios.get(`http://localhost:8080/getCategoriaCampeonato?idCampeonato=${idCampeonato}`);

            setFechaIniMin(fechas[0]);
            setFechaLimite(fechas[1]);
            setDatosPartido({
                ...datosPartido,
                nroFecha: res.data + 1,
                fechaPartidoL: fechas[0],
                fechaPartidoV: fechas[0],
                categoria: categoriaRes.data,
            })
        };
        fetchData();
    }, [])

    const handleChange = (event) => {
        setDatosPartido({
            ...datosPartido,
            [event.target.name]: event.target.value,
        })

    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const clubesIguales = datosPartido.clubLocal === datosPartido.clubVisitante;
        const fechasIguales = datosPartido.fechaPartidoV === datosPartido.fechaPartidoL;
        if (clubesIguales || fechasIguales) {
            setError(clubesIguales ? "El club local no puede ser igual al visitante" : "Las fechas de ambos partidos (ida y vuelta) no pueden ser iguales");
            setTitle(clubesIguales ? "Clubes no válidos" : "Fechas No válidas");
            setModalTitle("Advertencia")
            setShowModal(true);

        } else {
            try {
                const res = await axios.post(`http://localhost:8080/crearPartido?nroZona=100&categoria=${datosPartido.categoria}&idClubLocal=${datosPartido.clubLocal}&idClubVisitante=${datosPartido.clubVisitante}&idCampeonato=${idCampeonato}`);
                const idPartidoA = res.data;
                const resB = await axios.post(`http://localhost:8080/crearPartido?nroZona=100&categoria=${datosPartido.categoria}&idClubLocal=${datosPartido.clubVisitante}&idClubVisitante=${datosPartido.clubLocal}&idCampeonato=${idCampeonato}`);
                const idPartidoB = resB.data;

                const cargarFecha = await axios.post(`http://localhost:8080/cargarNroFechaYFechaPartido?idPartido=${parseInt(idPartidoA)}&nroFecha=${nroFecha}&fecha=${datosPartido.fechaPartidoL.replaceAll("-", "/")}`);
                const cargarFechaB = await axios.post(`http://localhost:8080/cargarNroFechaYFechaPartido?idPartido=${parseInt(idPartidoB)}&nroFecha=${nroFecha + 1}&fecha=${datosPartido.fechaPartidoV.replaceAll("-", "/")}`);

                setError("Operacion realizada con éxito");
                setTitle("Operación exitosa");
                setModalTitle("Datos Cargados");
                setShowModal(true);
            } catch (e) {
                setError(e.response.data.message);
                setTitle("Error al cargar los datos del partido");
                setModalTitle("Error");
                setShowModal(true);
            }

        }
    }
       

    return (
        <div>
            <NavBarAdministracion/>

            <div className='main-container-cargapartido'>
                <div className='contenedor-blureado-tablas'>
                    <Form style={{marginTop: '25px'}} onSubmit={handleSubmit}>
                        <Row className="mb-4">
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>CLUB LOCAL</Form.Label>
                                <Form.Select name="clubLocal" type="text" placeholder="Club local"
                                             onChange={handleChange}>
                                    <option value="nada">-</option>

                                    {
                                        listadoClubes && listadoClubes.map((club, index) => {
                                            return (<option value={club.idClub}>{club.idClub} - {club.nombre}</option>)
                                        })
                                    }
                                </Form.Select>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>CLUB VISITANTE</Form.Label>
                                <Form.Select name="clubVisitante" type="text" placeholder="Club visitante"
                                             onChange={handleChange}>
                                    <option value="nada">-</option>
                                    {
                                        listadoClubes && listadoClubes.map((club, index) => {
                                            return (<option value={club.idClub}>{club.idClub} - {club.nombre}</option>)
                                        })
                                    }
                                </Form.Select>
                            </Form.Group>
                        </Row>
                        <Row className="mb-4">
                            <Form.Group as={Col} controlId="formBasicDate">
                                <Form.Label>FECHA DEL PARTIDO LOCAL</Form.Label>
                                <Form.Control name="fechaPartidoL" type="date" min={fechaIniMin}
                                              max={fechaLimite} value={datosPartido.fechaPartidoL}
                                              onChange={handleChange}/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formBasicDate">
                                <Form.Label style={{width: "300px"}}>FECHA DEL PARTIDO VISITANTE</Form.Label>
                                <Form.Control name="fechaPartidoV" type="date" min={fechaIniMin}
                                              max={fechaLimite} value={datosPartido.fechaPartidoV}
                                              onChange={handleChange}/>
                            </Form.Group>
                        </Row>

                        <Row className="mb-4">
                            <Form.Group>
                                <Form.Label>NRO DE FECHA IDA</Form.Label>
                                <Form.Control name="nroFecha" type="number" value={nroFecha} readOnly/>
                            </Form.Group>
                        </Row>

                        <Row className="mb-4">
                            <Form.Group>
                                <Form.Label>NRO DE FECHA VUELTA</Form.Label>
                                <Form.Control name="nroFecha" type="number" value={nroFecha+1} readOnly/>
                            </Form.Group>
                        </Row>

                        <Button style={{width: '150px', marginLeft: '40%'}} variant="success" type="submit">
                            CREAR
                        </Button>
                    </Form>
                </div>
                <PopUp show={showModal} onHide={() => setShowModal(false)} text={error}
                       title={title} modalTitle={modalTitle}/>
            </div>
        </div>
    );
}