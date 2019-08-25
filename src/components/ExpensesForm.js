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
            snackBarMessage:'',
            snackBarClassType:''
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
        fetch('https://glacial-shelf-93469.herokuapp.com/expenses', {
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
        this.toggleSubmit();
        if (response.ok) {
            this.setState({
                snackBarClassType: "success",
                snackBarMessage: "Dépense envoyée"
            });
        }
        else if(!response.ok) {
            this.setState({
                snackBarClassType: "error",
                snackBarMessage: "Erreur est survenu"
            });        }
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
                    <CustomSnackBar open={this.state.open} toggle={this.toggleChildSnackBar}
                                    snackbarMessage = {this.state.snackBarMessage} classType={this.state.snackBarClassType}/>
                </CardContent>
            </Card>
        </>;
    }
}

export default ExpensesForm;