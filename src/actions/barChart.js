import api from "../api";
import { types } from "../types/types";

export const startLoadCategories = (startDate, endDate) => {
    return async(dispatch, getState) => {
        try
        {
            const { token } = getState().auth;
            const { data } = await api.get(`earnings/?minDate=${ startDate }&maxDate=${ endDate }`,
            {
                headers: {
                    Authorization: `Bearer ${ token }`
                }
            });
            dispatch(barChartLoadCategories(data));
        }
        catch (error)
        {
            console.log(error)
        }
    }
};

export const barChartLoadCategories = (data) => ({
    type: types.barChartLoadCategories,
    payload: data
}); 

export const barChartChangeMode = (mode) => ({
    type: types.barChartChangeMode,
    payload: mode
});