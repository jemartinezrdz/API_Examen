import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Login from '../pages/Login';
import Home from '../pages/Home';
import Recibos from '../pages/Recibos';
import { PrivateRoute } from './PrivateRoute';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login}/>
        <PrivateRoute exact path="/home" component={Home}/>
        <PrivateRoute exact path="/recibos" component={Recibos}/>
      </Switch>
    </BrowserRouter>
  );
}

export default Routes
