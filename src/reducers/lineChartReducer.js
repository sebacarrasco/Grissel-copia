import { types } from "../types/types";
import * as d3 from 'd3';


const colormap = ["red", "green", "#6EE7F8", "goldenrod", "magenta"]

const initialState = {
    quantity: {
        data: [],
        colorsAvailable: colormap
    },
    stock: {
        data: [],
        colorsAvailable: colormap
    },
}

export const lineChartReducer = ( state = initialState, action ) => {
    switch (action.type) {
        case types.lineChartAddProduct:
            let lastValue = Math.random() * 100 + 70;
            const datum = d3.range(52).map((_, i) => {
                lastValue += (Math.random() - 0.5) * 10;
                return { date: (i + 1) * 1000000000, quantity: lastValue };
            });
            return {
                ...state,
                [action.payload.mode]: {
                    ...state[action.payload.mode],
                    data: [...state[action.payload.mode].data, 
                        { 
                            id: action.payload.id, 
                            history: datum, 
                            color: state[action.payload.mode].colorsAvailable[0],
                            prodName: action.payload.prodName
                        },
                    ],
                    colorsAvailable: state[action.payload.mode].colorsAvailable.filter(c => c !== state[action.payload.mode].colorsAvailable[0])
                }
            }
        
        case types.lineChartRemoveProduct:
            return {
                ...state,
                [action.payload.mode]: {
                    ...state[action.payload.mode],
                    data: state[action.payload.mode].data.filter(p => p.id !== action.payload.id),
                    colorsAvailable: [
                        ...state[action.payload.mode].colorsAvailable,
                        state[action.payload.mode].data.filter(p => p.id === action.payload.id)[0].color
                    ]
                }
            }
        
        case types.lineChartClearProducts:
            return {
                ...state,
                [action.payload]: {
                    data: [],
                    colorsAvailable: [...colormap]
                }
            }
        
        default:
            return state;
    }
}