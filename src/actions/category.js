import { types } from "../types/types";

export const showCategory = (category) => ({
    // el type 
    type: types.category,
    payload: {
        category
    }

});
