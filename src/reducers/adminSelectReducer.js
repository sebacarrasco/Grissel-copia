import { types } from "../types/types";

const initialState = {
    state: "",
    deliveryAddress: "",
    email: "",
    rut: "",
    firstName: "",
    lastName: "",
    cellNumber: "",
    products: []
}
export const adminSelectReducer = ( state = initialState, action ) => {
    switch (action.type) {
        case types.adminSelect:
            return {
                ...state,
                ...action.payload
            };
        
        default:
            return state;
    }
}