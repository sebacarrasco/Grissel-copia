import { types } from "../types/types";

const initialState = {
    packSelected: { },
    mode: ""
}

export const adminPackReducer = ( state = initialState, action ) => {
    switch (action.type) {
        case types.adminPackSelectCreate:
            return {
                ...state,
                packSelected: null,
                mode: "createPack"
            };
        case types.adminPackSelectEdit:
            return {
                ...state,
                packSelected: { ...action.payload },
                mode: "editPack"
            };
            default:
            return state;
    }
}