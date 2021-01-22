import React, { Component } from "react";
import { Redirect, withRouter } from 'react-router-dom'

const ls = require('local-storage');


class Footer extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }

    }

    componentDidMount = () => {
    }


    render() {

        return (
            <>

                <footer className="footer">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-6">
                                2021 - <script>document.write(new Date().getFullYear())</script> &copy; Developed by <a href="">Airand Technologies</a>
                            </div>
                            <div className="col-md-6">
                                <div className="text-md-right footer-links d-none d-sm-block">
                                    <a href="#">About Us</a>
                                    <a href="#">Help</a>
                                    <a href="#">Contact Us</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>

            </>
        )
    }
}

export default withRouter(Footer);