import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { editProductQuantity, removeProduct } from '../../actions/cart';
import '../products/products.css';

export const ProductCartCard = ({ id, prodName, price, quantity, image }) => {

    const [editMode, setEditMode] = useState(false);
    const [newQuantity, setNewQuantity] = useState(quantity);

    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(removeProduct(id));
    }

    const handleEdit = () => {
        setEditMode(true);
    }

    const handleAdd = () => {
        setNewQuantity(q => q + 1);
    }
    
    const handleSubtract = () => {
        if (newQuantity > 1)
        {
            setNewQuantity(q => q - 1);
        }
    }

    const handleSave = () => {
        dispatch(editProductQuantity(id, newQuantity));
        setEditMode(false);
    }

    return (
        <Card
            className={`m-2 rounded-border pb-2`}
        >
            <div className="row-div">
                <div className="picture-column">
                    <Card.Img
                        variant="top"
                        // src="https://alcoholadomicilio.cl/wp-content/uploads/2019/06/promo-alto-litro-min.jpg"
                        src={ `${ image }` }
                        alt={ prodName }
                        className="rounded-border mt-2 ml-1 image-product-cart-card pr-2"
                    />
                </div>
                <div className="text-column">
                    <Card.Body className="p-0">
                        <p className="font-small text-nowrap text-truncate">{ prodName }</p>
                        <p className="font-small"> { `$${ price } x ${ newQuantity } unidades` } </p>
                    </Card.Body>
                </div>
                {
                    editMode
                    ?
                    null
                    :
                    <div className="buttons-column">
                        <button
                            className="btn rounded-border row-div green-button button-action w-75"
                            onClick={ handleEdit }
                        >
                                <i className="fas fa-pen"></i>
                        </button>
                        <button
                            className="btn rounded-border row-div red-button mt-2 button-action w-75"
                            onClick={ handleDelete }
                        >
                                <i className="fas fa-trash-alt"></i>
                        </button>
                    </div>
                }
            </div>
            {
                editMode
                ?
                <div className="edit-buttons-container mb-2">
                    <div
                        className={`py-1 mb-1 background-gray rounded-border w-50`}
                    >
                        <div className="d-flex flex-row justify-content-around">
                            <div className="d-flex flex-column">
                                <button
                                    type="button"
                                    className="btn btn-sm rounded-circle"
                                    onClick={ handleSubtract }    
                                >
                                    <i className="fas fa-minus"></i>
                                </button>
                            </div>
                            <div className="mt-1 d-flex flex-column w-25 text-center">
                                { newQuantity }
                            </div>
                            <div className="d-flex flex-column">
                                <button
                                    type="button"
                                    className="btn btn-sm rounded-circle"
                                    onClick={ handleAdd }
                                >
                                    <i className="fas fa-plus"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <button
                        className="btn col d-flex justify-content-around py-1 green-button rounded-border w-50"
                        onClick={ handleSave }
                    >
                        Guardar cambios
                    </button>
                </div>
                :
                null
            }
        </Card>
    )
}

ProductCartCard.propTypes = {
    id: PropTypes.number.isRequired,
    prodName: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  };