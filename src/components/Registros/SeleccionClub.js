import {useEffect, useState} from "react";
import axios from "axios";
import {FloatingLabel, Form} from "react-bootstrap";
import {Link} from "react-router-dom";

export const SeleccionClub = () => {

    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios(`http://localhost:8080/getClubes`);
            const newData = response.data;
            setData(newData);
        };
        fetchData();
    });

    if (data) {
        return (
            <div className="container main-container-registro">
                <FloatingLabel controlId="floatingSelect" label="Seleccione un equipo">
                    <Form.Select className="label-select">
                        <option>Seleccionar</option>
                        {data.map((club, index) => {
                            return (
                                <option key={index} value={club.idClub}>{`${club.idClub} - ${club.nombre}`}</option>)
                        })}
                    </Form.Select>
                </FloatingLabel>
                <Link className="btn btn-success boton-submit" to="/seleccionClub">Finalizar</Link>
            </div>
        )
    } else {
        return (<h1>Cargando...</h1>)
    }
}