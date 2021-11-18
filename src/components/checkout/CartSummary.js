import React from 'react';
import {useSelector } from 'react-redux';
import {Container, Row, Col, Card} from 'react-bootstrap'

export const CartSummary = () => {
    const { products } = useSelector(state => state.cart);
    
    let numberProducts = 0;
    let totalPrice = 0;
    products.forEach(product => {
        numberProducts += product.quantity;
        totalPrice += product.quantity * product.price;
    });

    return (
        <div>
            <Container className="side" fluid style={{ paddingLeft: 0, paddingRight: 0, float: 'right' }}>

            <Row xs={1} md={1}>
                <Col md={{ span: 4, offset: 8 }}  className='grey-col'>
                    <h5 style={{ marginTop: '1rem' }}>Resumen de la compra</h5>
                    <h7>({
                        numberProducts > 1 ? 
                        (numberProducts + ' productos')
                        :
                        (numberProducts + ' producto' )
                        })</h7>
                    {products.map((product => (
                        <Card style={{ width: '100%', marginTop: '0.2rem', marginBottom: '0.2rem'}}>
                            <Card.Img src={product.image} style={{ width: '20%'}}/>
                            <Card.Body>
                              <Card.Title>{product.prodName}</Card.Title>
                              <Card.Text>
                                {product.quantity > 1 ?
                                (product.quantity + ' unidades') :
                                (product.quantity + ' unidad')
                                }
                                <h7 className="align-right">${product.quantity * product.price}</h7> 
                              </Card.Text>
                              {/* <Card.Text> $ {product.price * product.quantity} </Card.Text> */}
                            </Card.Body>
                        </Card>
                    )))}
                
                <div style={{marginTop:'1rem'}}>
                    <h7>Total: <h7 className="align-right">${totalPrice}</h7></h7>
                </div>
                <button
                    style={{width:'60%'}}
                    className="btn rounded-border green-button center"
                     >
                        Ir a pagar
                </button>
                </Col>
            </Row>
            </Container>
        </div>
        
        
    )}