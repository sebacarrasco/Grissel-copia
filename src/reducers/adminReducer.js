import { types } from "../types/types";

const initialState = {
    productSelected: { },
    mode: "",
    totalIncomeInfo: { 
        localPercent: 0,
        onlinePercent: 0,
        totalIncome: 0
    }
}

export const adminReducer = ( state = initialState, action ) => {
    switch (action.type) {
        case types.adminSelectProductEdit:
            return {
                ...state,
                productSelected: { ...action.payload },
                mode: "edit"
            };
        case types.adminSelectProductStock:
            return {
                ...state,
                productSelected: { ...action.payload },
                mode: "stock"
            };
        case types.adminSelectProductCreate:
            return {
                ...state,
                productSelected: null,
                mode: "create"
            };
        
        case types.adminUnselectProduct:
            return{
                ...state,
                productSelected: null
            }
        
        case types.adminSelectOfferEdit:
            return {
                ...state,
                productSelected: { ...action.payload },
                mode: "editOffer"
            };

        case types.adminSelectOfferCreate:
            return {
                ...state,
                productSelected: null,
                mode: "createOffer"
            };
    
        case types.adminUnselectOffer:
            return{
                ...state,
                productSelected: null
            }
        
        case types.adminLoadTotalIncomeInfo:
            const {
                porcentajeLocal:localPercent,
                porcentajeOnline:onlinePercent,
                ingresosTotales:totalIncome
            } = action.payload;
            return {
                ...state,
                totalIncomeInfo: {
                    localPercent,
                    onlinePercent,
                    totalIncome
                }
            }
        
        default:
            return state;
    }
}