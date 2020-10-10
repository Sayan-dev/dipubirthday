import { getMenuList } from "../../service/menuService"
import { GET_NAV_MENU_LIST } from "../constants/menuConstant"

const navMenu=(data)=>{
    return{
        type:GET_NAV_MENU_LIST,
        payload:data
    }
}

export const getNavMenuList=(data)=>{
    
    return{
        type:GET_NAV_MENU_LIST,
        payload:data
    }
    


}