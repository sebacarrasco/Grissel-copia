import { types } from "../types/types";

/*
cuando el usuario no está autenticado -> {}

en caso contrario:
{
    id,
    currentUser: {
        firstName,
        ...
    }
    expDate: 12345678
}
*/
export const authReducer = ( state = {}, action ) => {
    switch (action.type) {
        case types.login:
            return {
                ...action.payload
            };
        
        case types.logout:
            return { };
    
        default:
            return state;
    }
}