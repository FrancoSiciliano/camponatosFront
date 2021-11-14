import './PerfilJugador.css'
import React from 'react'
import {Accordion} from "react-bootstrap";

export const PerfilJugador = (props) => {
    const jugador = props.jugadorData;
    const stats = props.estadisticas;

    return (
        <>
            <div className="acordeon">
                <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Datos Personales</Accordion.Header>
                        <Accordion.Body>
                            <div className="datos-formulario">
                                <div className="atributos">
                                    <p>Nombre:</p>
                                    <p>Apellido:</p>
                                    <p>Fecha de Nacimiento:</p>
                                    <p>Categoria:</p>
                                    <p>Tipo de documento:</p>
                                    <p>Documento:</p>
                                </div>
                                <div className="valores">
                                    <p>{jugador.nombre}</p>
                                    <p>{jugador.apellido}</p>
                                    <p>{jugador.fechaNacimiento}</p>
                                    <p>{jugador.categoria}</p>
                                    <p>{jugador.tipoDocumento}</p>
                                    <p>{jugador.documento}</p>
                                </div>
                                <div className="atributos">
                                    <p>Estado:</p>
                                    <p>Fecha de Alta:</p>
                                    <p>Direccion:</p>
                                    <p>Mail:</p>
                                    <p>Telefono:</p>
                                </div>
                                <div className="valores">
                                    <p>{jugador.estado ? "Activo" : "Inactivo"}</p>
                                    <p>{jugador.fechaAlta}</p>
                                    <p>{jugador.direccion}</p>
                                    <p>{jugador.mail}</p>
                                    <p>{jugador.telefono}</p>
                                </div>
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Datos del Club</Accordion.Header>
                        <Accordion.Body>

                            <div className="datos-formulario-club">
                                <div className="atributos">
                                    <p>Nombre:</p>
                                    <p>Dirección:</p>
                                </div>
                                <div className="valores">
                                    <p>{jugador.club.nombre}</p>
                                    <p>{jugador.club.direccion}</p>
                                </div>
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header>Estadisticas en el Club</Accordion.Header>
                        <Accordion.Body>
                            <div className="datos-formulario-stats">
                                <div className="atributos">
                                    <p>PJ</p>
                                    <p>Goles:</p>
                                </div>
                                <div className="valores">
                                    <p>{stats.cantJugados}</p>
                                    <p>{stats.cantGoles}</p>
                                </div>
                                <div className="atributos">
                                    <p>Amarillas:</p>
                                    <p>Rojas:</p>
                                </div>
                                <div className="valores">
                                    <p>{stats.cantAmarillas}</p>
                                    <p>{stats.cantRojas}</p>
                                </div>
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>

            </div>
        </>

    )
}