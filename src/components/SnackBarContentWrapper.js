import React from 'react';
import SnackbarContent from "@material-ui/core/SnackbarContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import {makeStyles} from "@material-ui/core";

const useStyles1 = makeStyles(theme => ({
    message: {
        display: 'flex',
        alignItems: 'center',
    },
    close: {
        padding: theme.spacing(1),
    }
}));



export default function MySnackbarContentWrapper(props) {
    const classes = useStyles1();

    return (
        <SnackbarContent
            className={props.className}
            aria-describedby="client-snackbar"
            message={
                <span id="client-snackbar" className={classes.message}>
                    {props.message}
                </span>
            }
            action={[
                <IconButton
                    key="close"
                    aria-label="close"
                    color="inherit"
                    className={classes.close}
                    onClick={props.onClose}
                >
                    <CloseIcon />
                </IconButton>,
            ]}
        />
    );
}