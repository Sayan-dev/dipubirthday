import React, { useState } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

// Lazy Components
// ! Note : Only Screen will be imported

// TODO : implement lazy load with redux
import NotFound from "../components/commons/NotFound";
import ProtectedRoute from "../components/routes/ProtectedRoute";
import UserDetailsScreen from "../components/Screens/UserDetails/UserDetailsScreen";
import UserCreateScreen from "../components/Screens/UserDetails/UserCreateScreen";
import UserEditScreen from "../components/Screens/UserDetails/UserEditScreen";


/* 
    globalRedux:{
        menuPremis:{
            '/user':{
                canCreate:0,
            }
        }
    }
*/


const UserRoutes = ({ crud = { canRead: 1, canUpdate: 1, canCreate: 1, }, ...props }) => {

    return (
            <>
            <ProtectedRoute path="/user" exact component={UserDetailsScreen} />
            {
                crud.canCreate > 0 && <ProtectedRoute path="/user/create" exact component={UserCreateScreen} />
            }
            {
                crud.canUpdate > 0 && <ProtectedRoute path="/user/edit/:userCode" exact component={UserEditScreen} />
            }
            </>
    
    );
};

export default UserRoutes;
