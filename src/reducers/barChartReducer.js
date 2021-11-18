import { types } from "../types/types";

const initialState = {
    percentages: [],
    earnings: [],
    mode: "percentages"
}

export const barChartReducer = ( state = initialState, action ) => {
    switch (action.type) {

        case types.barChartLoadCategories:
            return {
                ...state,
                percentages: Object.keys(action.payload.categoryPercents).map(c => ({
                    category: c,
                    quantity: action.payload.categoryPercents[c]
                })),
                earnings: Object.keys(action.payload.earnings).map(c => ({
                    category: c,
                    quantity: action.payload.earnings[c]
                })),
            }
        
        case types.barChartChangeMode:
            return {
                ...state,
                mode: action.payload
            }

        default:
            return state;
    }
}
