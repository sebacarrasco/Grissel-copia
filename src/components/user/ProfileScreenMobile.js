import {React, useState} from 'react';
import ListGroup from 'react-bootstrap/ListGroup'
import Badge from 'react-bootstrap/Badge'
import Figure from 'react-bootstrap/Figure'
import * as FaIcons from 'react-icons/fa';
import Config from './Config'
import './ProfileScreen.css'
import PreviousOrders from './PreviousOrders';
import {
    Modal, 
    Card
  } from "react-bootstrap";
import Addresses from './Adresses';



export default function ProfileScreenMobile({user, id}) {

    const [showAddress, setShowAddress] = useState(false);
    const [show, setShow] = useState(false);
    const [showPedidos, setShowPedidos] = useState(false);

    function handleShowAddress() {
        console.log(user.address.addressClient)
        setShowAddress(true);
    }

    function handleShow() {
        setShow(true);
    }

    function handleShowPedidos() {
        setShowPedidos(true);
    }

    return (
    <div>
        <div className='user'>
            <Figure>
            <Figure.Image
                width={141}
                height={150}
                alt="171x180"
                src="/bitmoji.png"
            />
            </Figure>
            <h1>{user.firstName} {user.lastName}</h1>
            <h3>{user.email}</h3>
            <h6>Puntos Acumulados<Badge bg="success">{user.points}</Badge></h6>
            
        </div>

        <div className='options'>
        <ListGroup>
            <ListGroup.Item variant="secondary" action href="#link1" onClick={() => handleShowAddress()}>
                <FaIcons.FaMapMarkedAlt size={20} color="white"/> Direcciones
            </ListGroup.Item>
            <ListGroup.Item variant="secondary" action href="" onClick={() => handleShowPedidos()}>
                <FaIcons.FaClipboardList size={20} color="white"/> Pedidos Anteriores
            </ListGroup.Item>
            <ListGroup.Item variant="secondary" action href="" onClick={() => handleShow()}>
            <FaIcons.FaWrench size={20} color="white"/> Configuración
            </ListGroup.Item>
        </ListGroup>
        </div>

        <Modal show={showAddress} onHide={() => setShowAddress(false)} fullscreen='sm-down' animation={true}>
          <Modal.Header closeButton>Mis direcciones</Modal.Header>
          <Modal.Body>
            
            {/* {user.address.addressClient.map((a, idx)=> (
            <Card key={idx}>
               <Card.Body>
               <FaIcons.FaMapPin size={15} /> 
                {a.street + " " + a.numHome + ', ' + a.commune}
               </Card.Body>
           </Card>
          ))}
           */}
          <Addresses user={user}/>
          </Modal.Body>
        </Modal>

        <Modal show={show} onHide={() => setShow(false)} fullscreen='sm-down' animation={true}>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body><Config user={user}/></Modal.Body>
        </Modal>
        
        <Modal show={showPedidos} onHide={() => setShowPedidos(false)} fullscreen='sm-down' animation={true}>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body><PreviousOrders id={id}/></Modal.Body>
        </Modal>
    </div>

    )
};

