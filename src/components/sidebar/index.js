import React, { Component } from "react";
import { useRouteMatch } from "react-router-dom";

const ls = require('local-storage');

export default class SideBar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isSetupComplete: false,
            role: '',
        }
    }

    componentDidMount = () => {
        let isSetupComplete = ls.get('isSetupComplete');
        let role = ls.get('role');
        this.setState({ isSetupComplete, role })
    }
    render() {
        return (
            <>
                {/* ========== Left Sidebar Start ========== */}
                <div className="left-side-menu">

                    <div className="h-100" data-simplebar>

                        {/* User box */}
                        <div className="user-box text-center">
                            <img src="../assets/images/users/default-avatar.jpg" alt="user-img" title="Mat Helme"
                                className="rounded-circle avatar-md" />
                            <div className="dropdown">
                                <a href="#" className="text-dark dropdown-toggle h5 mt-2 mb-1 d-block"
                                    data-toggle="dropdown">Geneva Kennedy</a>
                                <div className="dropdown-menu user-pro-dropdown">

                                    {/* item*/}
                                    <a href="/account" className="dropdown-item notify-item">
                                        <i className="fe-user mr-1"></i>
                                        <span>My Account</span>
                                    </a>

                                    {/* item*/}
                                    {/* <a href="#" className="dropdown-item notify-item">
                                        <i className="fe-settings mr-1"></i>
                                        <span>Settings</span>
                                    </a> */}

                                    {/* item*/}
                                    {/* <a href="#" className="dropdown-item notify-item">
                                        <i className="fe-lock mr-1"></i>
                                        <span>Lock Screen</span>
                                    </a> */}

                                    {/* item*/}
                                    <a href="#" className="dropdown-item notify-item">
                                        <i className="fe-log-out mr-1"></i>
                                        <span>Logout</span>
                                    </a>

                                </div>
                            </div>
                            <p className="text-muted">Admin Head</p>
                        </div>

                        {/*- Sidemenu */}
                        <div id="sidebar-menu">

                            <ul id="side-menu">

                                <li className="menu-title">Navigation</li>

                                <li>
                                    <a href="/dashboard">
                                        {/* <i data-feather="airplay"></i> */}
                                        <i className="fe-airplay"></i>
                                        {/* <span className="badge badge-success badge-pill float-right">4</span> */}
                                        <span> Dashboard </span>
                                    </a>

                                </li>
                                
                                {this.state.isSetupComplete ? 
                                <>
                                <li className="menu-title mt-2">Management</li>

                                <li>
                                    <a href="/account">
                                        <i className="fe-globe"></i>
                                        <span> Company </span>
                                    </a>
                                </li>

                                <li>
                                    <a href="/riders">
                                        <i className="fas fa-bicycle"></i>
                                        <span> Riders </span>
                                    </a>
                                </li>

                                <li>
                                    <a href="/orders">
                                        <i className="fas fa-dolly"></i>
                                        <span>Orders </span>
                                    </a>
                                </li>
                                    </>
                                : <></> }

                                {this.state.role === 'Admin' ? 
                                <>
                                <li className="menu-title mt-2">Admin Management</li>

                                <li>
                                    <a href="/companies">
                                        <i className="fas fa-globe-africa"></i>
                                        <span> Companies </span>
                                    </a>
                                </li>

                                <li>
                                    <a href="/merchants">
                                        <i className="fas fa-address-book"></i>
                                        <span> Merchants </span>
                                    </a>
                                </li>
                                 </>
                                : <></> }

                            </ul>

                        </div>
                        {/* End Sidebar */}

                        <div className="clearfix"></div>

                    </div>
                    {/* Sidebar -left */}

                </div>
                {/* Left Sidebar End */}
            </>
        )
    }
}