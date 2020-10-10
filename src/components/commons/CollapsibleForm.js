import React from 'react';
import PropTypes from 'prop-types';
import Collapsible from './Collapsible';
import clsx from 'clsx';
import { validAscents } from '../../constants/propTypesValidation';

import { makeStyles, Box, Typography, ListItem } from '@material-ui/core';
import { styledBy, lightenAscentColor } from '../../helpers/styles';


const useStyles = makeStyles((theme) => ({
    root: {
        background: styledBy('bgAscent', theme.palette.ascents),
        padding: theme.spacing(1.5),
        borderRadius: theme.spacing(0.5),
    },
    borderBottomThis: {
        borderBottom: `1px solid #ddd`,
        borderLeft: 0,
        marginTop: ({ marginTop }) => marginTop,
    },
    headerText: {
        padding: theme.spacing(1.5, 1.5, 1, 1.5),
        fontWeight: 400
    },
    labelText: {
        fontWeight: 600
    },
    formParent: {
        padding: theme.spacing(1.5),
    },
    flex: {
        display: "flex",
    },
    active: {
        backgroundColor: lightenAscentColor(theme, 0.5),
    },
    inactive: {
        backgroundColor: styledBy('bgAscent', theme.palette.ascents),
    }
}));


const CollapsibleForm = ({ marginTop = 0, headerText, open = false, ascent = "primary", label, bgAscent = "systemWhite", children, ...props }) => {

    const classes = useStyles({ bgAscent, marginTop, ascent });

    return (
        <Box className={classes.root}>
            <Collapsible
                open={open}
                listItemClassName={classes.labelText}
                className={clsx(classes.borderBottomThis)}
                label={label}
                {...props}
            >
                <Box className={classes.formParent}>
                    {headerText && <Typography variant="subtitle2" className={clsx(classes.borderBottomThis, classes.headerText)} >{headerText}</Typography>}
                    {children}
                </Box>
            </Collapsible>
        </Box>
    );
};

CollapsibleForm.propTypes = {

};

export default CollapsibleForm;