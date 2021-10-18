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
                <div className = 'container-sm contenedorJug'>
                    <Form className = 'formJugador'>
                        <Row className="mb-4">
                            <Form.Group as={Col} md='4' controlId="formGridNombre">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control type="text" placeholder="Nombre" readOnly/>
                            </Form.Group>

                            <Form.Group as={Col} md='4'controlId="formGridApellido">
                                <Form.Label>Apellido</Form.Label>
                                <Form.Control type="text" placeholder="Apellido" readOnly />
                            </Form.Group>

                            <Form.Group as={Col} md='2' controlId="formGridFechaNac">
                                <Form.Label>Fecha nacimiento</Form.Label>
                                <Form.Control type="text" placeholder="Fecha Nac" readOnly />
                            </Form.Group>

                            <Form.Group as ={Col} md='2' controlId="formGridCategoria">
                                <Form.Label>Categoria</Form.Label>
                                <Form.Control type= 'text' placeholder="Categ." readOnly />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">

                            <Form.Group as ={Col} md='4' controlId="formGridTipoDoc">
                                <Form.Label>Tipo de documento</Form.Label>
                                <Form.Control type= 'text' placeholder="Tipo de documento" readOnly />
                            </Form.Group>

                            <Form.Group as ={Col} md='4' controlId="formGridDocumento">
                                <Form.Label>Documento</Form.Label>
                                <Form.Control type= 'text' placeholder="Documento" readOnly/>
                            </Form.Group>

                            <Form.Group as={Col} md = '3' controlId="formGridEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="text" placeholder="Email" />
                            </Form.Group>

                            <Form.Group as={Col} md = '1' controlId="formGridEstado">
                                <Form.Label>Estado</Form.Label>
                                <Form.Control type="text" placeholder="Estado" />
                            </Form.Group>

                            
                        </Row>

                        <Row>
                            
                            <Form.Group as={Col} md='4' controlId="formGridTelefono">
                                <Form.Label>Telefono</Form.Label>
                                <Form.Control type="text" placeholder="Numero de telefono" />
                            </Form.Group>

                            <Form.Group as ={Col} md='4' controlId="formGridDireccion">
                                <Form.Label>Direccion</Form.Label>
                                <Form.Control type= 'text' placeholder="Calle 1234" />
                            </Form.Group>

                            <Form.Group as={Col} md='2' controlId="formGridFechaAlta">
                                <Form.Label>Fecha alta</Form.Label>
                                <Form.Control type="text" placeholder="Fecha Alta" readOnly />
                            </Form.Group>
                            
                        </Row>
                      
                        <Button className='botonjug' variant="success" type="submit">
                            Actualizar
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    
    )
}