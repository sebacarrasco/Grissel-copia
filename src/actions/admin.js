import api from "../api";
import { types } from "../types/types";

export const adminSelectProductEdit = (product) => ({
    type: types.adminSelectProductEdit,
    payload: {
        ...product
    }
});

export const adminSelectProductStock = (product) => ({
    type: types.adminSelectProductStock,
    payload: {
        ...product
    }
});

export const adminSelectProductCreate = () => ({
    type: types.adminSelectProductCreate
});

export const adminUnselectProduct = () => ({
    type: types.adminUnselectProduct
});

export const adminSaleSelectEdit = (product) => ({
    type: types.adminSaleSelectEdit,
    payload: {
        ...product
    }
});

export const adminSaleSelectCreate = () => ({
    type: types.adminSaleSelectCreate
});

export const adminPackSelectCreate = () => ({
    type: types.adminPackSelectCreate
});

export const adminPackSelectEdit = (pack) => ({
    type: types.adminPackSelectEdit,
    payload: {
        ...pack
    }
});

export const adminSaleUnselect = () => ({
    type: types.adminSaleUnselect
});

export const adminSelect= (info) => ({
    type: types.adminSelect,
    payload: info,
});

export const adminSelectOfferEdit = (discount) => ({
    type: types.adminSelectOfferEdit,
    payload: {
        ...discount
    }
});

export const adminSelectOfferCreate = () => ({
    type: types.adminSelectOfferCreate
});

export const adminUnselectOffer = () => ({
    type: types.adminUnselectOffer
});


export const adminStartLoadTotalIncomeInfo = (startDate, endDate) => {
    return async(dispatch, getState) => {
        try {
            const { token } = getState().auth;
            const { data } = await api.get(`dealStatistics/?minDate=${ startDate }&maxDate=05-09-2021`,  {
                headers: {
                    Authorization: `Bearer ${ token }`
                }
            });
            dispatch(adminLoadTotalIncomeInfo(data));
        }
        catch (e) {
            console.log(e);
        } 
    }
}

export const adminLoadTotalIncomeInfo = (data) => ({
    type: types.adminLoadTotalIncomeInfo,
    payload: data
});