import {Component} from "react";
import * as React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CustomizedSnackbars from "./SnackbarContentWrapper";


class ExpensesForm extends Component{

    constructor(props){
        super(props);
        this.state={
            amount:'',
            description:'',
            payer:''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLoginOkResponse = this.handleLoginOkResponse.bind(this);

    }
    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(){
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
        }).then(function(response) {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        }).then(this.handleLoginOkResponse).catch(function(error) {
            console.log(error);
        });
    }

    handleLoginOkResponse(){
        this.props.history.push("/confirmation");
    }
    validateForm() {
        return this.state.amount.length > 0 && this.state.description.length > 0 && this.state.payer.length > 0;
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
                    <Button onClick={this.handleSubmit} disabled={!this.validateForm()}>
                        Envoyer
                    </Button>
                </CardContent>
            </Card>
            <CustomizedSnackbars></CustomizedSnackbars>
        </>;
    }
}

export default ExpensesForm;