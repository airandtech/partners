import { Component } from "react";
import { baseUrl, processResponse, payStackBaseUrl, psToken, flutterwaveBaseUrl, fwToken, getToken, createNotification } from '../../utilities';
import SideBar from '../../components/sidebar'
import TopBar from '../../components/topbar'
import Footer from '../../components/footer'
import Toast from '../../components/toast'
import { NotificationContainer, NotificationManager } from 'react-notifications';


const ls = require('local-storage');

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            isEdit: false,
            username: '',
            user: {},
            managers: [],
            company: {},
            isSetupComplete: true,
            bankList: [],
            accountName: '',
            accountNumber: '',
            firstName: '',
            lastName: '',
            phone: '',
            companyName: '',
            companyAddress: '',
            bankName: '',
            bankCode: '',
            managerPhone: '',
            managerEmail: '',
            managerFullName: ''
        }

    }

    componentDidMount = () => {
        let username = ls.get('username');
        let isSetupComplete = ls.get('isSetupComplete');
        this.setState({ username, isSetupComplete })
        this.loadCompanyDetails()
    }

    loadCompanyDetails = () => {
        const token = getToken();
        if (token) {
            fetch(baseUrl() + 'api/company/user', {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                }
            })
                .then(processResponse)
                .then((res) => {
                    console.warn(`DATA==> ${JSON.stringify(res.data)}`);
                    if (res.statusCode === 200 && res.data.status) {
                        NotificationManager.success("Fetched company details", 'Success', 5000);
                        console.log(res.data)
                        this.setState({ managers: res.data.data.managers, company: res.data.data.company })


                    } else {
                        NotificationManager.error(res.data.message, 'Failed', 5000);
                        console.log("FAILED: ", res.data.message)
                    }
                })
                .catch((error) => {
                    NotificationManager.error(JSON.stringify(error), 'Failed', 5000);
                    console.log("FAILED :", error)
                });
        }
    }

    handleUpdateAccount = () => {
        this.setState({ isEdit: true })
        this.loadBanks();
    }

    loadBanks = () => {
        fetch(payStackBaseUrl() + 'bank', {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + psToken(),
            }
        })
            .then(processResponse)
            .then((res) => {
                if (res.statusCode === 200 && res.data.status) {
                    NotificationManager.success(res.data.message, 'Success', 5000);
                    console.log(res.data)
                    this.setState({ bankList: res.data.data })

                } else {
                    NotificationManager.error(res.data.message, 'Failed', 5000);
                    console.log("FAILED: ", res.data.message)
                }
            })
            .catch((error) => {
                NotificationManager.error(JSON.stringify(error), 'Failed', 5000);
                console.log("FAILED :", error)
            });
    }

    resolveAccountNumber = (account_number) => {
        fetch(flutterwaveBaseUrl() + 'v3/accounts/resolve', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + fwToken(),
            },
            body: JSON.stringify({ account_number, account_bank: this.state.bankCode }),
        })
            .then(processResponse)
            .then((res) => {
                if (res.statusCode === 200 && res.data.status === "success") {
                    NotificationManager.success(res.data.message, 'Success', 5000);
                    console.log(res.data)
                    this.setState({ accountName: res.data.data.account_name })

                } else {
                    NotificationManager.error(res.data.message, 'Failed', 5000);
                    console.log("FAILED: ", res.data.message)
                }
            })
            .catch((error) => {
                NotificationManager.error(JSON.stringify(error), 'Failed', 5000);
                console.log("FAILED :", error)
            });
    }

    handleAccountNumber = (e) => {
        console.log("INPUT: ", e.target.value)
        this.setState({ accountNumber: e.target.value })
        if (e.target.value.length === 10) {
            console.log("ACCOUNT NUMBER IS 10")
            setTimeout(() => {
                this.resolveAccountNumber(e.target.value)
            }, 1000);

        }
    }

    handleBankSelection = (e) => {
        const index = e.target.value;
        const name = this.state.bankList[index].name;
        const code = this.state.bankList[index].code;
        // console.log("CODE: "+ code + " NAME: "+ name)
        this.setState({ bankName: name, bankCode: code })
    }

    handleSubmit = () => {
        this.setState({ loading: true })
        const token = getToken();
        fetch(baseUrl() + 'api/company/createWithDetails', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify({
                company: {
                    CompanyName: this.state.companyName, CompanyAddress: this.state.companyAddress,
                    BankName: this.state.bankName, AccountNumber: this.state.accountNumber, AccountName: "Timilehin Oloruntoba",
                    OfficeArea: this.state.companyAddress,
                },
                ridersDetails: [],
                managerDetails: []
            }),
        })
            .then(processResponse)
            .then((res) => {
                console.log(res.data)
                if (res.statusCode === 200 && res.data.status) {
                    this.setState({ loading: false, isEdit: false })
                    NotificationManager.success(res.data.message, 'Success', 5000);
                    this.loadCompanyDetails()

                } else if (res.statusCode === 400) {
                    NotificationManager.error(res.data.error, 'Failed', 5000);
                } else {
                    NotificationManager.error(res.data.message, 'Failed', 5000);
                    this.setState({ loading: false })
                }
            })
            .catch((error) => {
                NotificationManager.error(JSON.stringify(error), 'Failed', 5000);
                this.setState({ loading: false })
            });
    }

    handleManagerSubmit = () => {
        this.setState({ loading: true })
        const token = getToken();
        fetch(baseUrl() + 'api/company/managers', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify({
                managerDetails: [
                    {
                        Name: this.state.managerFullName,
                        Email: this.state.managerEmail,
                        Phone: this.state.managerPhone
                    }
                ]
            }),
        })
            .then(processResponse)
            .then((res) => {
                console.log(res.data)
                if (res.statusCode === 200 && res.data.status) {
                    this.setState({ loading: false, isEdit: false })
                    NotificationManager.success("Dispatch Manager added", 'Success', 5000);
                    this.loadCompanyDetails()

                } else if (res.statusCode === 400) {
                    this.setState({ loading: false })
                    NotificationManager.error(res.data.error, 'Failed', 5000);
                } else {
                    NotificationManager.error(res.data.message, 'Failed', 5000);
                    this.setState({ loading: false })
                }
            })
            .catch((error) => {
                NotificationManager.error(JSON.stringify(error), 'Failed', 5000);
                this.setState({ loading: false })
            });
    }

    render() {
        return (
            <div className="loading"
                data-layout='{"mode": "light", "width": "fluid", "menuPosition": "fixed", "sidebar": { "color": "light", "size": "default", "showuser": false}, "topbar": {"color": "dark"}, "showRightSidebarOnPageLoad": true}'
            >

                {/* Begin page */}
                <div id="wrapper">

                    <TopBar history={this.props.history} />

                    <SideBar history={this.props.history} />

                    {/* ============================================================== */}
                    {/* Start Page Content here */}
                    {/* ============================================================== */}

                    <div className="content-page">
                        <div className="content">


                            <div className="container-fluid">


                                <div className="row">
                                    <div className="col-12">
                                        <div className="page-title-box">
                                            <div className="page-title-right">
                                                <ol className="breadcrumb m-0">
                                                    <li className="breadcrumb-item"><a href="/dashboard">Airand</a></li>
                                                    <li className="breadcrumb-item"><a href="/dashboard">Dashboard</a></li>
                                                    <li className="breadcrumb-item active">Profile</li>
                                                </ol>
                                            </div>
                                            <h4 className="page-title">Profile</h4>
                                        </div>

                                        {!this.state.isSetupComplete ?
                                            <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                                <strong>Info !!!</strong> Account Activation is incomplete, kindly update account.
                                </div>
                                            : <></>}

                                    </div>
                                </div>


                                <div className="row">
                                    <div className="col-lg-4 col-xl-4">
                                        <div className="card-box text-center">
                                            <img src="../assets/images/users/user-1.jpg" className="rounded-circle avatar-lg img-thumbnail"
                                                alt="profile-image" />

                                            <h4 className="mb-0">{this.state.user.firstName} {this.state.user.lastName}</h4>
                                            <p className="text-muted">{this.state.username}</p>

                                            <button onClick={this.handleUpdateAccount} type="button" data-toggle="tab" data-target="#settings" className="btn btn-success btn-xs waves-effect mb-2 mr-1 waves-light">Update Account</button>
                                            <button type="button" className="btn btn-danger btn-xs waves-effect mb-2 waves-light" disabled>Deactivate</button>

                                            <div className="text-left mt-3">
                                                {/* <h4 className="font-13 text-uppercase">About Me :</h4>
                                        <p className="text-muted font-13 mb-3">
                                            Hi I'm Johnathn Deo,has been the industry's standard dummy text ever since the
                                            1500s, when an unknown printer took a galley of type.
                                        </p> */}
                                                <p className="text-muted mb-2 font-13"><strong>Full Name :</strong> <span className="ml-2">
                                                    {this.state.user.firstName} {this.state.user.lastName}</span></p>

                                                <p className="text-muted mb-2 font-13"><strong>Mobile :</strong><span className="ml-2">
                                                    {this.state.user.phone}</span></p>

                                                <p className="text-muted mb-2 font-13"><strong>Email :</strong> <span className="ml-2 ">{this.state.username}</span></p>

                                                <p className="text-muted mb-1 font-13"><strong>Location :</strong> <span className="ml-2">Nigeria</span></p>
                                            </div>

                                            <div className="text-left mt-3">
                                                <h4 className="font-13 text-uppercase">Company Details</h4>
                                                {/* <p className="text-muted font-13 mb-3">
                                            Hi I'm Johnathn Deo,has been the industry's standard dummy text ever since the
                                            1500s, when an unknown printer took a galley of type.
                                        </p> */}
                                                <p className="text-muted mb-2 font-13"><strong>Company Name :</strong> <span className="ml-2">
                                                    {this.state.company.companyName}</span></p>

                                                <p className="text-muted mb-2 font-13"><strong>Company Address :</strong><span className="ml-2">
                                                    {this.state.company.companyAddress}</span></p>

                                                <p className="text-muted mb-2 font-13"><strong>Bank Name :</strong> <span className="ml-2 ">{this.state.company.bankName}</span></p>

                                                <p className="text-muted mb-2 font-13"><strong>Account Name :</strong> <span className="ml-2">{this.state.company.accountName}</span></p>

                                                <p className="text-muted mb-1 font-13"><strong>Account Number :</strong> <span className="ml-2">{this.state.company.accountNumber}</span></p>
                                            </div>

                                            <ul className="social-list list-inline mt-3 mb-0">
                                                <li className="list-inline-item">
                                                    <a href="#" className="social-list-item border-primary text-primary"><i
                                                        className="mdi mdi-facebook"></i></a>
                                                </li>
                                                <li className="list-inline-item">
                                                    <a href="#" className="social-list-item border-danger text-danger"><i
                                                        className="mdi mdi-google"></i></a>
                                                </li>
                                                <li className="list-inline-item">
                                                    <a href="#" className="social-list-item border-info text-info"><i
                                                        className="mdi mdi-twitter"></i></a>
                                                </li>
                                                <li className="list-inline-item">
                                                    <a href="#" className="social-list-item border-secondary text-secondary"><i
                                                        className="mdi mdi-github"></i></a>
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="card-box">

                                            <h4 className="header-title mb-3">Manager<sub>(s)</sub></h4>

                                            <button type="button" className="btn btn-success btn-xs waves-effect waves-light" data-toggle="modal" data-target="#standard-modal">
                                                <span className="btn-label"><i className="mdi mdi-plus"></i></span>New Manager
                                            </button>


                                            <div className="inbox-widget" data-simplebar style={{ maxHeight: 350 }}>

                                                {this.state.managers.map((item, index) =>
                                                    <div className="inbox-item" key={index}>
                                                        <div className="inbox-item-img"><img src="../assets/images/users/user-2.jpg" className="rounded-circle" alt="" /></div>
                                                        <p className="inbox-item-author">{item.name}</p>
                                                        <p className="inbox-item-text">{item.phone}</p>
                                                        <p className="inbox-item-date">
                                                            <a href="#" className="btn btn-sm btn-link text-info font-13"> {item.email} </a>
                                                        </p>
                                                    </div>
                                                )}


                                            </div>

                                        </div>

                                    </div>

                                    {this.state.isEdit
                                        ? <div className="col-lg-8 col-xl-8">
                                            <div className="card-box">
                                                <ul className="nav nav-pills navtab-bg nav-justified">

                                                    <li className="nav-item">
                                                        <a href="#settings" data-toggle="tab" aria-expanded="false" className="nav-link">
                                                            Account
                                            </a>
                                                    </li>
                                                </ul>
                                                <div className="tab-content">

                                                    <div className="tab-pane" id="settings">
                                                        <form>
                                                            <h5 className="mb-4 text-uppercase"><i className="mdi mdi-account-circle mr-1"></i> Personal Info</h5>
                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <div className="form-group">
                                                                        <label htmlFor="firstname">First Name</label>
                                                                        <input type="text" className="form-control" id="firstname" value={this.state.firstName} placeholder="Enter first name" disabled />
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <div className="form-group">
                                                                        <label htmlFor="lastname">Last Name</label>
                                                                        <input type="text" className="form-control" id="lastname" value={this.state.lastName} placeholder="Enter last name" disabled />
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <div className="form-group">
                                                                        <label htmlFor="firstname">Phone Number</label>
                                                                        <input type="text" className="form-control" id="phone" value={this.state.phone} placeholder="Enter phone number" disabled />
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <div className="form-group">
                                                                        <label htmlFor="firstname">Email</label>
                                                                        <input type="text" className="form-control" id="phone" value={this.state.username} disabled />
                                                                    </div>
                                                                </div>

                                                            </div>

                                                            {/* <div className="row">
                                                    <div className="col-12">
                                                        <div className="form-group">
                                                            <label htmlFor="userbio">Bio</label>
                                                            <textarea className="form-control" id="userbio" rows="4" placeholder="Write something..."></textarea>
                                                        </div>
                                                    </div> 
                                                </div>  */}

                                                            <h5 className="mb-3 text-uppercase bg-light p-2"><i className="mdi mdi-office-building mr-1"></i> Company Info</h5>
                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <div className="form-group">
                                                                        <label htmlFor="companyname">Company Name</label>
                                                                        <input type="text" className="form-control" id="companyname" onChange={(e) => { this.setState({ companyName: e.target.value }) }} value={this.state.company.companyName} placeholder="Enter company name" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <div className="form-group">
                                                                        <label htmlFor="cwebsite">Company Address</label>
                                                                        <input type="text" className="form-control" id="cwebsite" onChange={(e) => { this.setState({ companyAddress: e.target.value }) }} value={this.state.company.companyAddress} placeholder="Enter company address" />
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="row">
                                                                <div className="col-md-4">
                                                                    <div className="form-group">
                                                                        <label htmlFor="companyname">Bank Name</label>
                                                                        <select onChange={this.handleBankSelection} className="form-control" id="bankName">
                                                                            <option defaultValue disabled>Choose Bank</option>
                                                                            {this.state.bankList.map((item, index) =>
                                                                                <option key={index} value={index}>{item.name}</option>
                                                                            )}
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <div className="form-group">
                                                                        <label htmlFor="cwebsite">Account Number</label>
                                                                        <input onChange={this.handleAccountNumber} type="text" className="form-control" id="accountNumber" value={this.state.company.accountNumber} placeholder="Enter account number" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <div className="form-group">
                                                                        <label htmlFor="cwebsite">Account Name</label>
                                                                        <input type="text" className="form-control" id="accountName" value={this.state.company.accountName} disabled />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="text-right">
                                                                {this.state.loading ?
                                                                    <button type="button" onClick={this.handleSubmit} disabled className="btn btn-success waves-effect waves-light mt-2">
                                                                        <span className="spinner-border spinner-border-sm mr-1" role="status" aria-hidden="true"></span> Saving...
                                                                </button>
                                                                    :
                                                                    <button type="button" onClick={this.handleSubmit} className="btn btn-success waves-effect waves-light mt-2"><i className="mdi mdi-content-save"></i> Save</button>
                                                                }
                                                            </div>

                                                            {/* <div className="text-right">
                                                                <button type="button" onClick={this.handleSubmit} className="btn btn-success waves-effect waves-light mt-2"><i className="mdi mdi-content-save"></i> Save</button>
                                                            </div> */}
                                                        </form>
                                                    </div>


                                                </div>
                                            </div>

                                        </div>
                                        : <></>
                                    }


                                </div>
                                {/* end row */}

                            </div> {/* container  */}

                        </div> {/* content  */}

                        {/* Footer Start  */}
                        <Footer />
                        {/* end Footer  */}

                    </div>

                    {/* ============================================================== */}
                    {/* End Page content */}
                    {/* ============================================================== */}


                </div>
                {/* END wrapper */}

                {/* Right bar overlay*/}
                <div className="rightbar-overlay"></div>
                <NotificationContainer />


                <div id="standard-modal" className="modal fade" tabindex="-1" role="dialog" aria-labelledby="standard-modalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title" id="standard-modalLabel">Add New Manager</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                            </div>
                            <form action="#" className="px-3">
                                <div className="modal-body">

                                    <div className="form-group">
                                        <label htmlFor="managerFullName">Full Name</label>
                                        <input className="form-control" onChange={(e) => { this.setState({ managerFullName: e.target.value }) }} type="text" required="" id="managerFullName" placeholder="Enter manager's full name" />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="managerEmail">Email address</label>
                                        <input className="form-control" onChange={(e) => { this.setState({ managerEmail: e.target.value }) }} type="email" id="managerEmail" required="" placeholder="john@deo.com" />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="managerPhone">Phone Number</label>
                                        <input className="form-control" onChange={(e) => { this.setState({ managerPhone: e.target.value }) }} type="text" required="" id="managerPhone" placeholder="Enter manager's phone number" />
                                    </div>

                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-light" data-dismiss="modal">Cancel</button>
                                        {this.state.loading ?
                                            <button type="button" disabled className="btn btn-primary">
                                                <span className="spinner-border spinner-border-sm mr-1" role="status" aria-hidden="true"></span> Saving...
                                        </button>
                                            :
                                            <button type="button" onClick={this.handleManagerSubmit} className="btn btn-primary">Save changes</button>
                                        }
                                    </div>


                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}