import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
        overflowX: 'auto',
    },
    table: {
        minWidth: 650,
    },
}));

function createData(description, amount, payer,category) {
    return { description, amount, payer,category};
}

const rows = [
    createData('Biocopp', 20.0, "Bé", "Alimentation"),
    createData('Marché', 80.0, "Bé","Alimentation"),
    createData('Truffaut', 30.0, "Ivan", "Divers"),
    createData('Vinted', 20.0, "Bé","Emile"),
    createData('Biocopp', 30.0, "Ivan","Alimentation"),
];

export default function ExpensesTable() {
    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>Déscription</TableCell>
                        <TableCell align="right">Montant</TableCell>
                        <TableCell align="right">Payé par</TableCell>
                        <TableCell align="right">Category</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map(row => (
                        <TableRow key={row.description}>
                            <TableCell component="th" scope="row">
                                {row.description}
                            </TableCell>
                            <TableCell align="right">{row.amount}</TableCell>
                            <TableCell align="right">{row.payer}</TableCell>
                            <TableCell align="right">{row.category}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
}
