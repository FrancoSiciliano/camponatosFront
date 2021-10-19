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
                    <Form>
                        <Row className="mb-3">
                            
                            <Form.Label className = 'etiquetadatos'>Nombre</Form.Label>

                            <Form.Label>Legajo</Form.Label>

                            <Form.Label>Documento</Form.Label>
                        
                        </Row>
                    </Form>
                </div>
                <div className = 'datosclub'>

                </div>
                <div className = 'stats'>

                </div>
            </div>

        </div>
        
    )
}