import React from 'react';
import { Container, Row, Button, Col } from 'react-bootstrap';


export const AccountConfirmationScreen = ({ history }) => {
    return (
        <Container
            style={{marginTop:'6rem'}}
        >
            <Row>
                <h1 className="text-white text-center">Listo! Tu cuenta ha sido creada</h1>
            </Row>
            <Row>
                <Col md={{ span: 2, offset: 5 }} xs={{span: 4, offset: 4}}>
                    <Button
                        className="btn-success w-100 mt-3"
                        onClick={ () => history.push("/auth/login") }
                    >
                        Ingresar
                    </Button>
                </Col>
            </Row>
        </Container>
    )
}
