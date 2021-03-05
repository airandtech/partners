import { Component } from "react";
import { baseUrl, processResponse, getToken, formatDate, isActive } from '../../utilities';
import SideBar from '../../components/sidebar'
import TopBar from '../../components/topbar'
import Footer from '../../components/footer'
import { NotificationContainer, NotificationManager } from 'react-notifications';
import DataTable from 'react-data-table-component';
import Select from 'react-select'


const ls = require('local-storage');



export default class Orders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            totalTransactionsVolume: 0,
            totalTransactionsValue: 0.0,
            todayTransactionsVolume: 0,
            todayTransactionsValue: 0.0,
            totalSuccessfulVolume: 0,
            totalSuccessValue: 0.0,
            todayTransactions: [],
            totalTransactions: [],
            riders: [],
            orders: [],
            loadingOrders: true,
            orderId: 0,
            riderId: 0,
            ridersSelectList: []
        }

    }

    componentDidMount = () => {
        let username = ls.get('username');
        let isSetupComplete = ls.get('isSetupComplete');
        this.setState({ username, isSetupComplete })
        this.loadDashboardStatistics()
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
                        //NotificationManager.success("Riders retrieved", 'Success', 5000);

                        const riders = res.data.data.riders;
                        //console.log(riders)
                        this.setState({ riders })
                        const options = []
                        riders.forEach((item, index) => {
                            let option = {
                                label: item.user.firstName,
                                value: item.id
                            }
                            options.push(option)
                        })
                        this.setState({ ridersSelectList: options })

                    } else {
                        //NotificationManager.error(res.data.message, 'Failed', 5000);
                        console.log("FAILED: ", res.data.message)
                    }
                })
                .catch((error) => {
                    //NotificationManager.error("Oops! we couldn't complete your request, please try again later", 'Failed', 5000);
                    console.log("FAILED :", error)
                });
        }
    }

    loadDashboardStatistics = () => {
        const token = getToken();
        if (token) {
            fetch(baseUrl() + 'api/dispatch/orders/company?limit=90&offset=0', {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                }
            })
                .then(processResponse)
                .then((res) => {
                    if (res.statusCode === 200 && res.data.status) {
                        NotificationManager.success("Orders fetched", 'Success', 5000);
                        const orders = res.data.data;
                        this.setState({ orders, loadingOrders: false })

                    } else {
                        NotificationManager.error(res.data.message, 'Failed', 5000);
                    }
                })
                .catch((error) => {
                    NotificationManager.error("Oops! we couldn't complete your request, please try again later", 'Failed', 5000);
                });
        }
    }

    handleRiderSubmit = () => {
        if(this.state.riderId === 0){
            alert('Select a rider')
            return;
        }
        this.setState({ loading: true })
        const token = getToken();
        if (token) {
            fetch(baseUrl() + `api/dispatch/assign/${this.state.orderId}/${this.state.riderId}`, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                }
            })
                .then(processResponse)
                .then((res) => {
                    console.warn(res)
                    if (res.statusCode === 200 && res.data.status) {
                        NotificationManager.success("Order assigned to rider!!!", 'Success', 5000);

                        this.setState({ loading: false })
                        this.loadDashboardStatistics()

                    } else {
                        NotificationManager.error(res.data.message, 'Failed', 5000);
                        this.setState({ loading: false })
                        console.log("FAILED: ", res.data.message)
                    }
                })
                .catch((error) => {
                    NotificationManager.error("Oops! we couldn't complete your request, please try again later", 'Failed', 5000);
                    this.setState({ loading: false })
                    console.log("FAILED :", error)
                });
        }
    }


    render() {

        const columns = [
            {
                name: 'Customer',
                selector: 'requestorIdentifier',
                sortable: true,
            },
            {
                name: 'Date',
                selector: 'lastModified',
                sortable: true,
                right: true,
                cell: item => formatDate(item.lastModified)
            },
            {
                name: 'Amount',
                selector: 'cost',
                sortable: true,
                right: true,
                cell: item => `₦${item.cost}`
            },
            {
                name: 'Status',
                selector: 'status',
                sortable: true,
                right: true,
                cell: item => {
                    if (item.status === "01") return <span className="badge bg-soft-warning text-warning">Assigned</span>
                    if (item.status === "00") return <span className="badge bg-soft-success text-success">Delivered</span>
                    if (item.status === "02") return <span className="badge bg-soft-info text-info">Picked Up</span>
                    if (item.status === "03") return <span className="badge bg-soft-info text-info">Created</span>
                },
            },
            {
                name: 'Payment Status',
                selector: 'paymentStatus',
                sortable: true,
                right: true,
                cell: item => {
                    if (item.paymentStatus === 0) return <span className="badge bg-soft-danger text-danger">UnPaid</span>
                    else return <span className="badge bg-soft-success text-success">Paid</span>
                }
            },
            {
                name: 'Action',
                selector: 'status',
                sortable: true,
                right: true,
                cell: item => {
                    if (item.status === "03") {
                        return <button type="button" onClick={() => this.setState({ orderId: item.id })} data-toggle="modal" data-target="#assign-to-rider" className="btn btn-xs btn-primary">Assign to rider</button>
                    } else {
                        return <button type="button" onClick={() => this.setState({ orderId: item.id })} className="btn btn-sm btn-primary">View Details</button>
                    }

                },
            },
        ];

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
                                                    <li className="breadcrumb-item active">Orders</li>
                                                </ol>
                                            </div>
                                            <h4 className="page-title">Orders</h4>
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
                                            <h4 className="header-title">Transactions</h4>

                                            <DataTable
                                                title=""
                                                striped={true}
                                                highlightOnHover={true}
                                                pagination={true}
                                                progressPending={this.state.loadingOrders}
                                                columns={columns}
                                                data={this.state.orders}
                                            />

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


                <div id="assign-to-rider" className="modal fade" tabIndex="-1" role="dialog" aria-labelledby="standard-modalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title" id="standard-modalLabel">Assign order to rider</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                            </div>
                            <form action="#" className="px-3">
                                <div className="modal-body">

                                    <div className="form-group">
                                        <label htmlFor="managerFullName">Select Rider</label>

                                        <Select
                                            onChange={(selectedItem) => this.setState({ riderId: selectedItem.value })}
                                            options={this.state.ridersSelectList}
                                        />


                                    </div>



                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-light" data-dismiss="modal">Close</button>
                                        {this.state.loading ?
                                            <button type="button" disabled className="btn btn-primary">
                                                <span className="spinner-border spinner-border-sm mr-1" role="status" aria-hidden="true"></span> Assigning...
                                        </button>
                                            :
                                            <button type="button" onClick={this.handleRiderSubmit} className="btn btn-primary">Assign</button>
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