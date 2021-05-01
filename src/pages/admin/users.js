import { Component } from "react";
import { baseUrl, processResponse, getToken, formatDate, isActive } from '../../utilities';
import SideBar from '../../components/sidebar'
import TopBar from '../../components/topbar'
import Footer from '../../components/footer'
import { NotificationContainer, NotificationManager } from 'react-notifications';
import DataTable from 'react-data-table-component';
import Select from 'react-select'


const ls = require('local-storage');



export default class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            loadingUsers: true,
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
            fetch(baseUrl() + 'users', {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                }
            })
                .then(processResponse)
                .then((res) => {
                    if (res.statusCode === 200) {
                        NotificationManager.success("Users retrieved", 'Success', 5000);

                        const data = res.data;
                        //console.log(riders)
                        this.setState({ data, loadingUsers: false })
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

    render() {

        const columns = [
            // {
            //     name: '#',
            //     selector: 'id',
            //     sortable: true,
            // },
            {
                name: 'Username',
                selector: 'username',
                sortable: true,
                wrap: true,
            },
            {
                name: 'First Name',
                selector: 'firstName',
                sortable: true,
            },
            {
                name: 'Phone',
                selector: 'phone',
                sortable: true,
            },
            {
                name: 'Role',
                selector: 'role',
                sortable: true,
            },
            {
                name: 'Status',
                selector: 'isVerified',
                sortable: true,
                cell: item => {
                    if (item.isVerified === false) return <span className="badge bg-soft-warning text-warning">Unverified</span>
                    if (item.isVerified === true) return <span className="badge bg-soft-success text-success">Verified</span>
                },
            },
            {
                name: 'Has Company',
                selector: 'isCompany',
                sortable: true,
                cell: item => {
                    if (item.isCompany === false) return <span className="badge bg-soft-warning text-warning">NO</span>
                    if (item.isCompany === true) return <span className="badge bg-soft-success text-success">YES</span>
                },
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
                                                    <li className="breadcrumb-item active">Users</li>
                                                </ol>
                                            </div>
                                            <h4 className="page-title">List of users</h4>
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
                                            <h4 className="header-title">Users</h4>

                                            <DataTable
                                                title=""
                                                striped={true}
                                                highlightOnHover={true}
                                                pagination={true}
                                                progressPending={this.state.loadingUsers}
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