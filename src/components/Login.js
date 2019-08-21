import {Component} from "react";
import * as React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

class Login extends Component{

    constructor(props){
        super(props);
        this.state={
            login:'',
            password:''
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
        fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization' :'Basic '+btoa(this.state.login +':'+this.state.password)
            }
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
        this.props.userHasAuthenticated(true);
        this.props.userHasEnteredRightLogin(this.state.login);
        this.props.userHasEnteredRightPassword(this.state.password);;
        this.props.history.push("/expensesform");
    }
    validateForm() {
        return this.state.login.length > 0 && this.state.password.length > 0;
    }

    render() {
        return <>
            <Card>
                <CardContent>
                    <TextField name='login' placeholder="login" autoFocus onChange={this.handleChange}/> <br/>
                    <TextField name='password'
                               placeholder="mot de passe" onChange={this.handleChange}/><br/>
                   <Button onClick={this.handleSubmit} disabled={!this.validateForm()}>
                       Confirmer
                   </Button>
                </CardContent>
            </Card>
        </>;
    }
}
export default Login;