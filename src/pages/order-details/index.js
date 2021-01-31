import { Component } from "react";
import { baseUrl, processResponse, getToken, formatDate, formatMoney } from '../../utilities';
import SideBar from '../../components/sidebar'
import TopBar from '../../components/topbar'
import Footer from '../../components/footer'
import { NotificationContainer, NotificationManager } from 'react-notifications';


const ls = require('local-storage');
const queryString = require('query-string');

export default class OrderDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            orders: [],
            pickupDetails: {},
            orderId: '',
            distance: '',
            duration: '',
            totalCost: 0,
        }

    }

    componentDidMount = () => {
        let username = ls.get('username');
        let isSetupComplete = ls.get('isSetupComplete');
        this.setState({ username, isSetupComplete });
        this.loadOrderDetails();
    }

    loadOrderDetails = () => {
        const search = this.props.history.location.search;
        const params = queryString.parse(search);
        const riderId = params.rider;
        const orderId = params.id;

        fetch(baseUrl() + 'api/dispatch/order/' + orderId, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(processResponse)
            .then((res) => {
                if (res.statusCode === 200 && res.data.status) {
                    NotificationManager.success("Order details retrieved", 'Success', 5000);
                    console.log(res.data)
                    const data = res.data.data;
                    this.setState({ pickupDetails: data.pickupDetails, orders: data.orders })
                    if (data.orders.length > 0) {
                        this.setState({ distance: data.orders[0].distance, orderId: data.orders[0].delivery.id })
                        const totalCost = data.orders.reduce((a, b) => a + b.cost, 0)
                        this.setState({ totalCost });
                    }

                } else {
                    NotificationManager.error(res.data.message, 'Failed', 5000);
                }
            })
            .catch((error) => {
                NotificationManager.error("Oops! we couldn't complete your request, please try again later", 'Failed', 5000);
            });
    }

    handleAcceptOrder = () => {
        const { location, history } = this.props

        const search = this.props.history.location.search;
        const params = queryString.parse(search);
        const riderId = params.riderid;
        const transactionId = params.id;

        // const token = getToken();
        // if (token) {
        this.setState({ loading: true })
        fetch(baseUrl() + `api/dispatch/accept/${transactionId}/${this.state.pickupDetails.email}/${riderId}`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': 'Bearer ' + token,
            }
        })
            .then(processResponse)
            .then((res) => {
                this.setState({ loading: false })
                if (res.statusCode === 200 && res.data.status) {

                    NotificationManager.success("Order Accepted", 'Success', 5000);

                    setTimeout(() => {
                        history.push("/dashboard")
                    }, 5000);
                } else {
                    NotificationManager.error(res.data.message, 'Failed', 5000);
                }
            })
            .catch((error) => {
                this.setState({ loading: false })
                NotificationManager.error("Oops! we couldn't complete your request, please try again later", 'Failed', 5000);
                //console.log("FAILED :", error)
            });
        // } else {
        //     NotificationManager.warning("Please sign in to accept", 'Failed', 5000);
        // }
    }

    handleDeclineOrder = () => {
        const { location, history } = this.props
        NotificationManager.error("Order Declined", 'Declined', 5000);

        setTimeout(() => {
            history.push("/dashboard")
        }, 5000);
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
                                                    <li className="breadcrumb-item active">Order Notification</li>
                                                </ol>
                                            </div>
                                            <h4 className="page-title">Order Notification</h4>
                                            {/* <p>{this.props.location.id}</p> */}
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
                                <div class="row">
                                    <div class="col-xl-8 col-lg-6">

                                        <div class="card d-block">
                                            <div class="card-body">
                                                <h3 class="mt-0 font-20">
                                                    New Dispatch Request !!!
                                        </h3>
                                                <div class="badge badge-warning mb-3">Pending</div>


                                                <div className="row">


                                                    <div class="card-box mb-2">
                                                        <div class="row align-items-center">
                                                            <div class="col-sm-8">
                                                                <div class="media">
                                                                    {/* <img class="d-flex align-self-center mr-3 rounded-circle" src="../assets/images/companies/amazon.png" alt="Generic placeholder image" height="64" /> */}
                                                                    <div class="media-body">
                                                                        <h4 class="mt-0 mb-2 font-16">Pickup Details</h4>
                                                                        <p class="mb-1"><b>Name:</b> {this.state.pickupDetails.name}</p>
                                                                        <p class="mb-1"><b>Email:</b> {this.state.pickupDetails.email}</p>
                                                                        <p class="mb-1"><b>Phone:</b> {this.state.pickupDetails.phone}</p>
                                                                        <p class="mb-1"><b>Address:</b> {this.state.pickupDetails.address}</p>
                                                                        {/* <p class="mb-0"><b>Phone:</b> Ecommerce</p> */}

                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="col-sm-4">
                                                                <div class="text-center my-3 my-sm-0">
                                                                    <p class="mb-0 text-muted">{formatDate(this.state.pickupDetails.dateCreated)}</p>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>




                                                </div>
                                                <hr />
                                                <h5>Delivery Details:</h5>

                                                {this.state.orders.map((item, index) =>
                                                    <div className="row" key={index}>
                                                        <div class="card-box mb-2">
                                                            <div class="row align-items-center">
                                                                <div class="col-sm-12">
                                                                    <div class="media">
                                                                        {/* <img class="d-flex align-self-center mr-3 rounded-circle" src="../assets/images/companies/amazon.png" alt="Generic placeholder image" height="64" /> */}
                                                                        <div class="media-body">
                                                                            <p class="mb-1"><b>Name:</b> {item.delivery.name}</p>
                                                                            <p class="mb-1"><b>Address:</b> {item.delivery.address}</p>
                                                                            <p class="mb-1"><b>Phone:</b> {item.delivery.phone}</p>
                                                                            <p class="mb-1"><b>Phone:</b> {item.delivery.email}</p>
                                                                            <p class="mb-1"><b>Item Description:</b> {item.delivery.description}</p>
                                                                            <p class="mb-0"><b>Amount:</b> ₦ {formatMoney(item.cost)}</p>
                                                                            {/* <p class="mb-0">Your dispatcher is about {item.duration} ({item.distance}) from the location</p> */}
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                )}


                                                <div class="mb-4">
                                                    <h5>Info</h5>
                                                    <div class="text-uppercase">
                                                        <a href="#" class="badge badge-soft-primary mr-1">You are required to alert your dispatcher immediately or risk losing this order.</a>
                                                    </div>
                                                </div>

                                                <div class="row">
                                                    <div class="col-md-4">
                                                        <div class="mb-4">
                                                            <h5>Order ID </h5>
                                                            <p><small class="text-muted">#</small>{this.state.orderId}</p>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <div class="mb-4">
                                                            <h5>Distance</h5>
                                                            <p>{this.state.distance}</p>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <div class="mb-4">
                                                            <h5>Total Amount</h5>
                                                            <p>₦ {formatMoney(this.state.totalCost)}</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div>
                                                    <hr />
                                                    {this.state.loading ?
                                                        <button type="button" class="btn btn-info btn-sm waves-effect waves-light mr-2" disabled>
                                                            <span className="spinner-border spinner-border-sm mr-1" role="status" aria-hidden="true"></span>Processing ...
                                                        </button>
                                                        :
                                                        <>
                                                            <button onClick={this.handleAcceptOrder} type="button" class="btn btn-success btn-sm waves-effect waves-light mr-2">Accept</button>
                                                            <button onClick={this.handleDeclineOrder} type="button" class="btn btn-danger btn-sm waves-effect">Decline</button>
                                                        </>
                                                    }


                                                </div>

                                            </div>

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


                <div id="order-accepted" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
                    <div class="modal-dialog modal-sm">
                        <div class="modal-content modal-filled bg-success">
                            <div class="modal-body p-4">
                                <div class="text-center">
                                    <i class="dripicons-checkmark h1 text-white"></i>
                                    <h4 class="mt-2 text-white">Well Done!</h4>
                                    <p class="mt-3 text-white">Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam.</p>
                                    <button type="button" class="btn btn-light my-2" data-dismiss="modal">Continue</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="order-unavailable" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
                    <div class="modal-dialog modal-sm">
                        <div class="modal-content modal-filled bg-danger">
                            <div class="modal-body p-4">
                                <div class="text-center">
                                    <i class="dripicons-wrong h1 text-white"></i>
                                    <h4 class="mt-2 text-white">Oh snap!</h4>
                                    <p class="mt-3 text-white">Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam.</p>
                                    <button type="button" class="btn btn-light my-2" data-dismiss="modal">Continue</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}