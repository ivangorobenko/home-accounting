import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import {green} from "@material-ui/core/colors";
import SnackBarContentWrapper from "./SnackBarContentWrapper";

const useStyles = makeStyles(theme => ({
    close: {
        padding: theme.spacing(1),
    },
    success: {
        backgroundColor: green[600],
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    }
}));



export default function CustomSnackBar(props) {
    const classes = useStyles();
    let className;
    determineClassName(props);

    function determineClassName(props){
        if(props.classType === "error"){
            className = classes.error;
        }
        else if(props.classType === "success"){
            className = classes.success;
        }
    }

    return (
        <div>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={props.open}
                autoHideDuration={2000}
                onClose={props.toggle}
            >
                <SnackBarContentWrapper snackBarType={props.classType} onClose={props.toggle} message={props.snackbarMessage} className={className}
                />
            </Snackbar>
        </div>
    );
}

