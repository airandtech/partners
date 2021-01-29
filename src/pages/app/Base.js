import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect, withRouter} from "react-router-dom";
import history from "../../history";
import App from "../../App";
import Login from '../auth'
import Dashboard from '../dashboard'
import Profile from '../profile'
import AppBase from './app'

const Base = () => {
  const [isAuth, setAuth] = useState(true);

  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={AppBase} />
        <Route exact path="/auth" component={AppBase} />
        <Route exact path="/home" component={AppBase} />
        <Route exact path="/account" component={AppBase} />
        <Route exact path="/riders" component={AppBase} />
        <PrivateRoute authed={isAuth} path='/dashboard' component={AppBase} />
      </Switch>
    </Router>
  );
};

function PrivateRoute({ component: Component, authed, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/auth', state: { from: props.location } }} />}
    />
  )
}

export default Base;
