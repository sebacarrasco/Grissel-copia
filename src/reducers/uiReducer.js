import { types } from "../types/types";

const initialState = {
    cartOpen: false,
    adminModalOpen: false,
    adminSaleModalOpen: false,
    navbarOpen: false,
    modalAgeOpen: true
}

export const uiReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.openCartModal:
            return {
                ...state,
                cartOpen: true
            }

        case types.closeCartModal:
            return {
                ...state,
                cartOpen: false
            }

        case types.openAdminModal:
            return {
                ...state,
                adminModalOpen: true
            }

        case types.closeAdminModal:
            return {
                ...state,
                adminModalOpen: false
            }
        case types.openAdminSaleModal:
            return {
                ...state,
                adminSaleModalOpen: true
            }
    
        case types.closeAdminSaleModal:
            return {
                ...state,
                adminSaleModalOpen: false
            }
        case types.openAdminSupplierModal:
            return {
                ...state,
                adminSupplierModalOpen: true
            }
    
        case types.closeAdminSupplierModal:
            return {
                ...state,
                adminSupplierModalOpen: false
            }
        
        case types.toggleSidebar:
            return {
                ...state,
                openSidebar: !state.openSidebar
            }

        case types.openModalAge:
            return{
                ...state,
                modalAgeOpen: true
            }
        
        case types.closeModalAge:
            return{
                ...state,
                modalAgeOpen: false
            }    

        case types.openAdminOffersModal:
            return {
                ...state,
                adminOffersModalOpen: true
            }

        case types.closeAdminOffersModal:
            return {
                ...state,
                adminOffersModalOpen: false
            }
            
        default:
            return state;
    }

}