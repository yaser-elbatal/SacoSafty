import React, { Component, useCallback } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import { Subscription } from 'react-apollo';
import { BrowserRouter, Link } from 'react-router-dom';
import { List_Report_Comments } from '../../../../services/queries/Maintainance/MaintainanceReports/Reports';
import Loader from "../../Custom/Loader/Loader"
import Error from "../../Custom/Error/Error"
import NoResults from "../../Custom/NoResults/NoResults"
import ImgModal from "react-modal-image";
import AddComment from "./AddComment";


export default class TabComments extends Component {

  constructor(props) {
    super(props);

    this.state = {
      reportId: false,
      mutation: 0,
    }

  }

  componentDidMount() {
    this.setState({ reportId: this.props.reportId })
  }


  getDate = (isoDate) => {
    let date = new Date(isoDate).toLocaleString()
    date = date.split(',')[0].split('/').map(dat => (((dat < 10) && ("0" + dat)) || dat))
    date = date[1] + "/" + date[0] + "/" + date[2]

    return date;
  }

  render() {

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <div
              className="commentContainer"
              style={{
                maxHeight: "300px", overflow: "scroll", overflowX: "hidden", paddingLeft: "12px",
                paddingRight: "12px", marginBottom: "12px", border: "1px solid rgb(200, 206, 211)",
              }}>
              <Subscription subscription={List_Report_Comments} variables={{ reportId: parseInt(this.state.reportId) }}>
                {
                  ({ loading, error, data }) => {
                    if (loading) return (<Loader />);
                    if (error) return (<Error />);

                    if (data.maintainance_report_comments.length) {
                      console.log(data.maintainance_report_comments);

                      return (
                        <div>
                          {
                            data.maintainance_report_comments.map((cmnt, ind) => {

                              let images = cmnt.images.split(',').filter(Boolean).map((img, ind) => {
                                let editedImg = !img.includes("http") ? `https://${img}` : img;
                                return (
                                  <div key={ind} style={{ width: "40px", margin: "7px 7px 7px 0px" }}>
                                    <ImgModal small={editedImg} large={editedImg} alt={`صورة توضيحية - ${ind + 1}`} />
                                  </div>)
                              });

                              return (
                                <Card key={ind} style={{ marginTop: "5px" }}>
                                  <CardHeader>
                                    <div>
                                      <div style={{ display: "inline" }}>
                                        <div className="avatar">
                                          <img
                                            src={
                                              !cmnt.maintainance_comment_user.avatar.includes("http") ?
                                                `https://${cmnt.maintainance_comment_user.avatar}` :
                                                cmnt.maintainance_comment_user.avatar
                                            }
                                            style={{ width: "36px", height: "36px" }}
                                            className="img-avatar"
                                          />
                                          <span
                                            className={`avatar-status badge-${
                                              cmnt.maintainance_comment_user.active ? "primary" : "danger"
                                              }`}
                                          ></span>
                                        </div>
                                        <div style={{ position: "absolute", right: "75px", top: "18px" }} >
                                          <BrowserRouter basename="/users" />
                                          <Link
                                            to={`/users/${cmnt.maintainance_comment_user.id}`}
                                          >{cmnt.maintainance_comment_user.display_name}</Link>
                                        </div>
                                      </div>
                                      <div style={{ position: "absolute", left: "12px", top: "17px" }}>
                                        <div className="small text-muted">تاريخ الرسالة {this.getDate(cmnt.created_at)}</div>
                                        <div className="small text-muted">تاريخ آخر تعديل {this.getDate(cmnt.updated_at)}</div>
                                      </div>
                                    </div>
                                  </CardHeader>
                                  <CardBody style={{ backgroundColor: "#e8e8e861" }}>
                                    {cmnt.comment && <div><b>{cmnt.comment}</b></div>}
                                    {cmnt.images &&
                                      <div style={{ display: "flex", flexWrap: "wrap", border: "1px solid #d6d6d6", marginTop: "5px" }}>
                                        {images}
                                      </div>
                                    }
                                  </CardBody>
                                </Card>
                              )
                            })
                          }
                        </div>
                      )
                    }
                    else return (<NoResults />);
                  }
                }
              </Subscription>
            </div>
            {/* <span style={{position: "absolute", zIndex: 99999999999, left: "35px", visibility: "hidden",
            bottom: "35px", fontSize: "26px", justifyContent: "center", backgroundColor: "#2f9bbb",
            borderRadius: "50%", alignItems: "center", display: "flex", width: "25px", height: "25px"}}>
              <i className="fa fa-angle-double-up"></i>
            </span> */}
          </Col>
        </Row>
        <Row>
          <Col xl={12}>
            <AddComment user_id={JSON.parse(localStorage.sacoAdmin).id} report_id={this.props.reportId} />
          </Col>
        </Row>
      </div>
    )
  }
}


