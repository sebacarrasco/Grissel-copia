import { types } from "../types/types";

const initialState = {
    deliveryAddress: "",
    email: "",
    rut: "",
    firstName: "",
    lastName: "",
    cellNumber: "",
}
export const checkoutReducer = ( state = initialState, action ) => {
    switch (action.type) {
        case types.checkoutSave:
            return {
                ...state,
                ...action.payload
            };
        
        case types.checkoutClear:
            return { 
                ...initialState
             };
    
        default:
            return state;
    }
}