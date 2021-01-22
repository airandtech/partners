import { Component } from "react";
import { baseUrl, processResponse, getToken, formatDate, isActive } from '../../utilities';
import SideBar from '../../components/sidebar'
import TopBar from '../../components/topbar'
import Footer from '../../components/footer'
import { NotificationContainer, NotificationManager } from 'react-notifications';

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalTransactionsVolume: 0,
            totalTransactionsValue: 0.0,
            todayTransactionsVolume: 0,
            todayTransactionsValue: 0.0,
            totalSuccessfulVolume: 0,
            totalSuccessValue: 0.0,
            todayTransactions: [],
            totalTransactions: [],
            riders: [],
        }

    }

    componentDidMount = () => {
        this.loadDashboardStatistics();
    }

    loadDashboardStatistics = () => {
        const token = getToken();
        if (token) {
            fetch(baseUrl() + 'api/company/dashboard', {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                }
            })
                .then(processResponse)
                .then((res) => {
                    if (res.statusCode === 200 && res.data.status) {
                        NotificationManager.success("Dashboard updated", 'Success', 5000);
                        console.log(res.data)
                        console.log("DATA GOTTEN")
                        const {
                            totalTransactionsVolume, totalTransactionsValue, todayTransactionsVolume,
                            todayTransactionsValue, totalSuccessfulVolume, totalSuccessValue,
                            todayTransactions, totalTransactions, riders
                        } = res.data.data;
                        this.setState({
                            totalTransactionsVolume, totalTransactionsValue, todayTransactionsVolume,
                            todayTransactionsValue, totalSuccessfulVolume, totalSuccessValue,
                            todayTransactions, totalTransactions, riders
                        })

                    } else {
                        NotificationManager.error(res.data.message, 'Failed', 5000);
                        console.log("FAILED: ", res.data.message)
                    }
                })
                .catch((error) => {
                    NotificationManager.error("Oops! we couldn't complete your request, please try again later", 'Failed', 5000);
                    console.log("FAILED :", error)
                });
        }
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

                            {/* Start Content*/}
                            <div className="container-fluid">

                                {/* start page title */}
                                <div className="row">
                                    <div className="col-12">
                                        <div className="page-title-box">
                                            <div className="page-title-right">
                                                <form className="form-inline">
                                                    <div className="form-group">
                                                        <div className="input-group input-group-sm">
                                                            <input type="text" className="form-control border" id="dash-daterange" />
                                                            <div className="input-group-append">
                                                                <span className="input-group-text bg-blue border-blue text-white">
                                                                    <i className="mdi mdi-calendar-range"></i>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <a href="#" className="btn btn-blue btn-sm ml-2">
                                                        <i className="mdi mdi-autorenew"></i>
                                                    </a>
                                                    <a href="#" className="btn btn-blue btn-sm ml-1">
                                                        <i className="mdi mdi-filter-variant"></i>
                                                    </a>
                                                </form>
                                            </div>
                                            <h4 className="page-title">Dashboard</h4>
                                        </div>
                                    </div>
                                </div>
                                {/* end page title */}

                                <div className="row">
                                    <div className="col-md-6 col-xl-3">
                                        <div className="widget-rounded-circle card-box">
                                            <div className="row">
                                                <div className="col-6">
                                                    <div className="avatar-lg rounded-circle bg-soft-primary border-primary border">
                                                        <i className="fe-heart font-22 avatar-title text-primary"></i>
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="text-right">
                                                        <h3 className="mt-1">₦<span data-plugin="counterup">{this.state.totalSuccessValue}</span></h3>
                                                        <p className="text-muted mb-1 text-truncate">Total Revenue</p>
                                                    </div>
                                                </div>
                                            </div> {/* end row*/}
                                        </div> {/* end widget-rounded-circle*/}
                                    </div> {/* end col*/}

                                    <div className="col-md-6 col-xl-3">
                                        <div className="widget-rounded-circle card-box">
                                            <div className="row">
                                                <div className="col-6">
                                                    <div className="avatar-lg rounded-circle bg-soft-success border-success border">
                                                        <i className="fe-shopping-cart font-22 avatar-title text-success"></i>
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="text-right">
                                                        <h3 className="text-dark mt-1"><span data-plugin="counterup">{this.state.todayTransactionsVolume}</span></h3>
                                                        <p className="text-muted mb-1 text-truncate">Today's Sales</p>
                                                    </div>
                                                </div>
                                            </div> {/* end row*/}
                                        </div> {/* end widget-rounded-circle*/}
                                    </div> {/* end col*/}

                                    <div className="col-md-6 col-xl-3">
                                        <div className="widget-rounded-circle card-box">
                                            <div className="row">
                                                <div className="col-6">
                                                    <div className="avatar-lg rounded-circle bg-soft-info border-info border">
                                                        <i className="fe-bar-chart-line- font-22 avatar-title text-info"></i>
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="text-right">
                                                        <h3 className="text-dark mt-1"><span data-plugin="counterup">{this.state.todayTransactionsValue}</span></h3>
                                                        <p className="text-muted mb-1 text-truncate">Today's Orders</p>
                                                    </div>
                                                </div>
                                            </div> {/* end row*/}
                                        </div> {/* end widget-rounded-circle*/}
                                    </div> {/* end col*/}

                                    <div className="col-md-6 col-xl-3">
                                        <div className="widget-rounded-circle card-box">
                                            <div className="row">
                                                <div className="col-6">
                                                    <div className="avatar-lg rounded-circle bg-soft-warning border-warning border">
                                                        <i className="fe-eye font-22 avatar-title text-warning"></i>
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="text-right">
                                                        <h3 className="text-dark mt-1"><span data-plugin="counterup">{this.state.totalTransactionsVolume}</span></h3>
                                                        <p className="text-muted mb-1 text-truncate">Total Orders</p>
                                                    </div>
                                                </div>
                                            </div> {/* end row*/}
                                        </div> {/* end widget-rounded-circle*/}
                                    </div> {/* end col*/}
                                </div>


                                {/* end row*/}

                                {/* <div className="row">
                                    <div className="col-lg-4">
                                        <div className="card-box">
                                            <div className="dropdown float-right">
                                                <a href="#" className="dropdown-toggle arrow-none card-drop" data-toggle="dropdown" aria-expanded="false">
                                                    <i className="mdi mdi-dots-vertical"></i>
                                                </a>
                                                <div className="dropdown-menu dropdown-menu-right">
                                                   
                                                    <a href="#" className="dropdown-item">Sales Report</a>
                                                   
                                                    <a href="#" className="dropdown-item">Export Report</a>
                                                   
                                                    <a href="#" className="dropdown-item">Profit</a>
                                                    
                                                    <a href="#" className="dropdown-item">Action</a>
                                                </div>
                                            </div>

                                            <h4 className="header-title mb-0">Total Revenue</h4>

                                            <div className="widget-chart text-center" dir="ltr">

                                                <div id="total-revenue" className="mt-0" data-colors="#f1556c"></div>

                                                <h5 className="text-muted mt-0">Total sales made today</h5>
                                                <h2>$178</h2>

                                                <p className="text-muted w-75 mx-auto sp-line-2">Traditional heading elements are designed to work best in the meat of your page content.</p>

                                                <div className="row mt-3">
                                                    <div className="col-4">
                                                        <p className="text-muted font-15 mb-1 text-truncate">Target</p>
                                                        <h4><i className="fe-arrow-down text-danger mr-1"></i>$7.8k</h4>
                                                    </div>
                                                    <div className="col-4">
                                                        <p className="text-muted font-15 mb-1 text-truncate">Last week</p>
                                                        <h4><i className="fe-arrow-up text-success mr-1"></i>$1.4k</h4>
                                                    </div>
                                                    <div className="col-4">
                                                        <p className="text-muted font-15 mb-1 text-truncate">Last Month</p>
                                                        <h4><i className="fe-arrow-down text-danger mr-1"></i>$15k</h4>
                                                    </div>
                                                </div>

                                            </div>
                                        </div> 
                                    </div> 

                                    <div className="col-lg-8">
                                        <div className="card-box pb-2">
                                            <div className="float-right d-none d-md-inline-block">
                                                <div className="btn-group mb-2">
                                                    <button type="button" className="btn btn-xs btn-light">Today</button>
                                                    <button type="button" className="btn btn-xs btn-light">Weekly</button>
                                                    <button type="button" className="btn btn-xs btn-secondary">Monthly</button>
                                                </div>
                                            </div>

                                            <h4 className="header-title mb-3">Sales Analytics</h4>

                                            <div dir="ltr">
                                                <div id="sales-analytics" className="mt-4" data-colors="#1abc9c,#4a81d4"></div>
                                            </div>
                                        </div> 
                                    </div> 
                                </div> */}


                                <div className="row">
                                    <div className="col-xl-6">
                                        <div className="card-box">
                                            <div className="dropdown float-right">
                                                <a href="#" className="dropdown-toggle arrow-none card-drop" data-toggle="dropdown" aria-expanded="false">
                                                    <i className="mdi mdi-dots-vertical"></i>
                                                </a>
                                                <div className="dropdown-menu dropdown-menu-right">

                                                    <a href="#" className="dropdown-item">Edit Report</a>

                                                    <a href="#" className="dropdown-item">Export Report</a>

                                                    <a href="#" className="dropdown-item">Action</a>
                                                </div>
                                            </div>

                                            <h4 className="header-title mb-3">Top 5 Active Riders</h4>

                                            <div className="table-responsive">
                                            
                                                <table className="table table-borderless table-hover table-nowrap table-centered m-0">

                                                    <thead className="thead-light">
                                                        <tr>
                                                            <th colSpan="2">Profile</th>
                                                            <th>Phone</th>
                                                            <th>Last Seen</th>
                                                            <th>Status</th>
                                                            {/* <th>Action</th> */}
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {this.state.riders.map((item, index) =>
                                                            <tr key={index}>
                                                                <td style={{ width: 36 }}>
                                                                    <img src="../assets/images/users/user-2.jpg" alt="contact-img" title="contact-img" className="rounded-circle avatar-sm" />
                                                                </td>

                                                                <td>
                                                                    <h5 className="m-0 font-weight-normal">{item.user.firstName} {item.user.lastName}</h5>
                                                                    {/* <p className="mb-0 text-muted"><small>Member Since 2017</small></p> */}
                                                                </td>

                                                                <td>
                                                                    <i className="mdi mdi-phone text-primary"></i> {item.user.phone}
                                                                </td>

                                                                <td>
                                                                    {formatDate(item.lastModified)}
                                                                </td>

                                                                <td>
                                                                    <td>{isActive(item.lastModified) ? <span className="badge label-table badge-success">Active</span> : <span className="badge label-table badge-danger">InActive</span>}</td>
                                                                </td>

                                                                {/* <td>
                                                                    <a href="#" className="btn btn-xs btn-light"><i className="mdi mdi-plus"></i></a>
                                                                    <a href="#" className="btn btn-xs btn-danger"><i className="mdi mdi-minus"></i></a>
                                                                </td> */}
                                                            </tr>
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div> {/* end col */}

                                    <div className="col-xl-6">
                                        <div className="card-box">
                                            <div className="dropdown float-right">
                                                <a href="#" className="dropdown-toggle arrow-none card-drop" data-toggle="dropdown" aria-expanded="false">
                                                    <i className="mdi mdi-dots-vertical"></i>
                                                </a>
                                                <div className="dropdown-menu dropdown-menu-right">
                                                    {/* item*/}
                                                    <a href="#" className="dropdown-item">Edit Report</a>
                                                    {/* item*/}
                                                    <a href="#" className="dropdown-item">Export Report</a>
                                                    {/* item*/}
                                                    <a href="#" className="dropdown-item">Action</a>
                                                </div>
                                            </div>

                                            <h4 className="header-title mb-3">Latest Orders</h4>

                                            <div className="table-responsive">
                                                <table className="table table-borderless table-nowrap table-hover table-centered m-0">

                                                    <thead className="thead-light">
                                                        <tr>
                                                            <th>Customer</th>
                                                            <th>Date</th>
                                                            <th>Amount</th>
                                                            <th>Status</th>
                                                            <th>Payment Status</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {this.state.todayTransactions.map((index, item)=> 
                                                            
                                                        <tr>
                                                            <td>
                                                                <h5 className="m-0 font-weight-normal">{item.requestorIdentifier}</h5>
                                                            </td>

                                                            <td>
                                                                {formatDate(item.lastModified)}
                                                    </td>

                                                            <td>
                                                            ₦{item.cost}
                                                    </td>

                                                            <td>

                                                            {item.status === "01" ? <span className="badge bg-soft-warning text-warning">Pending</span> : item.status === "00" ? <span className="badge bg-soft-success text-success">Completed</span> : item.status === "02" ? <span className="badge bg-soft-info text-info">Created</span> : <span className="badge bg-soft-info text-info">Created</span>}
                                                            </td>

                                                            <td>
                                                                {item.paymentStatus === 0 ? <span className="badge bg-soft-danger text-danger">UnPaid</span> : <span className="badge bg-soft-success text-success">Paid</span>}
                                                                <a href="#" className="btn btn-xs btn-light"><i className="mdi mdi-pencil"></i></a>
                                                            </td>
                                                        </tr>

                                                        )}
                                                    </tbody>
                                                </table>
                                            </div> {/* end .table-responsive*/}
                                        </div> {/* end card-box*/}
                                    </div> {/* end col */}
                                </div>
                                {/* end row */}

                            </div> {/* container */}

                        </div> {/* content */}

                        {/* Footer Start */}

                        <Footer />

                        {/* end Footer */}

                    </div>

                    {/* ============================================================== */}
                    {/* End Page content */}
                    {/* ============================================================== */}


                </div>
                {/* END wrapper */}

                {/* Right bar overlay*/}
                <div className="rightbar-overlay"></div>
                <NotificationContainer />
            </div>
        )
    }
}