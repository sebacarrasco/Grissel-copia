import React from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import { DateRange } from '../DateRange';
import { useSelector } from "react-redux";
import { adminStartLoadTotalIncomeInfo } from '../../../../actions/admin';

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'CLP',
  });

export const TotalIncomeInfo = () => {

    const { localPercent, onlinePercent, totalIncome } = useSelector(state => state.admin.totalIncomeInfo);
    
    return (
        <Container >
            <Row>
                <Col md='1'>
                </Col>
                <Col>
                    <DateRange startLoadAction={ adminStartLoadTotalIncomeInfo }/>
                </Col>
            </Row>
            <Row>
                <Col className="text-center">
                    <Row style={{marginTop:'7rem'}}> 
                    </Row>
                    <Row>
                        <h2 style={{color:'black'}}>{ formatter.format(totalIncome).replaceAll(",", ".") }</h2>
                    </Row>
                    <Row>
                        <Col><p style={{color:'black'}}>Ventas Online: { onlinePercent * 100 }%</p></Col>
                        <Col><p style={{color:'black'}}>Ventas en local: { localPercent * 100 }%</p></Col>
                    </Row>
                    <Row style={{marginTop:'12rem'}}> 
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}
