import React from "react";
import PropTypes from "prop-types";
import {
    makeStyles,
    FormControl,
    InputLabel,
    Radio as MUIRadio,
    RadioGroup,
    FormControlLabel,
} from "@material-ui/core";
import clsx from "clsx";
import { styledBy } from "../../../helpers/styles";
import DropdownItem from "../Dropdown/DropdownItem";
import { validAscents } from "../../../constants/propTypesValidation";

const useStyles = makeStyles((theme) => ({
    radio: {
        color: styledBy('ascent', theme.palette.ascents),
        "&$checked": {
            color: styledBy('ascent', theme.palette.contrast),
        }
    }
}));

const Radio = ({
    ascent = "primary",
    required,
    className,
    parentClassName,
    labelId = `select-${Date.now()}`,
    id = `select-input-${Date.now()}`,
    value,
    onChange,
    fullWidth = true,
    startIcon,
    label,
    options = [],
    ariaLabel = "",
    radioProps = {},
    ...props
}) => {
    const classes = useStyles({ ascent });

    const Options = (each, i) => (
        <FormControlLabel
            value={each.value}
            control={(
                <Radio
                    color="default"
                    className={classes.radio}
                    {...radioProps}
                />
            )}
            label={each.value}
        />
    );

    return (
        <RadioGroup
            className={""}
            color="primary"
            aria-label={ariaLabel}
            value={value}
            onChange={onChange}
        >
            {options.map(Options)}
        </RadioGroup>
    );
};

Radio.propTypes = {
    options: PropTypes.arrayOf(PropTypes.object),
    ascent: validAscents,
};

export default Radio;
