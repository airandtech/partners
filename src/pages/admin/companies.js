import { Component } from "react";
import { baseUrl, processResponse, getToken, formatDate, isActive } from '../../utilities';
import SideBar from '../../components/sidebar'
import TopBar from '../../components/topbar'
import Footer from '../../components/footer'
import { NotificationContainer, NotificationManager } from 'react-notifications';
import DataTable from 'react-data-table-component';
import Select from 'react-select'


const ls = require('local-storage');



export default class Companies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            loadingCompany: true,
            isSetupComplete: false,
            data: [],
        }

    }

    componentDidMount = () => {
        let isSetupComplete = ls.get('isSetupComplete');
        this.setState({ isSetupComplete })
        this.loadCompanies()
    }

    loadCompanies = () => {
        const token = getToken();
        if (token) {
            fetch(baseUrl() + 'api/company', {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                }
            })
                .then(processResponse)
                .then((res) => {
                    if (res.statusCode === 200 && res.data.status) {
                        NotificationManager.success("Companies retrieved", 'Success', 5000);

                        const data = res.data.data;
                        //console.log(riders)
                        this.setState({ data, loadingCompany: false })
                        const options = []
                        // riders.forEach((item, index) => {
                        //     let option = {
                        //         label: item.user.firstName,
                        //         value: item.id
                        //     }
                        //     options.push(option)
                        // })
                        // this.setState({ ridersSelectList: options })

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
                        NotificationManager.success("Companies fetched", 'Success', 5000);
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
    
    render() {

        const columns = [
            // {
            //     name: '#',
            //     selector: 'id',
            //     sortable: true,
            // },
            {
                name: 'Name',
                selector: 'companyName',
                sortable: true,
            },
            {
                name: 'Address',
                selector: 'companyAddress',
                sortable: true,
                wrap: true,
            },
            {
                name: 'Bank Name',
                selector: 'bankName',
                sortable: true,
            },
            {
                name: 'Account No.',
                selector: 'accountNumber',
                sortable: true,
            },
            {
                name: 'Account Name',
                selector: 'accountName',
                sortable: true,
            },
            {
                name: 'Date',
                selector: 'lastModified',
                sortable: true,
                right: true,
                cell: item => formatDate(item.lastModified)
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
                                                    <li className="breadcrumb-item active">Companies</li>
                                                </ol>
                                            </div>
                                            <h4 className="page-title">List of companies</h4>
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
                                            <h4 className="header-title">Companies</h4>

                                            <DataTable
                                                title=""
                                                striped={true}
                                                highlightOnHover={true}
                                                pagination={true}
                                                progressPending={this.state.loadingCompany}
                                                columns={columns}
                                                data={this.state.data}
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

            </div>
        )
    }
}