import React from 'react';
import { BarChart } from './BarChart';
import { DateRange } from '../DateRange';
import { Col, Row, Container, Form } from 'react-bootstrap';
import { barChartChangeMode, startLoadCategories } from '../../../../actions/barChart';
import { useDispatch } from 'react-redux';
import Select from 'react-select';

export const BarChartContainer = () => {

    const dispatch = useDispatch();

    const handleInputChange = (e) => {
        dispatch(barChartChangeMode(e.value))
    }
    return (
        <Container fluid>
            <Row >
                <Col>
                    <DateRange startLoadAction={ startLoadCategories }/>
                </Col>
            </Row>
            <Row style={{marginTop:'1.5rem',width:'85%', color:'black'}}>
                <Col >
                <Select 
                    aria-label="Default select example"
                    onChange={ handleInputChange }
                    options ={[{value:"percentages", label: 'Percentages'}, {value:"earnings", label: 'Total'}]}
                />
       
                </Col>
            </Row>
            <Row>
                <BarChart />
            </Row>
        </Container>
    )
}


