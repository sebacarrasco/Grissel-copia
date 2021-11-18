import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import api from '../../api';
import useMediaQuery from '../../useMediaQuery';
import { GoBackButton } from '../buttons/GoBackButton';
import { ProductCartCard } from '../cart/ProductCartCard';
import { Col, Row, Container, Form, Button, Card }
from 'react-bootstrap';
import "./checkout.css";
import * as FaIcons from 'react-icons/fa';



export const ConfirmationScreen = ({ history }) => {

    const { firstName, lastName, rut, email, cellNumber, deliveryAddress } = useSelector(state => state.checkout);
    const { products } = useSelector(state => state.cart);
    const web = useMediaQuery("(min-width: 600px)");
    const [url, setUrl] = useState('');
    const [token, setToken] = useState('');
    // const [buttonDisabled, setDisabled] = useState(false);

    // const dispatch = useDispatch();

    let amount = 0;
    products.forEach(product => {
        amount += product.quantity * product.price
    });

    const handleGoToPay = () => {
        console.log("holaaaaa");
        api.post("transaction", {
            amount
        })
        .then(response =>{
            setUrl(response.data.url);
            setToken(response.data.token);
            console.log(response.data.url);   
        })
        .catch(e => {
            console.log(e);
            console.log(e.response);
            if (e.response)
            {
                Swal.fire(e.response.data.message, e.response.data.detail);
            }
            else{
                Swal.fire("Se ha producido un error, por favor vuelve a intentarlo");
            }
        });

    }

    return (
        <Container className="div-container">
            <GoBackButton />
            <Row>
                <Col md={8} className= "mt-5 text-white">
                <Card
                    bg="light"
                    text='dark'
                    style={{ width: '90%' }}
                    className="mb-2"
                >
                    <Card.Body>
                        <Form>
                        <Form.Check type={'radio'} id={`radio-webpay`} >
                            <Form.Check.Input type={'radio'} className="m-3" onClick={handleGoToPay}/>
                            <Form.Check.Label ><FaIcons.FaCreditCard size={28} color="black" className="m-2"/> Webpay </Form.Check.Label>
                        </Form.Check>
                        </Form>
                    </Card.Body>
                </Card>
                </Col>

                <Col md={4} className="mt-5">
                    <Container className="text-white">
                    <h2>Detalles del envío</h2>
                    <p>Nombre: { firstName }</p>
                    <p>Apellido: { lastName }</p>
                    <p>Rut: { rut }</p>
                    <p>Email: { email }</p>
                    <p>Número de teléfono: { cellNumber }</p>
                    <p>Dirección: { deliveryAddress }</p>
                    </Container>

                    <Row xs={1} md={1} className="g-4 mt-5">
                        
                        {products.map((product => (
                            <Col key={product.id}>
                                <ProductCartCard
                                    key={ product.id }
                                    {...product}
                                />
                            </Col>
                        )))}
                    </Row>
                    
                    <Container className="border-top mt-5 flex">
                        <h3 className="text-white mt-3"> Total: {amount} </h3>

                        <Form
                            method="post"
                            action={url}>
                            <input type="hidden" name="token_ws" value={token} />
                            <Button className="green-button" type="submit">Ir a pagar</Button>
                        </Form>
                    </Container>
                </Col>
            </Row>
        </Container>
    )
}
