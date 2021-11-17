import NavBarAdministracion from "../../NavBars/NavBarAdministracion";
import './CrearPartido.css'
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { Table, Form, Row, Button, Col } from "react-bootstrap";
import {useHistory} from "react-router-dom";

export const CrearPartido = () => {

    const history = useHistory();
    const state = history.location.state;

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios(`http://localhost:8080/getTablaPosicionesByZona?idCampeonato=${state}`)
            const data = response.data;
            setData(data);
        };
        fetchData();
    }, [])

    const handleSubmit = () => {
        
    }
    return(
        <div>
            <NavBarAdministracion/>
            
            <div className = 'main-container-cargapartido'>
                <div className = 'contenedor-blureado-tablas'>
                    <div className = 'tabla-visualizacion-clubes'>
                        <div className = 'contenedor-tabla-posiciones-centrado'>
                            <Table striped bordered hover sm >
                                <thead>
                                    <tr borderless>
                                        <th  colSpan="11">
                                        TABLAS POSICIONES
                                        </th>
                                    </tr>
                                    <tr>
                                        <th>Club</th>
                                        <th>PJ</th>
                                        <th>G</th>
                                        <th>P</th>
                                        <th>E</th>
                                        <th>GF</th>
                                        <th>GE</th>
                                        <th>DIF</th>
                                        <th>PTOS</th>
                                        <th>PROM</th>
                                        <th>ZONA</th>
                                    </tr>
                                </thead>
                                <tbody>
                                
                                    {data.map((zona, index)=>{ 
                                    return(
                                        zona.map((club) => {
                                            return(
                                                <tr key={club.id.idClub}>
                                                    <td>{club.id.nombre}</td>
                                                    <td>{club.cantidadJugados}</td>
                                                    <td>{club.cantidadGanados}</td>
                                                    <td>{club.cantidadPerdidos}</td>
                                                    <td>{club.cantidadEmpatados}</td>
                                                    <td>{club.golesFavor}</td>
                                                    <td>{club.golesContra}</td>
                                                    <td>{club.diferenciaGoles}</td>
                                                    <td>{club.puntos}</td>
                                                    <td>{club.promedio}</td>
                                                    <td>{index+1}</td>
                                                </tr>
                                            )
                                        })
                                    )
                                    
                                    })}
                                    
                                </tbody>
                            </Table>
                        </div>
                    </div>
                    <div className = 'columna-creacion-partido'>
                        <div className = 'columna-creacion-partido-mitad'>
                            <Form style={{marginTop: '25px'}} onSubmit={handleSubmit}>
                                <Row className="mb-4">
                                    <Form.Group as={Col} md='5' controlId="formGridEmail">
                                    <Form.Label>CLUB LOCAL</Form.Label>
                                    <Form.Control type="text" placeholder="Club local" />
                                    </Form.Group>

                                    <Form.Group as={Col} md='5' controlId="formGridPassword">
                                    <Form.Label>CLUB VISITANTE</Form.Label>
                                    <Form.Control type="text" placeholder="Club visitante" />
                                    </Form.Group>
                                </Row>
                                <Row className="mb-5" style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                    <Form.Group as={Col} md='5' controlId="formBasicPassword">
                                        <Form.Label>FECHA DEL PARTIDO</Form.Label>
                                        <Form.Control type="date"/>
                                    </Form.Group>
                                </Row>
                                <Button style={{width:'150px', marginLeft: '40%'}} variant="success" type="submit">
                                    CREAR
                                </Button>
                            </Form>       
                        </div>
                        <div className = 'columna-creacion-partido-mitad'>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}