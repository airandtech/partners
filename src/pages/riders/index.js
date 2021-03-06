import { Component } from "react";
import { baseUrl, processResponse, getToken, formatDate, isActive } from '../../utilities';
import SideBar from '../../components/sidebar'
import TopBar from '../../components/topbar'
import Footer from '../../components/footer'
import { NotificationContainer, NotificationManager } from 'react-notifications';


const ls = require('local-storage');

export default class Riders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            riders: [],
            riderFullName: '',
            riderPhone: ''
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
                    if (res.statusCode === 200 && res.data.status) {
                        NotificationManager.success("Riders retrieved", 'Success', 5000);
                        const riders = res.data.data.riders;
                        this.setState({ riders: res.data.data.riders })

                    } else {
                        NotificationManager.error(res.data.message, 'Failed', 5000);
                        //console.log("FAILED: ", res.data.message)
                    }
                })
                .catch((error) => {
                    NotificationManager.error("Oops! we couldn't complete your request, please try again later", 'Failed', 5000);
                    //console.log("FAILED :", error)
                });
        }
    }

    handleRiderSubmit = () => {
        this.setState({loading: true})
        const token = getToken();
        fetch(baseUrl() + 'api/company/riders', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify({
                ridersDetails: [
                    {
                        Name: this.state.riderFullName,
                        Phone: this.state.riderPhone
                    }
                ]
            }),
        })
        .then(processResponse)
        .then((res) => {
            //console.log(res.data)
            if (res.statusCode === 200 && res.data.status) {
                this.setState({ loading: false, isEdit: false })
                NotificationManager.success("Rider added", 'Success', 5000);
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
            NotificationManager.error("Oops! we couldn't complete your request, please try again later", 'Failed', 5000);
            this.setState({ loading: false })
        });
    }

    render() {
        return (
            <div className="loading"
                data-layout='{"mode": "light", "width": "fluid", "menuPosition": "fixed", "sidebar": { "color": "light", "size": "default", "showuser": false}, "topbar": {"color": "light"}, "showRightSidebarOnPageLoad": true}'
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
                                                    <li className="breadcrumb-item active">Riders</li>
                                                </ol>
                                            </div>
                                            <h4 className="page-title">Riders</h4>
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
                                    <div className="col-sm-12">
                                        <div className="card-box">
                                            <h4 className="header-title">List of Riders</h4>
                                            {/* <p className="sub-header">
                                        Add or remove rows from your FooTable.
                                    </p> */}

                                            <div className="mb-2">
                                                <div className="row">
                                                    <div className="col-12 text-sm-center form-inline">
                                                        <div className="form-group mr-2">
                                                            <button id="demo-btn-addrow" className="btn btn-primary" data-toggle="modal" data-target="#standard-modal" type="button"><i className="mdi mdi-plus-circle mr-2"></i> Add New Rider</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {this.state.riders.length > 0 ? 
                                            <table id="datatable-buttons" className="table table-striped dt-responsive nowrap w-100">
                                                <thead>
                                                    <tr>
                                                        <th>SN</th>
                                                        <th>Name</th>
                                                        <th>Phone</th>
                                                        <th>Last Seen</th>
                                                        <th>Status</th>
                                                    </tr>
                                                </thead>


                                                <tbody>
                                                    {this.state.riders.map((item, index) => 
                                                        <tr key={index}>
                                                            <td>{index+1}</td>
                                                            <td>{item.user.firstName} {item.user.lastName}</td>
                                                            <td>{item.user.phone}</td>
                                                            <td>{formatDate(item.lastModified)}</td>
                                                            <td>{isActive(item.lastModified) ? <span className="badge label-table badge-success">Active</span> : <span className="badge label-table badge-danger">InActive</span>}</td>
                                                        </tr>
                                                    )}

                                                </tbody>
                                            </table>
                                            : <></>}
                                        </div>
                                    </div>
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


                <div id="standard-modal" className="modal fade" tabIndex="-1" role="dialog" aria-labelledby="standard-modalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title" id="standard-modalLabel">Add New Rider</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">??</button>
                            </div>
                            <form action="#" className="px-3">
                                <div className="modal-body">

                                    <div className="form-group">
                                        <label htmlFor="managerFullName">Full Name</label>
                                        <input className="form-control" onChange={(e) => { this.setState({ riderFullName: e.target.value }) }} type="text" required="" id="managerFullName" placeholder="Enter rider's full name" />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="managerPhone">Phone Number</label>
                                        <input className="form-control" onChange={(e) => { this.setState({ riderPhone: e.target.value }) }} type="text" required="" id="managerPhone" placeholder="Enter rider's phone number" />
                                    </div>

                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-light" data-dismiss="modal">Cancel</button>
                                        {this.state.loading ?
                                            <button type="button" disabled className="btn btn-primary">
                                                <span className="spinner-border spinner-border-sm mr-1" role="status" aria-hidden="true"></span> Saving...
                                        </button>
                                            :
                                            <button type="button" onClick={this.handleRiderSubmit} className="btn btn-primary">Save changes</button>
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