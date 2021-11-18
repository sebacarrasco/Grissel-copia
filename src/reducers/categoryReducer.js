import { types } from "../types/types";

const initialState = {
    category: "",
    products: []
}

export const categoryReducer = ( state = initialState, action ) => {
    switch (action.type) {
        case types.category:
            return {
                category:  action.payload.category,
                products: action.payload.products
            };
    
        default:
            return state;
    }
}