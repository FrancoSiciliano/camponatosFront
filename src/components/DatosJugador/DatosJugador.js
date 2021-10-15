import React from 'react';
import './datosjugador.css';
import Avatar from '../../assets/images/avatar-perfil.jpg';
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

export const DatosJugador = () => {
    return (
        <div>
            <div className = 'container-fluid main-container'>
                <div className = 'header'>
                    <div className = 'title'> 
                        <h2>Perfil del Jugador</h2> 
                    </div>
                </div>
                <div className = 'avatar'>
                    <img src = {Avatar} alt = 'avatarPerfil'/>
                </div>
                <div className = 'container-sm'>
                    <Form>
                        <Row className="mb-3">
                            <Form.Group as={Col} md='3' controlId="formGridNombre">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control type="text" placeholder="Nombre" readOnly/>
                            </Form.Group>

                            <Form.Group as={Col} md='3'controlId="formGridApellido">
                                <Form.Label>Apellido</Form.Label>
                                <Form.Control type="text" placeholder="Apellido" readOnly />
                            </Form.Group>

                            <Form.Group as ={Col} md='4' controlId="formGridDireccion">
                                <Form.Label>Direccion</Form.Label>
                                <Form.Control type= 'text' placeholder="Calle 1234" />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} md = '6' controlId="formGridEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="text" placeholder="Email" />
                            </Form.Group>

                            <Form.Group as={Col} md='4' controlId="formGridTelefono">
                                <Form.Label>Telefono</Form.Label>
                                <Form.Control type="text" placeholder="Numero de telefono" />
                            </Form.Group>
                        </Row>
                        <Button className='boton' variant="success" type="submit">
                            Actualizar
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    
    )
}