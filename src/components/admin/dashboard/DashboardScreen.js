import React from 'react';
import { BarChartContainer } from './barChart/BarChartContainer';
import { LineChartContainer } from './lineChart/LineChartContainer';
import { TotalIncomeInfo } from './totalIncome/TotalIncomeInfo';
import { PopularProductContainer } from './most_popular_products/PopularProductContainer';

// react-bootstrap components
import {
  Card,
  Container,
  Row,
  Col
} from "react-bootstrap";


export const DashboardScreen = () => {
    return (
        <div className="text-white">
            <Container fluid style={{marginTop:'6rem'}}>
                 <Row>
                    <Col md="1">
                    </Col>
                    <Col md="10">
                        <Card>
                            <Card.Header>
                            <Card.Title as="h4" style={{color:'black'}}>Cantidad vendida a través del tiempo</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <LineChartContainer mode="quantity"/>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md="1">
                    </Col>
                 </Row>
                 <Row style={{marginTop:'1.5rem'}}>
                    <Col md="1">
                    </Col>
                    <Col md="10">
                        <Card>
                            <Card.Header>
                            <Card.Title as="h4" style={{color:'black'}}>Stock de productos a través del tiempo</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <LineChartContainer mode="stock"/>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md="1">
                    </Col>
                 </Row>
                 <Row style={{marginTop:'1.5rem'}}>
                    <Col md="1">
                    </Col>
                    <Col md="5">
                        <Card>
                            <Card.Header>
                            <Card.Title as="h4" style={{color:'black'}}>Porcentaje de ingresos por categoría</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <BarChartContainer/>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md="5">
                    <Card>
                            <Card.Header>
                            <Card.Title as="h4" style={{color:'black'}}>Ingresos totales</Card.Title>
                            </Card.Header>
                            <Card.Body>

                                 <TotalIncomeInfo />
                               
                            </Card.Body>
                        </Card>
                    </Col>
                 </Row>
                 <Row style={{marginTop:'1.5rem'}}>
                    <Col md="1">
                    </Col>
                    <Col md="10">
                        <Card>
                            <Card.Header>
                            <Card.Title as="h4" style={{color:'black'}}>Productos más vendidos</Card.Title>
                            </Card.Header>
                            <Card.Body>

                                <PopularProductContainer></PopularProductContainer>
                                
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md="1">
                    </Col>
                 </Row>
            </Container>

        </div>
    )
}
