import {Component} from "react";
import * as React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CustomSnackBar from "./CustomSnackBar";
import './Components.css';
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";


class ExpensesForm extends Component{

    constructor(props){
        super(props);
        this.state={
            amount:'',
            description:'',
            payer:'Be',
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

    handleChangeGeneral = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
        this.validateForm();
    }
    handleChangeSpecificPayer = event => {
        this.setState({
            payer: event.target.value
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

    emptyForm = event => {
        this.setState({
            amount: '',
            description: ''
        });
        document.getElementById('amount').value='';
        document.getElementById('description').value='';
    }
    handleLoginResponse(response){
        if (response.ok) {
            this.setState({
                snackBarClassType: "success",
                snackBarMessage: "Dépense envoyée"
            });
            this.emptyForm();
        }
        else if(!response.ok) {
            this.setState({
                snackBarClassType: "error",
                snackBarMessage: "Une erreur est survenue"
            });
        }
        this.toggleChildSnackBar();
    }

    validateForm() {
        if (this.state.amount.length > 0 && this.state.description.length > 0 && this.state.description.length>0)
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
                <CardContent  className="Card-custom">
                    <TextField type="number" id='amount' autoComplete="off" label="€" margin="normal" autoFocus onChange={this.handleChangeGeneral}/> <br/>
                    <TextField id='description'
                               label="Description" autoComplete="off"  margin="normal" onChange={this.handleChangeGeneral}/><br/>
                    <RadioGroup
                        aria-label="gender"
                        id="payer"
                        name="payer"
                        value={this.state.payer}
                        onChange={this.handleChangeSpecificPayer}
                        className="Radio-button"
                        row>
                            <FormControlLabel value="Be" control={<Radio color="primary"/>} label="Be" selected/>

                            <FormControlLabel value="Ivan" control={<Radio color="primary"/>} label="Ivan" />
                    </RadioGroup>
                    <Button variant="contained" className="Submit-button"  onClick={this.handleSubmit} disabled={this.state.submitButtonDisabled}>
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