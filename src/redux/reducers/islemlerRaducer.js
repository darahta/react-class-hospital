import actionTypes from "../actions/actionTypes";

const initialState = {
   start: false,
   success: false,
   islemler: [],
   fail: false,
   error: "",
};

const islemlerReducer = (state = initialState, action) => {
   switch (action.type) {
      case actionTypes.FETCH_ISLEMLER_START:
         return {
            ...state,
            start: true,
         };
      case actionTypes.FETCH_ISLEMLER_SUCCESS:
         return {
            ...state,
            start: false,
            fail: false,
            error: "",
            success: true,
            islemler: action.payload,
         };
      case actionTypes.FETCH_ISLEMLER_FAIL:
         return {
            ...state,
            start: false,
            success: false,
            fail: true,
            error: action.payload,
         };
      case actionTypes.ADD_ISLEM:
         return {
            ...state,
            islemler: [action.payload, ...state.islemler],
         };
      case actionTypes.DELETE_ISLEM:
         const filteredIslemlerDelete = state.islemler.filter(
            (item) => item.id !== action.playload
         );
         return {
            ...state,
            islemler: filteredIslemlerDelete,
         };

      default:
         return state;
   }
};

export default islemlerReducer;
