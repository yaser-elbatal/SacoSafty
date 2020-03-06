import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Row, Table, Badge } from 'reactstrap';
import { Query } from 'react-apollo';
import { List_Report_Details_Report } from '../../../../services/queries/Maintainance/MaintainanceReports/Reports';
import Loader from "../../Custom/Loader/Loader"
import Error from "../../Custom/Error/Error"
import NoResults from "../../Custom/NoResults/NoResults"


let getDate = (isoDate) => {
  let date = new Date(isoDate).toLocaleString()
  date = date.split(',')[0].split('/').map(dat => (((dat < 10) && ("0" + dat)) || dat))
  date = date[1] + "/" + date[0] + "/" + date[2]

  return date;
}

export default class DetailsQuery extends Component {

  render() {

    return (
      <div className="animated fadeIn">
        <Query query={List_Report_Details_Report} variables={{ report_id: parseInt(this.props.reportId) }}>
          {
            ({ loading, error, data }) => {
              if (loading) return (<Loader />);
              if (error) { return (<Error />); }

              if (data.report.length) {
                let rep = data.report[0],
                  tdHeadStyle = { width: "25%", textAlign: "right", fontWeight: "700" },
                  tdStyle = { width: "75%", textAlign: "right", },
                  status =
                    rep.status ?
                      { val: "منتهى", clr: "success" } :
                      { val: "جديد", clr: "primary" }
                console.log(rep);

                return (
                  <div>
                    <Row>
                      <Col xl={12}>
                        <Card>
                          <CardHeader>
                            <div>
                              <div style={{ fontWeight: "500", position: "absolute" }} >
                                تقرير <Badge style={{ fontSize: "15px" }} color={status.clr}>{status.val}</Badge>
                              </div>
                              <div style={{ float: "left" }}>
                                <div className="small text-muted">تاريخ الطلب {getDate(rep.created_at)}</div>
                                <div className="small text-muted">تاريخ آخر تعديل {getDate(rep.updated_at)}</div>
                              </div>
                            </div>
                          </CardHeader>
                          <CardBody>
                            <Table responsive borderless hover style={{ textAlign: "center" }}>
                              <tbody>
                                <tr>
                                  <td style={tdHeadStyle}>الفرع</td>
                                  <td style={tdStyle}>
                                    <Link to={`/branches/${rep.branch.id}`}>{rep.branch.name_ar}</Link>
                                  </td>
                                </tr>
                                <tr>
                                  <td style={tdHeadStyle}>شركة الصيانة</td>
                                  <td style={tdStyle}>
                                    <Link to={`/maintainanceCompanies`}>{rep.company.company_name}</Link>
                                  </td>
                                </tr>
                                <tr>
                                  <td style={tdHeadStyle}>تاريخ الصيانة</td>
                                  <td style={tdStyle}>{rep.maintainance_date}</td>
                                </tr>
                                <tr>
                                  <td style={tdHeadStyle}>نوع الزيارة</td>
                                  <td style={tdStyle}>{rep.visit_type}</td>
                                </tr>
                                <tr>
                                  <td style={tdHeadStyle}>نوع النظام</td>
                                  <td style={tdStyle}>{rep.system_type}</td>
                                </tr>
                                <tr>
                                  <td style={tdHeadStyle}>وصف المشكلة</td>
                                  <td style={tdStyle}>{rep.problem_description}</td>
                                </tr>
                                <tr>
                                  <td style={tdHeadStyle}>حل المشكلة</td>
                                  <td style={tdStyle}>{rep.problem_solution}</td>
                                </tr>
                              </tbody>
                            </Table>
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                    <Row>
                      <Col xl={12}>
                        <Card>
                          <CardHeader>
                            صور التقرير العدد ({rep.images.split(",").filter(Boolean).length})
                          </CardHeader>
                          <CardBody>
                            {
                              rep.images.split(",").filter(Boolean).map((img, ind) => {
                                let editedImg = !img.includes("http") ? `https://${img}` : img;
                                return (
                                  <div key={ind} style={{ margin: "7px 7px 7px 0px" }}>
                                    <img src={editedImg} style={{ width: "90%",}} />
                                  </div>
                                )
                              })
                            }
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                  </div>
                )
              }
              else return <NoResults />;

            }
          }
        </Query>
      </div>
    )
  }
}


