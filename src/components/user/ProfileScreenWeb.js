import React from 'react'
import Badge from 'react-bootstrap/Badge'
import Figure from 'react-bootstrap/Figure'
import Config from './Config'
import PreviousOrders from './PreviousOrders'
import './ProfileScreen.css'
import {GoBackButton} from '../buttons/GoBackButton'
import Addresses from './Adresses'

// react-bootstrap components
import {
  // Button,
  Card,
  Container,
  Row,
  Col,
} from "react-bootstrap";


export const ProfileScreenWeb = ({user, id}) => {


  return (
    <div className= 'down'>  
      <GoBackButton />
      <Container fluid style={{marginTop:'2rem'}}>
        <Row>
        <Col md="2">
        </Col>
        <Col md="2">
            <Card className="card-user" style={{height:'100%'}}>
              <Card.Body>
              <div className='user-web'>
                <Figure>
                <Figure.Image
                    width={200}
                    height={300}
                    alt="171x180"
                    src="/bitmoji.png"
                />
                </Figure>
                <h4>{user.firstName} {user.lastName}</h4>
                <h5>{user.email}</h5>
                <h6>Puntos Acumulados<Badge bg="success">{user.points}</Badge></h6>
               </div>           
              </Card.Body>
            </Card>
          </Col>
          <Col md="6">
            <Config user={user}/>
          </Col>
          <Col md="1">
        </Col>
        </Row>
        <Row style={{marginTop:'1.5rem'}}>
          <Col md="2">
          </Col>
          <Col md="8">
            <Addresses user={user}/>
          </Col>
        </Row>
        <Row style={{marginTop:'1.5rem'}}>
          <Col md="2">
          </Col>
          <Col md="8">
            <PreviousOrders id={id}/>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
