import api from "../api";
import { types } from "../types/types";

export const startUpdateData = (action, mode) => {
    return async(dispatch, getState) => {
        
        if (action.action === "select-option")
        {
            try
            {
                const { data } = await api.get(`products/${action.option.value}`);
                dispatch(lineChartAddProduct(data, mode));
            }
            catch (error)
            {
                console.log(error)
            }
        }
        else if (action.action === "remove-value")
        {
            dispatch(lineChartRemoveProduct(action.removedValue.value, mode));
        }
        else if (action.action === "clear")
        {
            dispatch(lineChartClearProducts(mode));
        }
    }
};

export const lineChartAddProduct = (product, mode) => ({
    type: types.lineChartAddProduct,
    payload: {
        ...product,
        mode
    }
});

export const lineChartRemoveProduct = (id, mode) => ({
    type: types.lineChartRemoveProduct,
    payload: {
        id,
        mode
    }
});

export const lineChartClearProducts = (mode) => ({
    type: types.lineChartClearProducts,
    payload: mode
});