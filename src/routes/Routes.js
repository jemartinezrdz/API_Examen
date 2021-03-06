import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Login from '../pages/Login';
import Home from '../pages/Home';
import { PrivateRoute } from './PrivateRoute';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login}/>
        <PrivateRoute exact path="/home" component={Home}/>
      </Switch>
    </BrowserRouter>
  );
}

export default Routes
