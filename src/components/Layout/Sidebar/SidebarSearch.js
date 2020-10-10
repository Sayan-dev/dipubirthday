import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, makeStyles, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import SelfTextBox from "../../commons/Input/SelfTextBox";

const useStyle = makeStyles((theme) => ({
    root: {
        marginTop: 0,
        marginBottom: theme.spacing(2.5),
    },
    searchButton: {
        padding: theme.spacing(0.75),
    },
    input: {
        fontSize: "0.75rem"
    }
}));

const SidebarSearch = (props) => {

    const classes = useStyle();

    const [searchText, searchInput] = SelfTextBox({
        showLabel: false,
        className: classes.root,
        label: "Search Categories",
        inputClassName: classes.input,
        endAdornment: (
            <IconButton
                className={classes.searchButton}
            >
                <SearchIcon fontSize={'small'} />
            </IconButton>
        )
    });

    return [searchText, searchInput];
};

SidebarSearch.propTypes = {

};

export default SidebarSearch;