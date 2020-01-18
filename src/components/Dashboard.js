import React, {Component} from 'react';
import './Components.css';
import Fab from "@material-ui/core/Fab";
import AddIcon from '@material-ui/icons/Add';
import Card from "@material-ui/core/Card";
import {CardContent} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import MaterialTable from 'material-table';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

import {forwardRef} from 'react';
import CustomSnackBar from "./CustomSnackBar";

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref}/>),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref}/>),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref}/>),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref}/>),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref}/>),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref}/>),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref}/>),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref}/>),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref}/>),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref}/>),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref}/>),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref}/>),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref}/>)
};

class Dashboard extends Component {


    constructor(props) {
        super(props);

        this.state = {
            rowsToShow: [],
            personalExpensesMap: {},
            columns: [
                {
                    title: 'Desc', field: 'description', cellStyle: {
                        width: 10,
                        maxWidth: 10,
                    }, headerStyle: {
                        width: 10,
                        maxWidth: 15,
                    }
                },
                {title: 'Montant', field: 'amount', type: 'numeric'},
                {
                    title: 'Qui', field: 'payer', cellStyle: {
                        width: 10,
                        maxWidth: 10,
                    }, headerStyle: {
                        width: 10,
                        maxWidth: 10,
                    }
                },
                {title: 'Date', field: 'date', type: 'date'},
            ],
            open: false,
            submitButtonDisabled: true,
            snackBarMessage: '',
            snackBarClassType: ''
        }
        this.handleClick = this.handleClick.bind(this);
        this.toggleChildSnackBar = this.toggleChildSnackBar.bind(this);

        if (this.props.isAuthenticated) {
            this.getCurrentBalance(this.props.login, this.props.password);
            this.getCurrentMonthExpenses(this.props.login, this.props.password);
        } else {
            this.props.history.push("/login");
        }

    }

    toggleChildSnackBar() {
        this.setState(state => ({
            open: !state.open
        }));
    }

    getCurrentMonthExpenses(login, password) {
        var currentTime = new Date();
        var currentYear = currentTime.getFullYear();
        //getMonth returns the month from 0 to 11
        var currentMonth = currentTime.getMonth() + 1;
        fetch('https://glacial-shelf-93469.herokuapp.com/expenses/' + currentYear + '/' + currentMonth, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa(login + ':' + password)
            }
        }).then(response => response.json())
            .then(data => this.setState({rowsToShow: data})).catch();
    }

    getCurrentBalance(login, password) {
        fetch('https://glacial-shelf-93469.herokuapp.com/currentBalance', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa(login + ':' + password)
            }
        }).then(response => response.json())
            .then(data => this.setState({personalExpensesMap: data.personalExpensesMap})).catch();
    }


    handleClick() {
        this.props.history.push("/expensesform");
    }

    deleteExpense(login, password, expenseToDelete, prevStateData) {
        fetch('https://glacial-shelf-93469.herokuapp.com/expenses', {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa(login + ':' + password)
            },
            body: JSON.stringify({
                "amount": expenseToDelete.amount,
                "description": expenseToDelete.description,
                "payer": expenseToDelete.payer,
                "category": expenseToDelete.category,
                "date": expenseToDelete.date
            })
        }).then((response) => {
            console.log(prevStateData);
            console.log(expenseToDelete);
            this.handleDeleteExpenseFormResponse(response, expenseToDelete, prevStateData)
        });
    }

    handleDeleteExpenseFormResponse(response, expenseToDelete, prevStateData) {
        if (response.ok) {
            this.setState({
                snackBarClassType: "success",
                snackBarMessage: "Dépense supprimée"
            });
            this.toggleChildSnackBar();
        } else if (!response.ok) {
            this.setState({
                snackBarClassType: "error",
                snackBarMessage: "Une erreur est survenue"
            });
            this.toggleChildSnackBar();
            this.setState({rowsToShow: prevStateData})
        }
    }

    render() {

        return <div className="Expenses-of-the-month-parent-div">
            <Card className="Card-balance">
                <CardContent>
                    <Grid container justify="center" alignItems="center">
                        <Avatar className="AvatarIvan">I</Avatar>{this.state.personalExpensesMap['Ivan']} €
                        <Avatar className="AvatarBe">B</Avatar>{this.state.personalExpensesMap['Be']} €
                    </Grid>
                </CardContent>
            </Card>
            <MaterialTable
                title={"Dépenses du mois"}
                columns={this.state.columns}
                data={this.state.rowsToShow}
                icons={tableIcons}
                options={{
                    paging: false,
                    headerStyle: {
                        backgroundColor: '#3f51b5',
                        color: '#FFF'
                    }
                }}
                localization={{body: {editRow: {deleteText: 'Vraiment ?'},emptyDataSourceMessage: 'Aucune dépense à afficher'}}}
                editable={{
                    onRowDelete: oldData =>
                        new Promise(resolve => {
                            setTimeout(() => {
                                this.deleteExpense(this.props.login, this.props.password, oldData, this.state.rowsToShow);
                                this.setState(prevState => {
                                    const rowsToShow = [...prevState.rowsToShow];
                                    rowsToShow.splice(rowsToShow.indexOf(oldData), 1);
                                    return {...prevState, rowsToShow};
                                });
                                resolve();
                            }, 600);
                        })
                }}
                className="Expenses-of-the-month-table"
            />
            <Fab color="primary" aria-label="add" className="Fab" size="large" onClick={this.handleClick}>
                <AddIcon/>
            </Fab>
            <CustomSnackBar
                open={this.state.open}
                toggle={this.toggleChildSnackBar}
                snackbarMessage={this.state.snackBarMessage}
                classType={this.state.snackBarClassType}
            />
        </div>;
    }
}

export default Dashboard;