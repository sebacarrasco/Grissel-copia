import React from 'react';
import Button from '../buttons/Boton'

import {
  Card,
  Form,
  Row,
  Col,
} from "react-bootstrap";

export default function Config({user}) {
      
    return (

    <Card>
        <Card.Header>
        <Card.Title as="h4">Editar Perfil</Card.Title>
        </Card.Header>
        <Card.Body>
        <Form>
            <Row>
            <Col className="pr-1" md="6">
                <Form.Group>
                <label>Nombre</label>
                <Form.Control

                    placeholder="Nombre"
                    defaultValue={user.firstName}
                    type="text"
                >
                </Form.Control>
                </Form.Group>
            </Col>
            <Col className="pl-1" md="6">
                <Form.Group>
                <label>Apellido</label>
                <Form.Control
                    defaultValue={user.lastName}
                    placeholder="Apellido"
                    type="text"
                ></Form.Control>
                </Form.Group>
            </Col>
            </Row>
            <Row>
            <Col className="pl-1" md="12">
                <Form.Group>
                <label htmlFor="exampleInputEmail1">
                    Email
                </label>
                <Form.Control
                    placeholder="Emai"
                    defaultValue={user.email}
                    type="email"
                ></Form.Control>
                </Form.Group>
            </Col>
            </Row>
            <Row>
            <Col md="12">
                <Form.Group>
                <label>Dirección</label>
                <Form.Control
                    placeholder="Dirección"
                    type="text"
                ></Form.Control>
                </Form.Group>
            </Col>
            </Row>
            <Row>
            <Col className="pr-1" md="4">
                <Form.Group>
                <label>Ciudad</label>
                <Form.Control
                    defaultValue="Santiago"
                    placeholder="Ciudad"
                    type="text"
                ></Form.Control>
                </Form.Group>
            </Col>
            <Col className="px-1" md="4">
                <Form.Group>
                <label>País</label>
                <Form.Control
                    defaultValue="Chile"
                    placeholder="País"
                    type="text"
                ></Form.Control>
                </Form.Group>
            </Col>
            <Col className="pl-1" md="4">
                <Form.Group>
                <label>Código Postal</label>
                <Form.Control
                    placeholder="Código postal"
                    type="number"
                ></Form.Control>
                </Form.Group>
            </Col>
            </Row>
            <Row>
            <Col md="12">
                <Form.Group>
                <label></label>
                </Form.Group>
            </Col>
            </Row>
            <Button
            text='Actualizar Perfil'
            clase='green-button-xl'
            >
            </Button>

            <div className="clearfix"></div>
        </Form>
        </Card.Body>
    </Card>

    )};