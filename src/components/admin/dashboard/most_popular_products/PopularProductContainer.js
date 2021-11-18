import React, { useState, useEffect }from 'react';
import { PopularProductTable } from './PopularProductTable';
import { Col, Row, Container } from 'react-bootstrap';
import Select from 'react-select';
import { popularProductsDates } from '../../../../actions/popularProducts';
import { DateRange } from '../DateRange';
import api from '../../../../api';
import { useSelector } from "react-redux";

export const PopularProductContainer = () => {

    const [products, setProducts]= useState([]);
    const [sortby, setSortByFilter]= useState('');
    const [top, setNumberItemsFilter]= useState('');
    const { startDate, endDate } = useSelector(state => state.popularProductsDates);
    const { token } = useSelector(state => state.auth);


    const peticionGet=async()=>{

        let topLabel = ''
        if (top==='Todos los productos')
        {
            topLabel = 'All'
        }
        else
        {
            topLabel= top
        }
        console.log(`topProducts/?top=${topLabel}&orderBy=${sortby}&minDate=${startDate}&maxDate=${endDate}`)
        await api.get(`topProducts/?top=${topLabel}&orderBy=${sortby}&minDate=${startDate}&maxDate=${endDate}`,
        {
            headers: {
                Authorization: `Bearer ${ token }`
            }
        }).then(response=>{
                setProducts(response.data);
            }).catch(error=>{
                console.log(error);
            })
        }
            
    useEffect(()=>{
        peticionGet();
        },[top, sortby, startDate, endDate])


    const handleChangeNumberItems = (event) => {
        setNumberItemsFilter(event.value);
        };

    const handleChangeSortByType = (event) => {
        setSortByFilter(event.value);
        };
        
    return (
       
        <Container fluid>

        <Row style={{marginTop:'1.5rem'}}>

            <Col md = "4">
            </Col>

            <Col md = "4">
                <DateRange  startLoadAction={ popularProductsDates }/>
            </Col>

        </Row>

        <Row style={{marginTop:'1.5rem', color:'black'}}>
                <Col md = "3">
                </Col>
                <Col md = "3">
                    <Select
                    placeholder= {top || 'Seleccione cuantos items quiere  ver'}
                    options = {[{'value': 'Todos los productos', 'label': 'Todos los productos'}, {'value': '5', 'label': '5'},
                    {'value': '10', 'label': '10'}, {'value': '15', 'label': '15'},  {'value': '20', 'label': '20'}]} 
                    value={sortby}
                    onChange={handleChangeNumberItems}
                 />
                 </Col>
  
                <Col md = "3">
                    <Select
                    placeholder= {sortby || 'Ordenar por'}
                    options = {[{'value': 'ganancia', 'label': 'Mayor ganancia'},
                    {'value': 'cantidad', 'label': 'Mayor cantidad'} ]} 
                    value={sortby}
                    onChange={handleChangeSortByType}
                 />
                 </Col>
  
        </Row>
        <Row style={{marginTop:'1.5rem'}}>
     
            <PopularProductTable products ={products}></PopularProductTable>

        </Row>
    </Container>
    )
}


