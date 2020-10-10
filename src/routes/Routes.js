import React, { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

// Lazy Components
// ! Note : Only Screen will be imported

// TODO : implement lazy load with redux
import DashboardScreen from "../components/Screens/Dashboard/DashboardScreen";
import BaseRoute from "../components/routes/BaseRoute";

import NotFound from "../components/commons/NotFound";

import { useDispatch, useSelector } from "react-redux";
import dummyMenu from "../assets/json/dummyMenu.json";
import HomeScreen from "../components/Screens/Home/HomeScreen";


const Routes = (props) => {





    return (
        <Router>
            <Switch>
                <BaseRoute path="/" exact component={HomeScreen} />
                <BaseRoute path="/dashBoard" exact component={DashboardScreen} />

                <Route component={NotFound} />

                
            </Switch >
        </Router >
    );
};

export default Routes;
