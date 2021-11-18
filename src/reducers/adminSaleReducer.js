import { types } from "../types/types";

const initialState = {
    saleSelected: { },
    mode: ""
}

export const adminSaleReducer = ( state = initialState, action ) => {
    switch (action.type) {
        case types.adminSaleSelectEdit:
            return {
                ...state,
                saleSelected: { ...action.payload },
                mode: "editDeal"
            };
        case types.adminSaleSelectCreate:
            return {
                ...state,
                saleSelected: null,
                mode: "createDeal"
            };
        
        case types.adminSaleUnselect:
            return{
                ...state,
                saleSelected: null
            }
        
        default:
            return state;
    }
}