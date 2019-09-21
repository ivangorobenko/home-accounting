import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function CustomAppBar(props) {
    const classes = useStyles();

    function handleBackArrowClick(){
        props.history.push("/expensestable");
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} onClick={handleBackArrowClick} color="inherit" aria-label="menu">
                        <ArrowBackIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </div>
    );
}
