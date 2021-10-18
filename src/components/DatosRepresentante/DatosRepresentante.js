import React from 'react';
import './datosrepresentante.css';
import Avatar from '../../assets/images/representante.png';
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

export const DatosRepresentante = () => {
    return (
        <div>
            <div className = 'container-fluid main-container'>
                <div className = 'header'>
                    <div className = 'title'> 
                        <h2>Perfil del Representante</h2> 
                    </div>
                </div>
                <div className = 'avatar'>
                    <img src = {Avatar} alt = 'avatarPerfil'/>
                </div>
                <div className = 'container-sm'>
                    <Form>
                        <Row className="mb-3">
                            <Form.Group as={Col} md='4' controlId="formGridNombre">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control type="text" placeholder="Nombre"/>
                            </Form.Group>

                            <Form.Group as={Col} md='4'controlId="formGridLegajo">
                                <Form.Label>Legajo</Form.Label>
                                <Form.Control type="text" placeholder="Legajo" readOnly />
                            </Form.Group>

                            <Form.Group as ={Col} md='4' controlId="formGridDocumento">
                                <Form.Label>Documento</Form.Label>
                                <Form.Control type= 'text' placeholder="Documento" readOnly/>
                            </Form.Group>
                        </Row>

                        <Row className="mb-3 club">
                            <Form.Group as={Col} md = '5' className = 'club' controlId="formGridClub">
                                <Form.Label>Club</Form.Label>
                                <Form.Control type="text" placeholder="Club" />
                            </Form.Group>   
                        </Row>
                        <Button className='botonrep' variant="success" type="submit">
                            Actualizar
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    
    )
}