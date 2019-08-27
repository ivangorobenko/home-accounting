import {Component} from "react";
import * as React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CustomSnackBar from "./CustomSnackBar";
import './Components.css';

class Login extends Component{

    constructor(props){
        super(props);
        this.state={
            login:'',
            password:'',
            open: false,
            submitButtonDisabled: true,
            snackBarMessage:'',
            snackBarClassType:''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLoginResponse = this.handleLoginResponse.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleChildSnackBar = this.toggleChildSnackBar.bind(this);
        this.validateForm = this.validateForm.bind(this);

    }

    toggleSubmit(){
        this.setState(state => ({
            submitButtonDisabled: !state.submitButtonDisabled
        }));
    }

    validateForm() {
        if (this.state.login.length > 0 && this.state.password.length > 0)
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


    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
        this.validateForm();

        //TODO : this method does not set the parent props login and password. to fix. When fixed remove userHasEnteredRightLogin and userHasEnteredRightPassword calls
        this.props.userHasEnteredCredential(event.target.name,event.target.value);
    }

    handleSubmit(){
        this.toggleSubmit();
        fetch('https://glacial-shelf-93469.herokuapp.com/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization' :'Basic '+btoa(this.state.login +':'+this.state.password)
            }
        }).then(
            (response) => {
                this.handleLoginResponse(response);
            });
    }

    handleLoginResponse(response){
        this.toggleSubmit();
        if (response.ok)
        {
            this.props.userHasAuthenticated(true);
            this.props.userHasEnteredRightLogin(this.state.login);
            this.props.userHasEnteredRightPassword(this.state.password);
            this.props.history.push("/expensesform");
        }
        else if(!response.ok) {
            this.toggleChildSnackBar();
            this.setState({
                snackBarClassType: "error",
                snackBarMessage: "Erreur de login"
            });
        }
    }



    render() {
        return <>
            <Card >
                <CardContent className="Card-custom">
                    <TextField id ='login' label="Login" autoComplete="off" margin="normal"  autoFocus onChange={this.handleChange}/> <br/>
                    <TextField id ='password' type="password"
                               label="Mot de passe" autoComplete="off" margin="normal" onChange={this.handleChange}/><br/>
                   <Button variant="contained" margin="normal" className="Submit-button" onClick={this.handleSubmit} disabled={this.state.submitButtonDisabled}>
                       Confirmer
                   </Button>
                   </CardContent>
            </Card>
            <CustomSnackBar open={this.state.open} toggle={this.toggleChildSnackBar}
                            snackbarMessage = {this.state.snackBarMessage} classType={this.state.snackBarClassType}/>
        </>;
    }
}
export default Login;