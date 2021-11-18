import { types } from "../types/types";

export const checkoutSave = (checkoutData) => ({
    type: types.checkoutSave,
    payload: checkoutData
});

export const checkoutClear = (checkoutData) => ({
    type: types.checkoutClear
});