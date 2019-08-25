import {Component} from "react";
import * as React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CustomSnackBar from "./CustomSnackBar";


class ExpensesForm extends Component{

    constructor(props){
        super(props);
        this.state={
            amount:'',
            description:'',
            payer:'',
            open: false,
            submitButtonDisabled: true,
            snackbarMessage:''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
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

    handleSubmit(){
        this.toggleSubmit();
        fetch('http://localhost:8080/expenses', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization' :'Basic '+btoa(this.props.login +':'+this.props.password)
            },
            body : JSON.stringify ({
                "amount" : this.state.amount,
                "description" : this.state.description,
                "payer" : this.state.payer
            })
        }).then(
            (response) => {
                this.handleLoginResponse(response);
            });
    }

    toggleSubmit(){
        this.setState(state => ({
            submitButtonDisabled: !state.submitButtonDisabled
        }));
    }

    handleLoginResponse(response){
        let message = '';
        this.toggleSubmit();
        if (response.ok)
        {
             message = "Dépense envoyée"
        }
        else if(!response.ok) {
             message = "Erreur est servenue "
        }
        this.setState({
            snackbarMessage: message
        });
        this.toggleChildSnackBar();

    }

    validateForm() {
        if (this.state.amount.length > 0 && this.state.description.length > 0 && this.state.payer.length > 0)
        {
            this.setState({
                submitButtonDisabled: false
            });
        }
    }


    toggleChildSnackBar() {
        this.setState(state => ({
            open: !state.open
        }));
    }

    render() {
        return <>
            <Card>
                <CardContent>
                    <TextField name='amount' placeholder="montant" autoFocus onChange={this.handleChange}/> <br/>
                    <TextField name='description'
                               placeholder="description" onChange={this.handleChange}/><br/>
                    <TextField name='payer'
                               placeholder="payer par ?" onChange={this.handleChange}/><br/>
                    <Button onClick={this.handleSubmit} disabled={this.state.submitButtonDisabled}>
                        Envoyer
                    </Button>
                    <CustomSnackBar open={this.state.open} onClose={this.toggleChildSnackBar} toggle={this.toggleChildSnackBar}
                                    snackbarMessage = {this.state.snackbarMessage}/>
                </CardContent>
            </Card>
        </>;
    }
}

export default ExpensesForm;