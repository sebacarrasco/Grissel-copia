import React from 'react';
import Modal from 'react-bootstrap/Modal'

import {
    Button,
    Figure
} from "react-bootstrap";


export default function ModalAge(props) {

    return(
    <Modal
    {...props}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
    backdrop="static"
    keyboard={false}
    >
        <Modal.Body>
        <Figure>
            <Figure.Image
                width={171}
                height={180}
                src="/grissel.svg"
                fluid
            />
            </Figure>
            <h4>Bienvenido a Grissel Botillería</h4>
            <h5>¿Eres mayor de edad?</h5>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={props.onHide} variant="outline-success">Si</Button>
            <Button onClick={props.onHide} variant="outline-danger">No</Button>
        </Modal.Footer>
    </Modal>       
)}