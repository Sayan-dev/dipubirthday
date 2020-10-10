import React from 'react';
import { makeStyles, Paper } from '@material-ui/core';
import clsx from 'clsx';

const useStyle = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.ascents.systemWhite,
        padding: theme.spacing(1),
        borderRadius: theme.spacing(0.5),

    }
}));

const Sidebar = ({ children,className,elevation = 6, ...props }) => {

    const classes = useStyle();

    return (
        <Paper elevation={elevation} className={clsx(classes.root,className)} >
            {children}
        </Paper>
    );
};

export default Sidebar;