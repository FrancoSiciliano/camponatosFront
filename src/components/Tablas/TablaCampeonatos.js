import { Table, Form, Button, Modal } from "react-bootstrap";
import './TablaCampeonatos.css'
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import NavBarAdministracion from "../NavBars/NavBarAdministracion";
import {PantallaCarga} from "../PantallaCarga/PantallaCarga";
//onClick={handleClickTabla(ids,descripcion,"ADMINISTRACION")}
export const TablaCampeonatos = (props) => {
    const history = useHistory();
    const [campeonatos, setCampeonatos] = useState(null);
    const [todosCampeonatos, setTodosCampeonatos] = useState(null);


    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    useEffect(() => {
        const fetchData = async () => {
            const response = await axios(`http://localhost:8080/getCampeonatos`);
            const newData = response.data;
            setCampeonatos(newData);
            setTodosCampeonatos(newData);
        };
        fetchData();
    }, []);
    const handleClickEstado = async (idCampeonato) => {
        console.log(idCampeonato);
        try {
            await axios.post(`http://localhost:8080/terminarCampeonato?idCampeonato=${idCampeonato}`);
        } catch (e) {
            console.log(e.message);
        }
    }
    const handleChange = (event) => {
        setCampeonatos(todosCampeonatos.filter((elem) => {
            return elem.descripcion.toLowerCase().includes(event.target.value.toLowerCase());
        }));
        console.log(campeonatos);
    }
    const handleClickTabla = (idCampeonato,Tipo)=>{
        history.push("/tabla/posiciones",{campeonato:idCampeonato,tipo:Tipo})
    }

    if (campeonatos) {
        return (<div className="ContenedorGestion">
            <NavBarAdministracion />
            <div className="TablaCampeonatosResponsables">
                <Table striped bordered hover sm>
                    <thead>
                        <tr borderless>
                            <th colSpan="8">
                                CAMPEONATOS
                            </th>
                        </tr>
                        <tr>
                            <th>#</th>
                            <th>Nombre</th>
                            <th>Fecha Inicio</th>
                            <th>Fecha Fin</th>
                            <th>Tabla Posicion</th>
                            <th>Partidos Campeonato</th>
                            <th colSpan="2">
                                <Form.Control classname="searchBox"
                                    id="search" type="search" placeholder="Filtrar por Nombre"
                                    onChange={handleChange} autoComplete="off" />

                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {campeonatos.map((campeonato, index) => {
                            let descripcion = campeonato.descripcion
                            let ids = campeonato.idCampeonato
                            let estado = campeonato.estado
                            if (estado.toUpperCase() === "ACTIVO") {
                                return (
                                    <tr key={ids}>
                                        <td>{ids}</td>
                                        <td>{descripcion}</td>
                                        <td>{campeonato.fechaInicio}</td>
                                        <td>{campeonato.fechaFin}</td>
                                        <td><Button className='btn btn-success' onClick={() => handleClickTabla(ids,"ADMINISTRADOR")} >Tabla</Button></td>
                                        <td><Link className='btn btn-success' to={{
                                            pathname: '/administrador/campeonatos/partidos',
                                            state: { idCampeonato: ids, descrip: descripcion }
                                        }}>Partidos</Link></td>
                                        <td><Button className='btn btn-success' onClick={handleShow} >Finalizar Campeonato</Button></td>
                                        <Modal show={show} onHide={handleClose}>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Finalizar Campeonato</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>¿Está seguro que desea finalizar el campeonato?</Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="secondary" onClick={handleClose}>
                                                    Cancelar
                                                </Button>
                                                <Button variant="success" onClick={()=>handleClickEstado(ids)}>
                                                    Confirmar
                                                </Button>
                                            </Modal.Footer>
                                        </Modal>
                                    </tr>)
                            }

                        })}
                    </tbody>
                </Table>
            </div>
        </div>)
    } else {
        return (<PantallaCarga/>)
    }
}


export default TablaCampeonatos;