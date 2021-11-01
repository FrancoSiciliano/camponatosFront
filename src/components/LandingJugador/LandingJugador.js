import Avatar from '../../assets/images/imagenjugador.png'
import './landingjugador.css'
import React from 'react'
import {Form, Row, Col} from 'react-bootstrap'
export const LandingJugador = () =>{
    const jugador = {
        nombre: "erling",
        apellido: "haaland",
        fechaNacimiento: "20/1/21",
        categoria: "2000",
        tipoDoc: "DNI",
        nroDoc: "123124124",
        estado: "activo",
        fechaAlta: "12/12/12",
        direccion: "brandsen",
    }
    return (

        <div className = 'contenedorprincipal' >
            <img className = 'imagenjugador' src = {Avatar} alt = 'imagenjugador'></img>
            
            <div className = 'datos'>

                <div className = 'datospersonales'>
                    <h1 className = "jugadorTitle">Datos personales</h1> 
                    <Form>
                        <Row className="mb-3">
                            <Form.Label className = 'fila1A labelDato'>Nombre:</Form.Label>
                            <Form.Label className = 'fila1AR labelRta'>Erling</Form.Label>
                            <Form.Label className = 'fila2A labelDato'>Apellido:</Form.Label>
                            <Form.Label className = 'fila2AR labelRta'>Haaland</Form.Label>
                            <Form.Label className = 'fila3A labelDato'>Fecha de nacimiento:</Form.Label>
                            <Form.Label className = 'fila3AR labelRta'>21/05/2000</Form.Label>
                            <Form.Label className = 'fila4A labelDato'>Categoría:</Form.Label>
                            <Form.Label className = 'fila4AR labelRta'>2000</Form.Label>
                            <Form.Label className = 'fila5A labelDato'>Tipo documento:</Form.Label>
                            <Form.Label className = 'fila5AR labelRta'>DNI</Form.Label>
                            <Form.Label className = 'fila6A labelDato'>Documento:</Form.Label>        
                            <Form.Label className = 'fila6AR labelRta'>42556442</Form.Label>                       
                            <Form.Label className = 'fila1B labelDato'>Estado:</Form.Label>  
                            <Form.Label className = 'fila1BR labelRta'>Activo</Form.Label>                          
                            <Form.Label className = 'fila2B labelDato'>Fecha de alta:</Form.Label>
                            <Form.Label className = 'fila2BR labelRta'>10/03/2017</Form.Label>
                            <Form.Label className = 'fila3B labelDato'>Dirección:</Form.Label>
                            <Form.Label className = 'fila3BR labelRta'>LaCasaDelKING</Form.Label>
                            <Form.Label className = 'fila4B labelDato'>Mail:</Form.Label>
                            <Form.Label className = 'fila4BR labelRta'>40golesporpartido@gmail.com</Form.Label>
                            <Form.Label className = 'fila5B labelDato'>Teléfono:</Form.Label>
                            <Form.Label className = 'fila5BR labelRta'>0800-haaland</Form.Label>
                        </Row>
                    </Form>
                </div>

                <div className = 'datosclub'>
                    <h1 className = "clubTitle">Datos Club</h1> 
                    <Form>
                        <Row className="mb-3">
                            <Form.Label className = 'fila7A labelDato'>Nombre:</Form.Label>
                            <Form.Label className = 'fila7AR labelRta'>Boca Juniors</Form.Label>
                            <Form.Label className = 'fila7B labelDato'>Dirección:</Form.Label>
                            <Form.Label className = 'fila7BR labelRta'> Brandsen 805 </Form.Label>
                        </Row>
                    </Form>
                </div>

                <div className = 'stats'>
                    <h1 className = "statsTitle">Estadísticas</h1> 
                    <Form>
                        <Row className="mb-3">
                            <Form.Label className = 'fila8A labelDato'>PJ:</Form.Label>
                            <Form.Label className = 'fila8AR labelRta'>20</Form.Label>
                            <Form.Label className = 'fila9A labelDato'>Goles:</Form.Label>
                            <Form.Label className = 'fila9AR labelRta'>140</Form.Label>
                            <Form.Label className = 'fila8B labelDato'>Amarillas:</Form.Label>
                            <Form.Label className = 'fila8BR labelRta'>2</Form.Label>
                            <Form.Label className = 'fila9B labelDato'>Rojas:</Form.Label>
                            <Form.Label className = 'fila9BR labelRta'>0</Form.Label>
                        </Row>
                    </Form>
                </div>
            </div>

        </div>
        
    )
}