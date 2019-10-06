import React, {Component} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './Components.css';
import Fab from "@material-ui/core/Fab";
import AddIcon from '@material-ui/icons/Add';
import Card from "@material-ui/core/Card";
import {CardContent} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";


class Dashboard extends Component {


    constructor(props) {
        super(props);

        this.state = {
            rowsToShow: [],
            personalExpensesMap: {},
        }
        this.handleClick = this.handleClick.bind(this);

        if (this.props.isAuthenticated) {
            this.getCurrentBalance();
            this.getCurrentMonthExpenses();
        } else {
            this.props.history.push("/login");
        }

    }



    getCurrentMonthExpenses() {
        fetch('https://glacial-shelf-93469.herokuapp.com/allCurrentMonthExpenses', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }).then(response => response.json())
            .then(data => this.setState({rowsToShow: data})).catch();
    }

    getCurrentBalance() {
        fetch('https://glacial-shelf-93469.herokuapp.com/currentBalance', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }).then(response => response.json())
            .then(data => this.setState({personalExpensesMap: data.personalExpensesMap})).catch();
    }


    handleClick() {
        this.props.history.push("/expensesform");
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
            <Paper className="Expenses-of-the-month-paper">
                <Table className="Expenses-of-the-month-table">
                    <TableHead>
                        <TableRow>
                            <TableCell className="Expenses-of-the-month-table-header"
                                       align="right">Déscription</TableCell>
                            <TableCell className="Expenses-of-the-month-table-header" align="right">Montant</TableCell>
                            <TableCell className="Expenses-of-the-month-table-header" align="right">Payé par</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.rowsToShow.map(row => (
                            <TableRow key={row.description + row.amount}>
                                <TableCell align="right">{row.description}</TableCell>
                                <TableCell align="right">{row.amount}</TableCell>
                                <TableCell align="right">{row.payer}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                </Table>
                <Fab color="primary" aria-label="add" className="Fab" size="large" onClick={this.handleClick}>
                    <AddIcon/>
                </Fab>
            </Paper>
        </div>;
    }
}

export default Dashboard;