import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeCartModal } from '../../actions/ui';
import { ProductCartCard } from './ProductCartCard';
import './cart.css';
import '../products/products.css';
import { cleanCart } from '../../actions/cart';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import useMediaQuery from '../../useMediaQuery';
import Modal from 'react-bootstrap/Modal'


export const CartModal = () => {

    const web = useMediaQuery("(min-width: 600px)");

    const { cartOpen } = useSelector(state => state.ui);
    const { products } = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const history = useHistory();
    
    let totalPrice = 0;
    products.forEach(product => {
        totalPrice += product.quantity * product.price
    });

    const closeModal = () => {
        dispatch(closeCartModal());
    }

    const handleClean = () => {
        Swal.fire({
            title: `Seguro que quieres vaciar el carrito?`,
            text: "No podrás revertir este cambio",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
                dispatch(cleanCart());
            }
          })
    }

    const handleGoToPay = () => {
        closeModal();
        history.push("/delivery-form");
    }

    return (
        <Modal show={cartOpen} onHide={closeModal} scrollable={true} centered>
            <Modal.Header closeButton>
                <Modal.Title>Carrito</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            {
                products.length > 0
                ? 
                products.map(product =>
                    (
                        <ProductCartCard
                            key={ product.id }
                            {...product}
                        />
                    )
                )
                :
                <div className="empty-text-div mt-3">
                    <p>Tu carrito está vacío</p>
                    <span className="mt-2 mr-4">
                        <i className="fas fa-shopping-cart fa-6x"></i>
                    </span>
                </div>
                }

                
            </Modal.Body>
            <Modal.Footer>
            {
                    products.length > 0
                    ? 
                    <div className="bottom-buttons-column w-50">
                        <button
                            className="btn rounded-border green-button"
                            onClick={ handleGoToPay }
                        >
                                Ir a pagar ${ totalPrice }
                        </button>
                        <button
                            className="btn rounded-border red-button my-2 px-4"
                            onClick={ handleClean }
                        >
                            Vaciar Carrito
                        </button>
                    </div>
                    :
                    null
                }
            </Modal.Footer>
        </Modal>
    )
}