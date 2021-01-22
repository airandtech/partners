import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from '../auth'
import Dashboard from '../dashboard'
import Profile from '../profile'
import Riders from '../riders'
import Orders from '../orders'
import FooterMenuItems  from "../../components/footermenu";

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

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  updateDimensions = () => {
    let windowWidth = typeof window !== "undefined" ? window.innerWidth : 0;
    let windowHeight = typeof window !== "undefined" ? window.innerHeight : 0;

    this.setState({ windowWidth, windowHeight });
  };

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
            <PrivateRoute path='/riders' component={Riders} />
            <PrivateRoute path='/orders' component={Orders} />
          </Switch>
          {!styles.showSidebar && (
            <FooterMenuItems styles={styles} history={this.props.history} />
          )}
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
