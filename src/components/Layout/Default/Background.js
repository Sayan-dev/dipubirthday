import React from 'react';
import { styledBy } from "../../../helpers/styles";
import { makeStyles, Box } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {

        minHeight: "100%",
        backgroundSize:"cover",
        width: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: -999,
    }
}));


const Background = ({ ascent = "primary", image = null, color = "systemMetalDark", opacity = 1, ...props }) => {

    const classes = useStyles({ image, opacity, color, ascent });

    return (
        <Box className={classes.root} style={{ backgroundImage: `url(${image})` }}></Box>
    );
};

export default Background;