import React from 'react';
import './App.css';
import Routes from "./Routes";


class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isAuthenticated: false,
            login: '',
            password: ''
        };
    }

    userHasAuthenticated = authenticated => {
        this.setState({isAuthenticated: authenticated});
    }

    updateParentAppState = (target, value) => {
        this.setState({[target]: value});
    }

    render() {

        const childProps = {
            isAuthenticated: this.state.isAuthenticated,
            userHasAuthenticated: this.userHasAuthenticated,
            updateParentAppState: this.updateParentAppState,
            password: this.state.password,
            login: this.state.login
        };

        return (
            <div className="App">
                <header className="App-header">
                    <Routes childProps={childProps}/>
                </header>
            </div>
        );

    }
}


export default App;
