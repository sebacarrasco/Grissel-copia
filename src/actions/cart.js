import { types } from '../types/types';

export const addProduct = ({ id, prodName, price, image }, quantity) => ({
    type: types.addProduct,
    payload: {
        id,
        prodName,
        price,
        quantity,
        image
    }
});

export const removeProduct = (id) => ({
    type: types.removeProduct,
    payload: id
});

export const editProductQuantity = (id, quantity) => ({
    type: types.editProductQuantity,
    payload: {
        id,
        quantity
    }
})

export const cleanCart = () => ({
    type: types.cleanCart
});