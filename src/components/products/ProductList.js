import React from 'react';
import { ProductCard } from './ProductCard';
import PropTypes from 'prop-types';
import './products.css';

import {
    Row,
    Col,
  } from "react-bootstrap";

export const ProductList = ({ products }) => {

    return (
        <div className='together'>
        <Row xs={1} sm={2} md={3} lg={4}>
            {products.map((product) => (
                <Col className='center' key={ product.id }>
                    <ProductCard
                        {...product}
                    />
                </Col>
            ))}
        </Row>
        </div>
    )
}

ProductList.propTypes = {
    title: PropTypes.string.isRequired,
    products: PropTypes.array.isRequired
};