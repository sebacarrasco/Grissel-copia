import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import useMediaQuery from '../../useMediaQuery';
import { GoBackButton } from '../buttons/GoBackButton';
import { ProductCartCard } from '../cart/ProductCartCard';
import { Col, Row, Container, Form, Button, Card }
from 'react-bootstrap';
import "./checkout.css";
import * as FaIcons from 'react-icons/fa';
// import { CartSummary } from '../checkout/CartSummary';



export const CheckoutCart = ({ history }) => {

    const { products } = useSelector(state => state.cart);
    const web = useMediaQuery("(min-width: 600px)");

    let amount = 0;
    products.forEach(product => {
        amount += product.quantity * product.price
    });

    return (
        <Container className="div-container">
            
            
            <GoBackButton />
            <Row>
                <Col>
                <Card>
                <Card.Header>
                    <Card.Title>Tu carrito</Card.Title>
                </Card.Header>
                <Card.Body>
                <Col className="mt-5">

                    <Row md={1} className="mt-3">
                        
                        {products.map((product => (
                            <Col key={product.id}>
                                <ProductCartCard
                                    key={ product.id }
                                    {...product}
                                />
                            </Col>
                        )))}
                    </Row>
                    
                </Col>
                </Card.Body>
                <Card.Footer>
                </Card.Footer>
                </Card>
                </Col>
                <Col>
                <Card>
                <Card.Header>
                    <Card.Title>Resúmen de la compra</Card.Title>
                </Card.Header>

                <Container className="border-top mt-5 flex text-center">
                        <h3> Total: {amount} </h3>
                        <Button className="green-button mb-3" >Continuar</Button>
                </Container>
                </Card>
                </Col>

                
            </Row>
        </Container>
    )
}
