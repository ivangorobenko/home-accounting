import {Component} from "react";
import * as React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CustomSnackBar from "./CustomSnackBar";
import './Components.css';
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import CustomAppBar from "./CustomAppBar";
import Paper from "@material-ui/core/Paper";


class ExpensesForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            amount: '',
            description: '',
            payer: 'Be',
            category: '',
            open: false,
            submitButtonDisabled: true,
            snackBarMessage: '',
            snackBarClassType: ''
        }
        if (!this.props.isAuthenticated) {
            this.props.history.push("/login");
        }
        this.submitExpenseForm = this.submitExpenseForm.bind(this);
        this.handleLoginResponse = this.handleLoginResponse.bind(this);
        this.toggleChildSnackBar = this.toggleChildSnackBar.bind(this);
        this.validateForm = this.validateForm.bind(this);
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
        this.validateForm();
    }

    submitExpenseForm() {
        this.toggleSubmit();
        fetch('https://glacial-shelf-93469.herokuapp.com/expenses', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa(this.props.login + ':' + this.props.password)
            },
            body: JSON.stringify({
                "amount": this.state.amount,
                "description": this.state.description,
                "payer": this.state.payer,
                "category": this.state.category
            })
        }).then(
            (response) => {
                this.handleLoginResponse(response);
            });
    }

    toggleSubmit() {
        this.setState(state => ({
            submitButtonDisabled: !state.submitButtonDisabled
        }));
    }

    toggleChildSnackBar() {
        this.setState(state => ({
            open: !state.open
        }));
    }

    handleLoginResponse(response) {
        if (response.ok) {
            this.setState({
                snackBarClassType: "success",
                snackBarMessage: "Dépense envoyée"
            });
            this.emptyForm();
        } else if (!response.ok) {
            this.setState({
                snackBarClassType: "error",
                snackBarMessage: "Une erreur est survenue"
            });
        }
        this.toggleChildSnackBar();
    }

    validateForm() {
        if (this.state.amount.length > 0 && this.state.description.length > 0) {
            this.setState({
                submitButtonDisabled: false
            });
        }
    }

    emptyForm() {
        this.setState({
            amount: '',
            description: '',
            category: ''
        });
        document.getElementById('amount').value = '';
        document.getElementById('description').value = '';
        document.getElementById('category').value = '';
    }

    render() {
        return <Paper className="Paper-expense-form">
            <CustomAppBar history={this.props.history}/>
            <TextField
                type="number"
                id='amount'
                name="amount"
                className="Field-expenses-form"
                autoComplete="off"
                label="€"
                autoFocus
                onChange={this.handleChange}/> <br/>
            <TextField
                id='description'
                name="description"
                className="Field-expenses-form"
                label="Description"
                autoComplete="off"
                onChange={this.handleChange}/><br/>
            <RadioGroup aria-label="payer"
                        id='payer'
                        name="payer"
                        value={this.state.payer}
                        onChange={this.handleChange}
                        className="Radio-button"
                        row>
                <FormControlLabel value="Be" control={<Radio color="primary"/>} label="Be" selected/>
                <FormControlLabel value="Ivan" control={<Radio color="primary"/>} label="Ivan"/>
            </RadioGroup>
            <FormControl className="Category-form-control">
                <InputLabel htmlFor="category">Type de dépense</InputLabel>
                <Select
                    value={this.state.category}
                    onChange={this.handleChange}
                    inputProps={{
                        name: 'category',
                        id: 'category',
                    }}>
                    <MenuItem value={"Alimentation"}>Alimentation</MenuItem>
                    <MenuItem value={"Sorties/Voyages"}>Sorties/Voyages</MenuItem>
                    <MenuItem value={"Émile"}>Émile</MenuItem>
                    <MenuItem value={"Logement"}>Logement</MenuItem>
                    <MenuItem value={"Divers"}>Divers</MenuItem>
                </Select>
            </FormControl><br/>
            <Button
                variant="contained"
                className="Submit-button"
                onClick={this.submitExpenseForm}
                disabled={this.state.submitButtonDisabled}>
                Envoyer
            </Button>
            <CustomSnackBar
                open={this.state.open}
                toggle={this.toggleChildSnackBar}
                snackbarMessage={this.state.snackBarMessage}
                classType={this.state.snackBarClassType}
            />
        </Paper>;
    }
}

export default ExpensesForm;