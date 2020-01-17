import * as React from "react";
import {BrowserRouter as Router} from "react-router-dom";
import Login from "./components/Login";
import ExpensesForm from "./components/ExpensesForm";
import AppliedRoute from "./components/AppliedRoute";
import Dashboard from "./components/Dashboard";

export default ({ childProps }) =>

    <Router>
        <AppliedRoute path='/' exact component={Login} props={childProps}/>
        <AppliedRoute path='/login' exact component={Login} props={childProps}/>
        <AppliedRoute path='/expensesform' exact component={ExpensesForm} props={childProps}/>
        <AppliedRoute path='/dashboard' exact component={Dashboard} props={childProps}/>
    </Router>

