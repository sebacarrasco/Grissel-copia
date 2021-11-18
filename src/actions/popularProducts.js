import api from "../api";
import { types } from "../types/types";


// export const LoadPopularProductsDates = (startDate, endDate) => {
//     return async(dispatch, getState) => {

//             dispatch(popularProductsDates(startDate, endDate));
  
//     }
// };

export const popularProductsDates = (startDate, endDate) => ({
    type: types.popularProductsDates,
    payload: {
        startDate,
        endDate
    }
}); 

