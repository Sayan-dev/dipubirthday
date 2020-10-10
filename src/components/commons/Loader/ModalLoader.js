import React from 'react';
import Modal from '../Modal/Modal';
import CircularLoader from './CircularLoader';
import { Box, makeStyles } from '@material-ui/core';

import eO2V2Logo from "../../../assets/images/unnamed.png";
import clsx from 'clsx';
import Text from '../Text';

const useStyles = makeStyles((theme) => ({
    "@keyframes spinIt": {
        "0%": {
            transform: "rotate(0deg)",
        },
        "100%": {
            transform: "rotate(360deg)",
        }
    },
    animateSpin: {
        width: "48px",
        height: "48px",
        marginRight: theme.spacing(1.5),
        animation: `$spinIt 700ms infinite linear`
    },
    transparentBg: {
        "& .MuiDialogContent-root": {
            border: "none",
        },
        "& .MuiDialog-paperScrollPaper": {
            boxShadow: "none",
            backgroundColor: "transparent",
        },
        "& .MuiBackdrop-root": {
            backgroundColor: "rgba(0, 0, 0, 0.75)",
        }
    },
    flexBox: {
        display: "flex",
        alignItems: "center",
        
    }
}))

const ModalLoader = ({ transparentBg = true, title, className, isLogo = true, ...props }) => {

    const classes = useStyles();

    return (
        <Modal
            alignTitle="center"
            className={clsx({
                [classes.transparentBg]: transparentBg
            }, className)}
            title={transparentBg ? null : title}
            {...props}
        >
            {
                isLogo
                    ? (
                        <Box className={classes.flexBox}>
                            <img src={eO2V2Logo} className={classes.animateSpin} alt="" />
                            {transparentBg && <Text variant="subtitle1" ascent="systemWhite" >{title}</Text>}
                        </Box>
                    ) : (
                        <CircularLoader {...props} />
                    )
            }
        </Modal>
    );
};

export default ModalLoader;