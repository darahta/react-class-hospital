import { combineReducers, createStore } from "redux";

import hastalarReducer from "./reducers/hastalarReducer";
import randevularReducer from "./reducers/randevularReducer";
import islemlerReducer from "./reducers/islemlerRaducer";

const rootReducer = combineReducers({
   hastalarState: hastalarReducer,
   randevularState: randevularReducer,
   islemlerState: islemlerReducer,
});

const store = createStore(rootReducer);

export default store;
