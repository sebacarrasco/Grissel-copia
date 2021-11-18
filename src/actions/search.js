import { types } from "../types/types";

export const showSearch = (products) => ({
    // el type 
    type: types.searchProducts,
    payload: {
        products
    }
});
