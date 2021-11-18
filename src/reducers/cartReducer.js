import { types } from "../types/types";

/* {
    products: [ { 
        id,
        name,
        price,
        quantity,
     }],
    packs: [{
        packid,
        name,
        price,
        quantity
    }]
} */

const initialState = {
    products: [],
    packs: [],
    totalItems: 0
}

export const cartReducer = ( state = initialState, action ) => {
    switch (action.type) {
        case types.addProduct:
            // Si es que el producto ya estaba en el carro se suman las cantidades
            if (state.products.filter(product => product.id === action.payload.id).length > 0)
            {
                return {
                    ...state,
                    products: state.products.map(
                        product => product.id === action.payload.id ?
                        {
                            ...product,
                            quantity: product.quantity + action.payload.quantity
                        }
                        :
                        product
                    ),
                    totalItems: state.totalItems + action.payload.quantity
                };
            }
            // Si el producto no estaba en carro simplemente se agrega
            return {
                ...state,
                products: [
                    ...state.products,
                    { ...action.payload }
                ],
                totalItems: state.totalItems + action.payload.quantity
            };
        
        case types.editProductQuantity:
            const previousQuantity = state.products.filter(
                product => product.id === action.payload.id
            )[0].quantity;
            return {
                ...state,
                totalItems:
                    state.totalItems - previousQuantity + action.payload.quantity,
                products: state.products.map(
                        product => product.id === action.payload.id ?
                        {
                            ...product,
                            quantity: action.payload.quantity
                        }
                        :
                        product
                    )
            }
        
        case types.removeProduct:
            const preQuantity = state.products.filter(
                product => product.id === action.payload
            )[0].quantity;
            return {
                ...state,
                products: state.products.filter(
                    product => product.id !== action.payload
                ),
                totalItems: state.totalItems - preQuantity
            };
    
        case types.cleanCart:
            return {
                ...state,
                products: [],
                packs: [],
                totalItems: 0
            };

        default:
            return state;
    }
}