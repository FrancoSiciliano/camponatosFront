import NavBarAdministracion from "../../NavBars/NavBarAdministracion";
import './CrearPartido.css'
import {useState} from "react";
import axios from "axios";
import {useEffect} from "react";
import {Table, Form, Row, Button, Col} from "react-bootstrap";
import {useHistory} from "react-router-dom";

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
        if (datosPartido.clubLocal.idClub === datosPartido.clubVisitante.idClub) {
            setError("El club local no puede ser igual al visitante");
            setTitle("Club no válido");
            setModalTitle("Advertencia")
            setShowModal(true);

        } else {
            const res = await axios.get(`http://localhost:8080/crearPartido?nroZona=100&categoria=${datosPartido.categoria}&idClubLocal=${datosPartido.clubLocal}&idClubVisitante=${datosPartido.clubVisitante}&idCampeonato=${idCampeonato}`);
            const idPartidoA = res.data;
            const resB = await axios.get(`http://localhost:8080/crearPartido?nroZona=100&categoria=${datosPartido.categoria}&idClubLocal=${datosPartido.clubVisitante}&idClubVisitante=${datosPartido.clubLocal}&idCampeonato=${idCampeonato}`);
            const idPartidoB = resB.data;
    
            const cargarFecha = await axios.get(`http://localhost:8080/cargarNroFechaYFechaPartido?idParitdo=${idPartidoA}&nroFecha=${datosPartido.nroFecha}&fecha=${datosPartido.fechaPartidoL.replaceAll("-", "/")}`);
            const cargarFechaB = await axios.get(`http://localhost:8080/cargarNroFechaYFechaPartido?idParitdo=${idPartidoB}&nroFecha=${datosPartido.nroFecha+1}&fecha=${datosPartido.fechaPartidoV.replaceAll("-", "/")}`);
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
                                <Form.Label>NRO DE FECHA</Form.Label>
                                <Form.Control name="nroFecha" type="number" value={nroFecha} readOnly/>
                            </Form.Group>
                        </Row>

                        <Button style={{width: '150px', marginLeft: '40%'}} variant="success" type="submit">
                            CREAR
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    );
}