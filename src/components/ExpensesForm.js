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
import CardHeader from "@material-ui/core/CardHeader";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";


class ExpensesForm extends Component{

    constructor(props){
        super(props);
        this.state={
            amount:'',
            description:'',
            payer:'Be',
            category: '',
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
    handleChangeSpecificCategory = event => {
        this.setState({
            category: event.target.value
        });
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
                "payer" : this.state.payer,
                "category": this.state.category
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
            description: '',
            category: ''
        });
        document.getElementById('amount').value='';
        document.getElementById('description').value='';
        document.getElementById('category').value='';
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
        if (this.state.amount.length > 0 && this.state.description.length > 0)
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
                <CardHeader className="Card-custom" title="Budget maison"
                subheader="Ajouter une dépense"/>
                <CardContent  className="Card-custom">
                    <TextField
                        type="number"
                        id='amount'
                        autoComplete="off"
                        label="€"
                        margin="normal"
                        autoFocus
                        onChange={this.handleChangeGeneral}/> <br/>
                    <TextField
                        id='description'
                        label="Description"
                        autoComplete="off"
                        margin="normal"
                        onChange={this.handleChangeGeneral}/><br/>
                    <RadioGroup aria-label="payer" id="payer"
                                name="payer"
                                value={this.state.payer}
                                onChange={this.handleChangeSpecificPayer}
                                className="Radio-button"
                                row>
                        <FormControlLabel value="Be" control={<Radio color="primary"/>} label="Be" selected/>

                        <FormControlLabel value="Ivan" control={<Radio color="primary"/>} label="Ivan" />
                    </RadioGroup>
                    <FormControl spacing={2} className="Category-form-control">
                        <InputLabel htmlFor="category">Type de dépense</InputLabel>
                        <Select
                            value={this.state.category}
                            onChange={this.handleChangeSpecificCategory}
                            inputProps={{
                                name: 'category',
                                id: 'category',
                            }}
                        >
                            <MenuItem value={"Alimentation"}>Alimentation</MenuItem>
                            <MenuItem value={"Voyages"}>Voyages</MenuItem>
                            <MenuItem value={"Divers"}>Divers</MenuItem>
                        </Select>
                    </FormControl>

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