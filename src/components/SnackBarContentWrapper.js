import React from 'react';
import clsx from 'clsx';
import SnackbarContent from "@material-ui/core/SnackbarContent";
import IconButton from "@material-ui/core/IconButton";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import CloseIcon from '@material-ui/icons/Close';
import {makeStyles} from "@material-ui/core";

const useStyles1 = makeStyles(theme => ({
    message: {
        display: 'flex',
        alignItems: 'center',
    },
    close: {
        padding: theme.spacing(1),
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing(1),
    }
}));



export default function MySnackbarContentWrapper(props) {
    const classes = useStyles1();
    let icon;
    if (props.snackBarType==="success") {
        icon = <CheckCircleIcon className={clsx(classes.icon, classes.iconVariant)} />;
    } else if (props.snackBarType==="error") {
        icon = <ErrorIcon className={clsx(classes.icon, classes.iconVariant)} />;
    }
    return (
        <SnackbarContent
            className={props.className}
            aria-describedby="client-snackbar"
            message={
                <span id="client-snackbar" className={classes.message}>
                    {icon}
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