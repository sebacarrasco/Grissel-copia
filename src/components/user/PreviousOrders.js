import React, { useState, useEffect } from 'react';
import {DealTable} from './PreviousOrdersDealTable'
import API from '../../api';
import { useSelector } from 'react-redux';

import {
  Card
} from "react-bootstrap";

export default function PreviousOrders({id}) {

    const [deals, setDeals]= useState([]);

    const dealsGet=async()=>{
        console.log(id)
        await API.get(`deals`)
            .then(response=>{
                setDeals(response.data.filter(d => d.buyerId === id));
            }).catch(error=>{
                console.log(error);
            })
        }

    useEffect(()=>{
        dealsGet();
        // eslint-disable-next-line react-hooks/exhaustive-deps
        },[id])
      
    return (

        <Card >
            <Card.Header>
            <Card.Title as="h4">Pedidos Anteriores</Card.Title>
            </Card.Header>
            <Card.Body>
    
                <DealTable deals={ deals }/>
        
            </Card.Body>
        </Card>

    )};