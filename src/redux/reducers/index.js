import { combineReducers } from "redux";
import { statusReducer } from "./statusReducer";
import { menuReducer } from "./menuReducer";

const allReducers = combineReducers({
    appStatus: statusReducer,
    navMenuList:menuReducer
})

export default allReducers;