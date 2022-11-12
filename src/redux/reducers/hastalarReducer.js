import actionTypes from "../actions/actionTypes";

const initialState = {
   start: false,
   success: false,
   hastalar: [],
   fail: false,
   error: "",
};

const hastalarReducer = (state = initialState, action) => {
   switch (action.type) {
      case actionTypes.FETCH_HASTALAR_START:
         return {
            ...state,
            start: true,
         };
      case actionTypes.FETCH_HASTALAR_SUCCESS:
         return {
            ...state,
            start: false,
            fail: false,
            error: "",
            success: true,
            hastalar: action.payload,
         };

      case actionTypes.FETCH_HASTALAR_FAIL:
         return {
            ...state,
            start: false,
            success: false,
            fail: true,
            error: action.payload,
         };
      case actionTypes.ADD_HASTA:
         return {
            ...state,
            hastalar: [action.payload, ...state.hastalar],
         };
      case actionTypes.EDIT_HASTA:
         const filteredHastalar = state.hastalar.filter(
            (item) => item.id !== action.payload.id
         );
         return {
            ...state,
            hastalar: [action.payload, ...filteredHastalar],
         };
      case actionTypes.DELETE_HASTA:
         const filteredHastalarDelete = state.hastalar.filter(
            (item) => item.id !== action.payload
         );
         return {
            ...state,
            hastalar: filteredHastalarDelete,
         };

      default:
         return state;
   }
};

export default hastalarReducer;
