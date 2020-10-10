
/* 
    @object: {
    navmenu: Tree menulist for navbar,

}
*/

import { GET_NAV_MENU_LIST } from "../constants/menuConstant";
import { flatten, arrayToObject } from "../../helpers/other";

const initialState = {
    navMenuList:[],
    flattenedNavMenu:{}
}

export function menuReducer(state = initialState, action) {
    switch (action.type) {
        case GET_NAV_MENU_LIST:
            return{
                ...state,
                navMenuList:action.payload,
                flattenedNavMenu:arrayToObject(flatten(action.payload))
            }
        default:
            return state;
    }
}