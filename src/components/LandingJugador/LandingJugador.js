import Avatar from '../../assets/images/imagenjugador.png'
import './landingjugador.css'
import React from 'react'
import {Form, Row, Col} from 'react-bootstrap'
export const LandingJugador = () =>{
    return (

        <div className = 'contenedorprincipal' >
            <img className = 'imagenjugador' src = {Avatar} alt = 'imagenjugador'></img>
            
            <div className = 'datos'>

                <div className = 'datospersonales'>
                    <h1 className = "jugadorTitle">Datos personales</h1> 
                    <Form>
                        <Row className="mb-3">
                            <Form.Label className = 'fila1A'>Nombre:</Form.Label>
                            <Form.Label className = 'fila2A'>Apellido:</Form.Label>
                            <Form.Label className = 'fila3A'>Fecha de nacimiento:</Form.Label>
                            <Form.Label className = 'fila4A'>Categoría:</Form.Label>
                            <Form.Label className = 'fila5A'>Tipo documento:</Form.Label>
                            <Form.Label className = 'fila6A'>Documento:</Form.Label>                            
                            <Form.Label className = 'fila1B'>Estado:</Form.Label>                            
                            <Form.Label className = 'fila2B'>Fecha de alta:</Form.Label>
                            <Form.Label className = 'fila3B'>Dirección:</Form.Label>
                            <Form.Label className = 'fila4B'>Mail:</Form.Label>
                            <Form.Label className = 'fila5B'>Teléfono:</Form.Label>
                        </Row>
                    </Form>
                </div>

                <div className = 'datosclub'>
                    <h1 className = "clubTitle">Datos Club</h1> 
                    <Form>
                        <Row className="mb-3">
                            <Form.Label className = 'fila7A'>Nombre:</Form.Label>
                            <Form.Label className = 'fila8A'>Dirección:</Form.Label>
                        </Row>
                    </Form>
                </div>

                <div className = 'stats'>
                    <h1 className = "statsTitle">Estadísticas</h1> 
                    <Form>
                        <Row className="mb-3">
                            <Form.Label className = 'fila9A'>PJ:</Form.Label>
                            <Form.Label className = 'fila10A'>Goles:</Form.Label>
                            <Form.Label className = 'fila6B'>Amarillas:</Form.Label>
                            <Form.Label className = 'fila7B'>Rojas:</Form.Label>
                        </Row>
                    </Form>
                </div>
            </div>

        </div>
        
    )
}