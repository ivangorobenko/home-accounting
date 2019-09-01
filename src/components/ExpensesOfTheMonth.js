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




class ExpensesOfTheMonth extends Component{
    getCurrentMonthExpenses(login, password){
        fetch('https://glacial-shelf-93469.herokuapp.com/allCurrentMonthExpenses', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization' :'Basic '+btoa(login +':'+password)
            }
        }).then(response => response.json())
            .then(data => this.setState({ rowsToShow: data })).catch();
    }


    constructor(props){
        super(props);
        this.state={
            rowsToShow : [],
        }
        this.handleClick = this.handleClick.bind(this);

        if(this.props.isAuthenticated)
        {
            this.getCurrentMonthExpenses(this.props.login,this.props.password);
        }
        else {
            this.props.history.push("/login");
        }


    }

    handleClick(){
        this.props.history.push("/expensesform");
    }


    render() {

        return <>
            <Paper className="Expenses-of-the-month-paper">
                <Table className="Expenses-of-the-month-table">
                    <TableHead >
                        <TableRow>
                            <TableCell className="Expenses-of-the-month-table-header" align="right">Déscription</TableCell>
                            <TableCell className="Expenses-of-the-month-table-header" align="right">Montant</TableCell>
                            <TableCell className="Expenses-of-the-month-table-header" align="right">Payé par</TableCell>
                            <TableCell className="Expenses-of-the-month-table-header" align="right">Category</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.rowsToShow.map(row => (
                            <TableRow key={row.description+row.amount}>
                                <TableCell align="right">{row.description}</TableCell>
                                <TableCell align="right">{row.amount}</TableCell>
                                <TableCell align="right">{row.payer}</TableCell>
                                <TableCell align="right">{row.category}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                </Table>
                <Fab color="primary" aria-label="add" className="Fab" onClick={this.handleClick}>
                    <AddIcon />
                </Fab>
            </Paper>
        </>;
    }
}

export default ExpensesOfTheMonth;