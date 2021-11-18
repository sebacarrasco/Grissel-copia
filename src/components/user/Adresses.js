import React, { useState, useEffect } from 'react';
import {AddressesTable} from './AddressesTable'
import API from '../../api';
import Button from '../buttons/Boton'
import { useSelector } from 'react-redux';

import {
  Card
} from "react-bootstrap";

export default function Addresses({user}) {

    const[addresses, setAddresses] = useState([])

    useEffect(()=>{
        setAddresses(user.address.addressClient);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        },[])
      
    return (

        <Card >
            <Card.Header>
            <Card.Title as="h4">Direcciones</Card.Title>
            </Card.Header>
            <Card.Body>
    
                <AddressesTable addresses={ addresses }/>

            <Button
                text='Agregar Dirección'
                clase='green-button-xl'
                >
            </Button>
        
            </Card.Body>

        </Card>

    )};