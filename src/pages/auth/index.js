import { Component } from "react";
import PrivacyPolicy from "../../components/privacy-policy";
import ServiceTerms from "../../components/service-terms";
import { baseUrl, processResponse, showTopNotification } from '../../utilities';
const ls = require('local-storage');
export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            rememberMe: true,
            loading: false,
            isLoginInvalid: false,
            isSignupInvalid: false,
            acceptedTerms: false,
            authMessage: '',
        }

    }

    componentDidMount = () => {
        let sessionToken = sessionStorage.getItem('token');
        let localToken = ls.get('token');
        if (sessionToken || localToken) {
            this.props.history.push('/dashboard')
        }
    }

    handleLogin = (e) => {
        const { location, history } = this.props
        e.preventDefault();
        this.setState({ loading: true })
        fetch(baseUrl() + 'users/authenticate/', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: this.state.username, password: this.state.password }),
        })
            .then(processResponse)
            .then((res) => {
                if (res.statusCode === 200) {
                    // this.state.rememberMe ? ls.set('token', res.data.token) : sessionStorage.setItem('token', res.data.token)
                    ls.set('token', res.data.token)
                    ls.set('isSetupComplete', res.data.isSetupComplete)
                    ls.set('username', res.data.username)
                    res.data.isSetupComplete ? history.push("/home") : history.push("/account")
                } else {
                    this.setState({ loading: false, isLoginInvalid: true, authMessage: res.data.message });
                }
            })
            .catch((error) => {
                this.setState({ loading: false });
            });
    }

    handleSignUp = (e) => {
        const { location, history } = this.props
        e.preventDefault();
        this.setState({ loading: true })

        if (!this.state.acceptedTerms) {
            this.setState({ loading: false, isSignupInvalid: true, authMessage: "Kindly accept the Terms and Conditions!!!" });
            return;
        }
        fetch(baseUrl() + 'users/register/', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: this.state.username, password: this.state.password, isCompany: true }),
        }).then(processResponse)
            .then((res) => {
                console.log(res.data)
                if (res.statusCode === 200) {
                    sessionStorage.setItem('token', res.data.token);
                    res.data.isSetupComplete ? history.push("/home") : history.push("/account")
                    history.push("/home")
                } else {
                    this.setState({ loading: false, isSignupInvalid: true, authMessage: res.data.message });
                }
            })
            .catch((error) => {
                this.setState({ loading: false });
            });
    }

    render() {
        return (
            <div className="loading auth-fluid-pages pb-0">

                <div className="auth-fluid">
                    {/*Auth fluid left content */}
                    <div className="auth-fluid-form-box">
                        <div className="align-items-center d-flex h-100">
                            <div className="card-body">

                                {/* Logo */}
                                <div className="auth-brand text-center text-lg-left">
                                    <div className="auth-logo">
                                        <a href="index.html" className="logo logo-dark text-center">
                                            <span className="logo-lg">
                                                <img src="../assets/images/airand_name_logo.png" alt="" height="22" />
                                            </span>
                                        </a>

                                        <a href="index.html" className="logo logo-light text-center">
                                            <span className="logo-lg">
                                                <img src="../assets/images/logo-light.png" alt="" height="22" />
                                            </span>
                                        </a>
                                    </div>
                                </div>

                                <ul className="nav nav-tabs nav-bordered">
                                    <li className="nav-item">
                                        <a href="#tab-login" data-toggle="tab" aria-expanded="false" className="nav-link active">
                                            Log In
                                    </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#tab-signup" data-toggle="tab" aria-expanded="true" className="nav-link">
                                            Sign Up
                                    </a>
                                    </li>
                                </ul>
                                <div className="tab-content">
                                    <div className="tab-pane show active" id="tab-login">

                                        {this.state.isLoginInvalid ?
                                            <div className="alert alert-danger" role="alert">
                                                <i className="mdi mdi-block-helper mr-2"></i> Login <strong>Failed !!! </strong> <br />{this.state.authMessage}
                                            </div>
                                            : <></>}

                                        <p className="text-muted mb-3">Enter your username and password to access account.</p>

                                        {/* form */}
                                        <form onSubmit={this.handleLogin} action="#">
                                            <div className="form-group">
                                                <label htmlFor="emailaddress">Username</label>
                                                <input onChange={(e) => this.setState({ username: e.target.value })} className="form-control" type="text" id="username" required="" placeholder="Enter your username" required />
                                            </div>
                                            <div className="form-group">
                                                <a href="auth-recoverpw-2.html" className="text-muted float-right"><small>Forgot your password?</small></a>
                                                <label htmlFor="password">Password</label>
                                                <input onChange={(e) => this.setState({ password: e.target.value })} className="form-control" type="password" required="" id="password" placeholder="Enter your password" required />
                                            </div>
                                            <div className="form-group mb-3">
                                                <div className="custom-control custom-checkbox">
                                                    <input type="checkbox" className="custom-control-input" id="checkbox-signin" checked={this.state.rememberMe} onChange={e => this.setState({ rememberMe: e.target.checked })} />
                                                    <label className="custom-control-label" htmlFor="checkbox-signin">Remember me</label>
                                                </div>
                                            </div>
                                            <div className="form-group mb-0 text-center">

                                                {this.state.loading ?
                                                    <button className="btn btn-primary btn-block" type="button" disabled>
                                                        <span className="spinner-border spinner-border-sm mr-1" role="status" aria-hidden="true"></span>Processing ...
                                            </button>
                                                    :
                                                    <button className="btn btn-primary btn-block" type="submit">Log In </button>
                                                }

                                            </div>
                                            {/* social*/}
                                            {/*
                                            <div className="text-center mt-4">
                                                <p className="text-muted font-16">Sign in with</p>
                                                <ul className="social-list list-inline mt-3">
                                                    <li className="list-inline-item">
                                                        <a href="#" className="social-list-item border-primary text-primary"><i className="mdi mdi-facebook"></i></a>
                                                    </li>
                                                    <li className="list-inline-item">
                                                        <a href="#" className="social-list-item border-danger text-danger"><i className="mdi mdi-google"></i></a>
                                                    </li>
                                                    <li className="list-inline-item">
                                                        <a href="#" className="social-list-item border-info text-info"><i className="mdi mdi-twitter"></i></a>
                                                    </li>
                                                    <li className="list-inline-item">
                                                        <a href="#" className="social-list-item border-secondary text-secondary"><i className="mdi mdi-github"></i></a>
                                                    </li>
                                                </ul>
                                            </div>
                                            */}
                                        </form>
                                        {/* end form*/}
                                    </div>
                                    <div className="tab-pane" id="tab-signup">
                                        {this.state.isSignupInvalid ?
                                            <div className="alert alert-danger" role="alert">
                                                <i className="mdi mdi-block-helper mr-2"></i> Registration <strong>Failed !!! </strong> <br />{this.state.authMessage}
                                            </div>
                                            : <></>}

                                        <p className="text-muted mb-3">Don't have an account? Create your account, it takes less than a minute</p>

                                        {/* form */}
                                        <form onSubmit={this.handleSignUp} action="#">
                                            {/* <div className="form-group">
                                            <label htmlFor="fullname">Full Name</label>
                                            <input className="form-control" type="text" id="fullname" placeholder="Enter your name" required />
                                        </div> */}
                                            <div className="form-group">
                                                <label htmlFor="emailaddress">Email address</label>
                                                <input className="form-control" onChange={(e) => this.setState({ username: e.target.value })} type="email" id="emailaddress" required placeholder="Enter your company email" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="password">Password</label>
                                                <input className="form-control" onChange={(e) => this.setState({ password: e.target.value })} type="password" required id="password" placeholder="Enter your password" />
                                            </div>
                                            <div className="form-group">
                                                <div className="custom-control custom-checkbox">
                                                    <input onChange={e => this.setState({ acceptedTerms: e.target.checked })} type="checkbox" className="custom-control-input" id="checkbox-signup" />
                                                    <label className="custom-control-label" htmlFor="checkbox-signup">I accept <a href="#" className="text-dark">Terms and Conditions</a></label>
                                                </div>
                                            </div>
                                            <div className="form-group mb-0 text-center">

                                                {this.state.loading ?
                                                    <button className="btn btn-primary btn-block" type="button" disabled>
                                                        <span className="spinner-border spinner-border-sm mr-1" role="status" aria-hidden="true"></span>Processing ...
                                            </button>
                                                    :
                                                    <button className="btn btn-primary waves-effect waves-light btn-block" type="submit"> Sign Up </button>
                                                }
                                            </div>
                                            {/* social*/}
                                            <div className="text-center mt-4">
                                                <p className="text-muted font-16">Sign up with</p>
                                                <ul className="social-list list-inline mt-3 mb-0">
                                                    <li className="list-inline-item">
                                                        <a href="#" className="social-list-item border-primary text-primary"><i className="mdi mdi-facebook"></i></a>
                                                    </li>
                                                    <li className="list-inline-item">
                                                        <a href="#" className="social-list-item border-danger text-danger"><i className="mdi mdi-google"></i></a>
                                                    </li>
                                                    <li className="list-inline-item">
                                                        <a href="#" className="social-list-item border-info text-info"><i className="mdi mdi-twitter"></i></a>
                                                    </li>
                                                    <li className="list-inline-item">
                                                        <a href="#" className="social-list-item border-secondary text-secondary"><i className="mdi mdi-github"></i></a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </form>
                                        {/* end form*/}
                                    </div>
                                </div>

                                <footer className="footer footer-alt">
                                    <a data-toggle="modal" data-target="#privacy-policy" href="#" className="mr-2 mb-2">Privacy Policy</a>
                                    <a data-toggle="modal" data-target="#service-terms" href="#">Terms of Service</a>
                                    <p className="text-muted">2021 - <script>document.write(new Date().getFullYear())</script> &copy; Admin Portal by <a href="#" className="text-muted">Airand Tech</a> </p>
                                </footer>

                            </div> {/* end .card-body */}
                        </div> {/* end .align-items-center.d-flex.h-100*/}
                    </div>
                    {/* end auth-fluid-form-box*/}

                    {/* Auth fluid right content */}
                    <div className="auth-fluid-right text-center">
                        <div className="auth-user-testimonial">
                            <h2 className="mb-3 text-white">Airand Tech!</h2>
                            <p className="lead"><i className="mdi mdi-format-quote-open"></i> The line between disorder and order lies in logistics… <i className="mdi mdi-format-quote-close"></i>
                            </p>
                            <h5 className="text-white">
                                - Sun Tzu
                        </h5>
                        </div> {/* end auth-user-testimonial*/}
                    </div>
                    {/* end Auth fluid right content */}
                </div>
                {/* end auth-fluid*/}





                {/* Privacy Policy */}
                <div id="privacy-policy" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="standard-modalLabel" aria-hidden="true">
                    <PrivacyPolicy/>
                </div>



                {/* Terms of Service */}
                <div id="service-terms" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="standard-modalLabel" aria-hidden="true">
                    <ServiceTerms/>
                </div>





            </div>
        )
    }
}