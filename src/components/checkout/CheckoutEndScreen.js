import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cleanCart } from '../../actions/cart';
import api from '../../api';

export const CheckoutEndScreen = ({ history }) => {

    const { firstName, lastName, rut, email, cellNumber, deliveryAddress } = useSelector(state => state.checkout);
    const { products } = useSelector(state => state.cart);
    
    const dispatch = useDispatch();

    const handleGoToHome = () => {
        history.push("/");
    }

    const registerDeal = () => {
        api.post("unregistered/deals", {
            deliveryAddress,
            email,
            rut,
            firstName,
            lastName,
            cellNumber,
            items: products.map(product => ({
                id: product.id,
                quantity: product.quantity
            }))
        })
        .then(response => {
            dispatch(cleanCart());
            history.push("/checkout-end");
        })
    }

    return (
        <div className="text-white text-center" style={{marginTop: "6rem"}} onLoad={registerDeal}>
            <h2>Listo!</h2>
            <h4>Tu pedido ha sido registrado</h4>

            <div className="bottom-buttons-column mt-5">
                <button
                    className="btn rounded-border green-button w-100"
                    onClick={ handleGoToHome }
                >
                        Volver a la página de inicio
                </button>
            </div>
        </div>
    )
}
