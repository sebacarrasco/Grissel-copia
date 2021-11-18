import { types } from "../types/types";

const initialState = {
    endDate: "",
    startDate: "",
}

export const popularProductsReducer = ( state = initialState, action ) => {
    switch (action.type) {

        case types.popularProductsDates:
            return {
                ...state,
                startDate: action.payload.startDate,
                endDate: action.payload.endDate
            }

        default:
            return state;
    }
}