import { types } from "../types/types";

const initialState = {
    products: []
}

export const searchReducer = ( state = initialState, action ) => {
    switch (action.type) {
        case types.searchProducts:
            return {
                products: action.payload.products
            };
    
        default:
            return state;
    }
}