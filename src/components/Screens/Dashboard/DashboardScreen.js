import React from 'react';
import Dashboard from '../../Layout/Dashboard/Dashboard';
import Base from '../../Layout/Base';
import { Typography } from '@material-ui/core';




const DashboardScreen = () => {

    return (
        <Base
            hideSidebar
            headerTitle="Dashboard"
            SidebarChild={() => (
                <Typography>Search Categories</Typography>
            )}
        >

            <Dashboard />
        </Base >
    );
};

export default DashboardScreen;