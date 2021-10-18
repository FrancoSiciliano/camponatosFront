import React from 'react';
import './datosclub.css';
import Avatar from '../../assets/images/escudofutbol.png';
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'

export const DatosClub = () => {
    return (
        <div>
             <div className = 'container-fluid main-container'>
                <div className = 'header'>
                    <div className = 'title'> 
                        <h2>Perfil del Club</h2> 
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
                                <Form.Control type="text" placeholder="Nombre" readOnly/>
                            </Form.Group>

                            <Form.Group as={Col} md='4'controlId="formGridDireccion">
                                <Form.Label>Direccion</Form.Label>
                                <Form.Control type="text" placeholder="Direccion" readOnly />
                            </Form.Group>

                        </Row>
                        <Row className="mb-1">
                            <div className = 'scrollable'>
                            <Form.Group as={Col} md='12'controlId="formGridTabla">
                                <Table >
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Nombre</th>
                                            <th>Apellido</th>
                                            <th>Documento</th>
                                            <th>Categoria</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope = "row"> 1 </th>
                                            <th> NOMBRE 1 </th>
                                            <th> APELLIDO 1</th>
                                            <th> DOCUMENTO 1 </th>
                                            <th> CATEGORIA 1</th>
                                        </tr>
                                        <tr>
                                            <th scope = "row"> 2 </th>
                                            <th> NOMBRE 2 </th>
                                            <th> APELLIDO 2</th>
                                            <th> DOCUMENTO 2 </th>
                                            <th> CATEGORIA 2</th>
                                        </tr>
                                        <tr>
                                            <th scope = "row"> 3 </th>
                                            <th> NOMBRE 3 </th>
                                            <th> APELLIDO 3</th>
                                            <th> DOCUMENTO 3 </th>
                                            <th> CATEGORIA 3</th>
                                        </tr>
                                        <tr>
                                            <th scope = "row"> 4 </th>
                                            <th> NOMBRE 4 </th>
                                            <th> APELLIDO 4</th>
                                            <th> DOCUMENTO 4 </th>
                                            <th> CATEGORIA 4</th>
                                        </tr>
                                        <tr>
                                            <th scope = "row"> 5 </th>
                                            <th> NOMBRE 5 </th>
                                            <th> APELLIDO 5</th>
                                            <th> DOCUMENTO 5 </th>
                                            <th> CATEGORIA 5</th>
                                        </tr>
                                        <tr>
                                            <th scope = "row"> 6 </th>
                                            <th> NOMBRE 6 </th>
                                            <th> APELLIDO 6</th>
                                            <th> DOCUMENTO 6 </th>
                                            <th> CATEGORIA 6</th>
                                        </tr>
                                        <tr>
                                            <th scope = "row"> 7 </th>
                                            <th> NOMBRE 7 </th>
                                            <th> APELLIDO 7</th>
                                            <th> DOCUMENTO 7 </th>
                                            <th> CATEGORIA 7</th>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Form.Group>
                            </div>
                        </Row>
                      
                        <Button className='botonclub' variant="success" type="submit">
                            Actualizar
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    )
}