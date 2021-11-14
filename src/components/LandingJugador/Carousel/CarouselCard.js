import {Card, Carousel, Form} from "react-bootstrap";
import "./carousel.css"
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";


export const CarouselCard = (props) => {
    const [campeonatos, setCampeonatos] = useState(new Array());
    const [filtro, setFiltro] = useState({
        estado: "",
        fechaDesde: "",
        fechaHasta: ""
    });
    const [todosCampeonatos, setTodosCampeonatos] = useState(new Array());

    useEffect(() => {
        async function fetchData() {
            const data = await axios(`http://localhost:8080/getCampeonatosByClub?idClub=${props.idClub}`);
            setCampeonatos(data.data);
            setTodosCampeonatos(data.data);
        }

        fetchData();
    }, []);

    const handleFilteringByState = (event) => {
        if (event.target.value !== "no-seleccionado") {
            setCampeonatos(todosCampeonatos.filter((elem) => {
                return elem.estado === event.target.value
            }));
        } else {
            setCampeonatos(todosCampeonatos);
        }
    };

    const handleFilteringByName = (event) => {
        setCampeonatos(todosCampeonatos.filter((elem) => {
            return elem.descripcion.toLowerCase().includes(event.target.value.toLowerCase());
        }));
    }

    return (
        <>
            <div className="main-container-carrusel">
                <p className='titulo-filtros-carrusel'> Seleccionar estado de los campeonatos </p>
                <div className="filtros-carrusel">
                    <Form.Select className="filtro" onChange={handleFilteringByState}>
                    <option value="no-seleccionado">Seleccionar estado</option>
                    <option value="activo">Activo</option>
                    <option value="inactivo">Inactivo</option>
                </Form.Select>

                    <Form.Control className="filtro" placeholder="Buscar por Nombre" onChange={handleFilteringByName}/>
                </div>

                <Carousel variant="dark" className="carrusel">
                    {campeonatos.map((campeonato, index) => {
                        return (
                            <Carousel.Item key={index}>
                                <Card style={{width: '18rem'}}>
                                    <Card.Img variant="top"
                                              src="https://s03.s3c.es/imag/_v0/770x420/e/0/6/600x400_balon-de-futbol.jpg"/>
                                    <Card.Body>
                                        <Card.Title>{campeonato.descripcion}</Card.Title>
                                        <Card.Text>
                                            <ul>
                                                <li>Desde: {campeonato.fechaInicio}</li>
                                                <li>Hasta: {campeonato.fechaFin}</li>
                                                <li>Estado: {campeonato.estado}</li>
                                            </ul>
                                        </Card.Text>
                                        <Link to="/test" className="btn btn-success botoncarrusel"> Ir a Tabla</Link>
                                        <Link to="/test" className="btn btn-success botoncarrusel"> Estadisticas </Link>
                                    </Card.Body>
                                </Card>
                            </Carousel.Item>
                        );
                    })}
                </Carousel>
            </div>
        </>
    );
}