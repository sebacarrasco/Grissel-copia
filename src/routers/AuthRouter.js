import React from 'react';
import {
    Switch,
    Route,
    Redirect
  } from "react-router-dom";
import { startLogin } from '../actions/auth';
import { LoginScreen } from '../components/auth/LoginScreen';
import { RegisterScreen } from '../components/auth/RegisterScreen';

export const AuthRouter = () => {
    return (
        <Switch>
            <Route
                exact
                path="/auth/login"
                render={
                    props => (<LoginScreen { ...props } startLoginAction={ startLogin } mode="user" />)
                }
            />
            <Route exact path="/auth/register" component={ RegisterScreen } />
            <Redirect to="/auth/login"/>
        </Switch>
    )
}
