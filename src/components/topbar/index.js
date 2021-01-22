import React, { Component } from "react";
import { Redirect, withRouter } from 'react-router-dom'

const ls = require('local-storage');


class TopBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: ''
        }

    }

    componentDidMount = () => {
        let username = ls.get('username');
        this.setState({username})
    }

    handleLogout = () => {
        const { match, location, history } = this.props
        ls.clear()
        sessionStorage.clear()
        history.push('/auth')
    }
    render() {

        return (
            <>
                {/* Topbar Start */}
                <div className="navbar-custom">
                    <div className="container-fluid">
                        <ul className="list-unstyled topnav-menu float-right mb-0">

                            <li className="d-none d-lg-block">
                                <form className="app-search">
                                    <div className="app-search-box dropdown">
                                        <div className="input-group">
                                            <input type="search" className="form-control" placeholder="Search..." id="top-search" />
                                            <div className="input-group-append">
                                                <button className="btn" type="submit">
                                                    <i className="fe-search"></i>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="dropdown-menu dropdown-lg" id="search-dropdown">
                                            {/* item*/}
                                            <div className="dropdown-header noti-title">
                                                <h5 className="text-overflow mb-2">Found 22 results</h5>
                                            </div>

                                            {/* item*/}
                                            <a href="#" className="dropdown-item notify-item">
                                                <i className="fe-home mr-1"></i>
                                                <span>Analytics Report</span>
                                            </a>

                                            {/* item*/}
                                            <a href="#" className="dropdown-item notify-item">
                                                <i className="fe-aperture mr-1"></i>
                                                <span>How can I help you?</span>
                                            </a>

                                            {/* item*/}
                                            <a href="#" className="dropdown-item notify-item">
                                                <i className="fe-settings mr-1"></i>
                                                <span>User profile settings</span>
                                            </a>

                                            {/* item*/}
                                            <div className="dropdown-header noti-title">
                                                <h6 className="text-overflow mb-2 text-uppercase">Users</h6>
                                            </div>

                                            <div className="notification-list">
                                                {/* item*/}
                                                <a href="#" className="dropdown-item notify-item">
                                                    <div className="media">
                                                        <img className="d-flex mr-2 rounded-circle" src="../assets/images/users/user-2.jpg" alt="Generic placeholder image" height="32" />
                                                        <div className="media-body">
                                                            <h5 className="m-0 font-14">Erwin E. Brown</h5>
                                                            <span className="font-12 mb-0">UI Designer</span>
                                                        </div>
                                                    </div>
                                                </a>

                                                {/* item*/}
                                                <a href="#" className="dropdown-item notify-item">
                                                    <div className="media">
                                                        <img className="d-flex mr-2 rounded-circle" src="../assets/images/users/user-5.jpg" alt="Generic placeholder image" height="32" />
                                                        <div className="media-body">
                                                            <h5 className="m-0 font-14">Jacob Deo</h5>
                                                            <span className="font-12 mb-0">Developer</span>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>

                                        </div>
                                    </div>
                                </form>
                            </li>

                            <li className="dropdown d-inline-block d-lg-none">
                                <a className="nav-link dropdown-toggle arrow-none waves-effect waves-light" data-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                                    <i className="fe-search noti-icon"></i>
                                </a>
                                <div className="dropdown-menu dropdown-lg dropdown-menu-right p-0">
                                    <form className="p-3">
                                        <input type="text" className="form-control" placeholder="Search ..." aria-label="Recipient's username" />
                                    </form>
                                </div>
                            </li>

                            <li className="dropdown notification-list topbar-dropdown">
                                <a className="nav-link dropdown-toggle waves-effect waves-light" data-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                                    <i className="fe-bell noti-icon"></i>
                                    <span className="badge badge-danger rounded-circle noti-icon-badge">9</span>
                                </a>
                                <div className="dropdown-menu dropdown-menu-right dropdown-lg">

                                    {/* item*/}
                                    <div className="dropdown-item noti-title">
                                        <h5 className="m-0">
                                            <span className="float-right">
                                                <a href="" className="text-dark">
                                                    <small>Clear All</small>
                                                </a>
                                            </span>Notification
                                    </h5>
                                    </div>

                                    <div className="noti-scroll" data-simplebar>

                                        {/* item*/}
                                        <a href="#" className="dropdown-item notify-item active">
                                            <div className="notify-icon">
                                                <img src="../assets/images/users/user-1.jpg" className="img-fluid rounded-circle" alt="" /> </div>
                                            <p className="notify-details">Welcome !!!</p>
                                            <p className="text-muted mb-0 user-msg">
                                                <small>Hi, welcome to Airand admin portal</small>
                                            </p>
                                        </a>

                                        {/* item*/}
                                        <a href="#" className="dropdown-item notify-item">
                                            <div className="notify-icon bg-primary">
                                                <i className="mdi mdi-comment-account-outline"></i>
                                            </div>
                                            <p className="notify-details">More information coming soon
                                            <small className="text-muted">1 min ago</small>
                                            </p>
                                        </a>

                                        {/* item*/}
                                        {/* <a href="#" className="dropdown-item notify-item">
                                        <div className="notify-icon">
                                            <img src="../assets/images/users/user-4.jpg" className="img-fluid rounded-circle" alt="" /> </div>
                                        <p className="notify-details">Karen Robinson</p>
                                        <p className="text-muted mb-0 user-msg">
                                            <small>Wow ! this admin looks good and awesome design</small>
                                        </p>
                                    </a> */}

                                        {/* item*/}
                                        {/* <a href="#" className="dropdown-item notify-item">
                                        <div className="notify-icon bg-warning">
                                            <i className="mdi mdi-account-plus"></i>
                                        </div>
                                        <p className="notify-details">New user registered.
                                            <small className="text-muted">5 hours ago</small>
                                        </p>
                                    </a> */}

                                        {/* item*/}
                                        {/* <a href="#" className="dropdown-item notify-item">
                                        <div className="notify-icon bg-info">
                                            <i className="mdi mdi-comment-account-outline"></i>
                                        </div>
                                        <p className="notify-details">Caleb Flakelar commented on Admin
                                            <small className="text-muted">4 days ago</small>
                                        </p>
                                    </a> */}

                                        {/* item*/}
                                        {/* <a href="#" className="dropdown-item notify-item">
                                        <div className="notify-icon bg-secondary">
                                            <i className="mdi mdi-heart"></i>
                                        </div>
                                        <p className="notify-details">Carlos Crouch liked
                                            <b>Admin</b>
                                            <small className="text-muted">13 days ago</small>
                                        </p>
                                    </a> */}
                                    </div>

                                    {/* All*/}
                                    <a href="#" className="dropdown-item text-center text-primary notify-item notify-all">
                                        View all
                                    <i className="fe-arrow-right"></i>
                                    </a>

                                </div>
                            </li>

                            <li className="dropdown notification-list topbar-dropdown">
                                <a className="nav-link dropdown-toggle nav-user mr-0 waves-effect waves-light" data-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                                    <img src="../assets/images/users/user-1.jpg" alt="user-image" className="rounded-circle" />
                                    <span className="pro-user-name ml-1">
                                        {this.state.username} <i className="mdi mdi-chevron-down"></i>
                                    </span>
                                </a>
                                <div className="dropdown-menu dropdown-menu-right profile-dropdown ">
                                    {/* item*/}
                                    <div className="dropdown-header noti-title">
                                        <h6 className="text-overflow m-0">Welcome !</h6>
                                    </div>

                                    {/* item*/}
                                    <a href="/account" className="dropdown-item notify-item">
                                        <i className="fe-user"></i>
                                        <span>My Account</span>
                                    </a>

                                    {/* item*/}
                                    {/* <a href="#" className="dropdown-item notify-item">
                                    <i className="fe-settings"></i>
                                    <span>Settings</span>
                                </a> */}

                                    {/* item*/}
                                    {/* <a href="#" className="dropdown-item notify-item">
                                    <i className="fe-lock"></i>
                                    <span>Lock Screen</span>
                                </a> */}

                                    <div className="dropdown-divider"></div>

                                    {/* item*/}
                                    <a href="#" onClick={this.handleLogout} className="dropdown-item notify-item">
                                        <i className="fe-log-out"></i>
                                        <span>Logout</span>
                                    </a>

                                </div>
                            </li>

                            {/* <li className="dropdown notification-list">
                            <a href="#" className="nav-link right-bar-toggle waves-effect waves-light">
                                <i className="fe-settings noti-icon"></i>
                            </a>
                        </li> */}

                        </ul>

                        {/* LOGO */}
                        <div className="logo-box">
                            <a href="/home" className="logo logo-dark text-center">
                                <span className="logo-sm">
                                    <img src="../assets/images/airand_logo.png" alt="" height="22" />
                                    {/* <span className="logo-lg-text-light">UBold</span> */}
                                </span>
                                <span className="logo-lg">
                                    <img src="../assets/images/airand_name_logo.png" alt="" height="20" />
                                    {/* <span className="logo-lg-text-light">U</span> */}
                                </span>
                            </a>

                            <a href="/home" className="logo logo-light text-center">
                                <span className="logo-sm">
                                    <img src="../assets/images/airand_logo.png" alt="" height="22" />
                                </span>
                                <span className="logo-lg">
                                    <img src="../assets/images/airand_name_logo.png" alt="" height="20" />
                                </span>
                            </a>
                        </div>

                        <ul className="list-unstyled topnav-menu topnav-menu-left m-0">
                            {/* <li>
                                <button className="button-menu-mobile waves-effect waves-light">
                                    <i className="fe-menu"></i>
                                </button>
                            </li> */}

                            <li>
                                {/* Mobile menu toggle (Horizontal Layout)*/}
                                <a className="navbar-toggle nav-link" data-toggle="collapse" data-target="#topnav-menu-content">
                                    <div className="lines">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                </a>
                                {/* End mobile menu toggle*/}
                            </li>

                        </ul>
                        <div className="clearfix"></div>
                    </div>
                </div>
                {/* end Topbar */}


            </>
        )
    }
}

export default withRouter(TopBar);