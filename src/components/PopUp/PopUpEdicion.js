import {Button, Modal, Form} from "react-bootstrap";
import { Link } from "react-router-dom";
export const PopUpEdicion = (props) => {
    const tipominus = props.tipo.toLowerCase();
    return (
        <Modal
            size="lg"
            handleClose={props.handleClose}
            show={props.show}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {`EDITAR PERFIL ${props.tipo}`}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {`Ingresar ID del ${tipominus}`}
                <Form.Control type="text" placeholder="ID" />  
            </Modal.Body>
            <Modal.Footer>
                <Link className="btn btn-success" to={`/datos/${tipominus}`} onClick={props.handleClose}>
                  Editar
                </Link>
                <Button variant="secondary" onClick={props.handleClose}>
                  Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}