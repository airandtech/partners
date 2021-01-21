import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from '../auth'
import Dashboard from '../dashboard'
import Profile from '../profile'

const ls = require('local-storage');

class AppBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      windowWidth: 0,
      windowHeight: 0,
      isAuth: false,
    };

    //this.updateDimensions = this.updateDimensions.bind(this);
  }

  componentDidMount = () => {
    // let sessionToken = sessionStorage.getItem('token');
    // let localToken = ls.get('token');
    // if(sessionToken || localToken){
    //     this.props.history.push('/dashboard')
    // }
  }

  componentWillUnmount() {
  }

  render() {
    const { windowWidth } = this.state;

    const sidebarCollapsed = windowWidth < 1100;

    const styles = {
      white: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      black: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
      offWhite: "#FDFDFD",
      topBarHeight: 65,
      footerMenuHeight: 50,
      showFooterMenuText: windowWidth > 500,
      showSidebar: windowWidth > 768,
      sidebarCollapsed,
      sidebarWidth: sidebarCollapsed ? 100 : 250,
    };

    return (
      <div>
          <Switch>
            <Route exact path="/auth" render={() => <Login history={this.props.history} />}  />
            <Route exact path="/home" render={() => <Dashboard history={this.props.history} />}  />
            {/* <Route exact path="/account" render={() => <Profile history={this.props.history} />}  /> */}
            {/* <Route exact path="/dashboard" render={() => <Dashboard history={this.props.history} />}  /> */}
            <PrivateRoute path='/dashboard' component={Dashboard} />
            <PrivateRoute path='/account' component={Profile} />
          </Switch>
      </div>
    );
  }
}

function PrivateRoute({ component: Component, ...rest }) {
    let sessionToken = sessionStorage.getItem('token');
    let localToken = ls.get('token');
    let isSetupComplete = ls.get('isSetupComplete')
 
    return (
      <Route
        {...rest} 
        render={(props) => ( (sessionToken || localToken)  )
          ? <Component history={props.history} {...props} />
          : <Redirect to={{ pathname: '/auth', state: { from: props.location } }} />}
      />
    )
  }

export default AppBase;
