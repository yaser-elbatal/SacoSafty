import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Row, Table, Badge } from 'reactstrap';
import { Query } from 'react-apollo';
import { List_Reports } from '../../../../services/queries/Maintainance/MaintainanceReports/Reports';
import Loader from "../../Custom/Loader/Loader"
import Error from "../../Custom/Error/Error"
import NoResults from "../../Custom/NoResults/NoResults"


export default class ListReports extends Component {

    constructor(props) {
        super(props);

        this.state = {
            qString: {},
            branchId: false,
            companyId: false,
            targetCursor: "",
            cursor: "",
            limit: 10,
        }

    }


    componentDidMount() {
        this.setState({
            branchId: this.props.branchId,
            companyId: this.props.companyId,
            targetCursor: this.props.targetCursor || ""
        })

        window.addEventListener('scroll', this.listenToScroll);
    }

    async componentWillUnmount() {
        window.removeEventListener('scroll', this.listenToScroll);
    }

    componentDidUpdate(prevProps, prevState) {

        const { branchId, companyId } = this.props;
        if (branchId != prevProps.branchId || companyId != prevProps.companyId) {
            this.setState({
                ...(branchId && { branchId: parseInt(branchId) }),
                ...(companyId && { companyId: parseInt(companyId) }),
                cursor: "", targetCursor: ""
            })
        }
    }


    getDate(isoDate) {
        let date = new Date(isoDate).toLocaleString()
        date = date.split(',')[0].split('/').map(dat => (((dat < 10) && ("0" + dat)) || dat))
        date = date[1] + "/" + date[0] + "/" + date[2]

        return date;
    }

    ReportRow({ rep }) {
        let ind = rep.index + 1,
            repLink = `/branches/${rep.maintainance_report_branch.id}`,
            reportDetailsLink = `/maintainanceReportDetails/${rep.id}`,
            status =
                rep.status?
                    { val: "منتهى", clr: "success" } :
                    { val: "جديد", clr: "primary" }

        return (
            <tr>
                <th scope="row">{ind}</th>
                <td><Badge style={{ fontSize: "15px" }} color={status.clr}>{status.val}</Badge></td>
                {!rep.branchId && <td><Link to={repLink}>{rep.maintainance_report_branch.name_ar}</Link></td>}
                {!rep.companyId && <td>{rep.maintainance_report_company.company_name}</td>}
                <td>{rep.maintainance_date}</td>
                <td>{rep.system_type}</td>
                <td>{rep.visit_type}</td>
                <td>{new ListReports().getDate(rep.updated_at)}</td>
                <td>{new ListReports().getDate(rep.created_at)}</td>
                <td><Link className="btn btn-google-plus" to={reportDetailsLink}>عرض</Link></td>
            </tr>
        )
    }

    // shouldComponentUpdate(prevProps, prevState) {
    //     if (prevState.targetCursor != this.state.targetCursor) return false;
    //     return true;
    // }

    listenToScroll = async () => {
        const winScroll =
            document.body.scrollTop || document.documentElement.scrollTop

        const height =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight

        const scrolled = parseInt((winScroll / height) * 100)
        //...................................................

        if (this.state.cursor != this.state.targetCursor && scrolled > 95)
            this.setState({ cursor: this.state.targetCursor != -1 ? this.state.targetCursor : this.state.cursor })
    }


    ftchMor = fetchMore => {
        fetchMore({
            variables: {
                limit: this.state.limit,
                filterBranch: {
                    ...(this.state.branchId && { branch_id: { "_eq": parseInt(this.state.branchId) } }),
                    ...(this.state.companyId && { company_id: { "_eq": parseInt(this.state.companyId) } }),
                    id: { "_lt": this.state.cursor }
                }
            },
            updateQuery: (prev, { fetchMoreResult }) => {
                this.setState({
                    targetCursor: !fetchMoreResult.maintainance_report.length ?
                        -1 : fetchMoreResult.maintainance_report[fetchMoreResult.maintainance_report.length - 1].id
                });
                if (!fetchMoreResult) return prev;
                return Object.assign({}, prev, {
                    maintainance_report: [...prev.maintainance_report, ...fetchMoreResult.maintainance_report]
                });
            }
        });
    }


    render() {
        return (
            <div className="animated fadeIn">
                <Query
                    query={List_Reports}
                    variables={{
                        limit: this.state.limit,
                        filterBranch: !this.state.branchId && !this.state.companyId ? {} :
                            {
                                ...(this.state.branchId && { "branch_id": { "_eq": parseInt(this.state.branchId) } }),
                                ...(this.state.companyId && { "company_id": { "_eq": parseInt(this.state.companyId) } }),
                            }
                    }}
                    onCompleted={
                        data => {
                            if (!this.state.targetCursor)
                                this.setState({
                                    targetCursor: !data.maintainance_report.length ? "" :
                                        data.maintainance_report[data.maintainance_report.length - 1].id,
                                })
                        }
                    }
                >
                    {
                        ({ loading, error, data, fetchMore }) => {
                            if (loading) return (<Loader />);
                            if (error) return (<Error />);

                            if (this.state.cursor && this.state.cursor == this.state.targetCursor)
                                this.ftchMor(fetchMore)

                            if (data.maintainance_report.length) {
                                return (
                                    <div>
                                        <Card>
                                            <CardHeader><b>{
                                                this.props.branchId || this.props.companyId ?
                                                    `تقارير 
                                            ${this.props.branchId ? "الفرع" : ""} 
                                            ${this.props.branchId && this.props.companyId ? "و" : ""} 
                                            ${this.props.companyId ? "الشركة" : ""}`
                                                    :
                                                    "آخر التقارير"
                                            }</b></CardHeader>
                                            <CardBody>
                                                <Table responsive hover style={{ textAlign: "center" }}>
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">#</th>
                                                            <th scope="col">الحالة</th>
                                                            {!this.props.branchId && <th scope="col">اسم الفرع</th>}
                                                            {!this.props.companyId && <th scope="col">اسم الشركة</th>}
                                                            <th scope="col">تقرير لتاريخ</th>
                                                            <th scope="col">نوع النظام</th>
                                                            <th scope="col">نوع الزيارة</th>
                                                            <th scope="col">تاريخ آخر تعديل</th>
                                                            <th scope="col">تاريخ الإنشاء</th>
                                                            <th scope="col">التفاصيل</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            data.maintainance_report.map((rep, index) =>
                                                                <this.ReportRow key={index} rep={{ ...rep, index, branchId: this.props.branchId, companyId: this.props.companyId }} />
                                                            )
                                                        }
                                                    </tbody>
                                                </Table>
                                            </CardBody>
                                        </Card>
                                    </div>
                                )
                            }
                            else return (<NoResults />);
                        }
                    }
                </Query>
            </div>
        )
    }
}