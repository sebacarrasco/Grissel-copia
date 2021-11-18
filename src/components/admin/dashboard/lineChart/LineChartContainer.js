import React from 'react';
import { useSelector } from 'react-redux';
import { LineChart } from './LineChart';
import { ProductSelector } from './ProductSelector';
import { Col, Row, Container } from 'react-bootstrap';
import 'animate.css';
import PropTypes from 'prop-types';

export const LineChartContainer = ({ mode }) => {

    const { data } = useSelector(state => state.lineChart[mode]);
    
    return (
        <Container>
            <Row>
            <Col >
                {/* <Row>
                    <h3 className="ms-5">{ mode === "quantity" ? "Cantidad vendida vs tiempo" : "Stock vs tiempo"}</h3>
                </Row> */}
                <Row>
                    <LineChart mode={ mode }/>
                </Row>
            </Col>
            <Col >
                <Row>
                    <ProductSelector mode={ mode }/>
                </Row>
                <Row className="px-5">
                    {
                        data.map(d=> 
                            <div
                                key={ d.id }
                                className="rounded p-2 mt-2 animate__animated animate__lightSpeedInLeft"
                                style={{backgroundColor: d.color}}
                            >
                                { d.prodName }
                            </div>
                        )
                    }
                </Row>
            </Col>
            </Row>
        </Container>
    )
}

LineChartContainer.propTypes = {
    mode: PropTypes.oneOf(['stock', 'quantity'])
};