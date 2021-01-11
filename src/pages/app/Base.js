import React, { useState } from "react";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import history from "../../history";
import App from "../../App";
import Login from '../auth'

const Base = () => {
  const [isAuth, setAuth] = useState(false);
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/auth" component={Login} />
        <PrivateRoute authed={isAuth} path='/dashboard' component={App} />
      </Switch>
    </Router>
  );
};

function PrivateRoute ({component: Component, authed, ...rest}) {
    return (
      <Route
        {...rest}
        render={(props) => authed === true
          ? <Component {...props} />
          : <Redirect to={{pathname: '/auth', state: {from: props.location}}} />}
      />
    )
  }

export default Base;
