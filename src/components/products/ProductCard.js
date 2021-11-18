import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../actions/cart';
import './products.css';
import Swal from 'sweetalert2';
import useMediaQuery from '../../useMediaQuery';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import {
   Button
  } from "react-bootstrap";

export const ProductCard = ({ id, prodName, category, price, image }) => {

    const dispatch = useDispatch();

    const [quantity, setQuantity] = useState(1);

    const web = useMediaQuery("(min-width: 600px)");

    const handleAdd = () => {
        setQuantity(a => a + 1);
    }

    const handleSubtract = () => {
        setQuantity(a => a > 1 ? a - 1 : 1);
    }

    const handleAddToCart = () => {
        dispatch(addProduct({ id, prodName, price, image }, quantity));
        web ? (Swal.fire({
            position:'bottom',
            text: 'Agregado al carrito',
            showConfirmButton: false,
            timer: 1000
        }))
        :
        (Swal.fire({
          position:'top',
          text: 'Agregado al carrito',
          showConfirmButton: false,
          timer: 1000
        }))
        setQuantity(1);
    }

    let cardClass = "vertical-card";

    return (
        <Card
            className={`m-1 text-center ${ cardClass }`}
            style={{ width: '17rem' }}
        >
            <Card.Img
                variant="top"
                src={ `${ image }` }
                alt={ prodName }
                className="w-auto mt-2 image-product-card"
            />
            <Card.Body className="mb-0">
                <Card.Text className="h6 text-nowrap text-truncate">{ prodName }</Card.Text>
                <Card.Text className="h6"> { `$${price}` } </Card.Text>
                <Card.Text className="text-nowrap text-truncate"> { category } </Card.Text>
            </Card.Body>
            <Card.Footer>
                <ButtonToolbar>
                    <ButtonGroup className="m-auto" aria-label="First group">
                        <Button
                            className="grey-button"
                            onClick={ handleSubtract }  
                        >-</Button> 
                        <Button className="light-grey-button">{ quantity }</Button> 
                        <Button
                            className="grey-button"
                            onClick={ handleAdd }
                        >+</Button>
                    </ButtonGroup>
                    <ButtonGroup className="me-2" aria-label="Second group">
                        <Button 
                        onClick={ handleAddToCart }
                        disabled={ quantity === 0 }
                        className="green-button">
                            <FaIcons.FaCartPlus size={18} className="m-1" color="black"/>
                            Agregar
                        </Button>
                    </ButtonGroup>
                </ButtonToolbar>
            </Card.Footer>
        </Card>
    )
}

ProductCard.propTypes = {
    id: PropTypes.number.isRequired,
    prodName: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
  };