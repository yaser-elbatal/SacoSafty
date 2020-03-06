import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import Tabs from "../../Custom/Tabs/Tabs"
import TabDetails from "./TabDetails"
import TabComments from "./TabComments"
import TabDetailsReport from "./TabDetailsReport"
import "./print.css"



export default class ListItems extends Component {

  constructor(props) {
    super(props);

    this.state = {
      qString: {},
      mutation: 0,
    }

  }

  componentDidMount() {

  }


  getDate(isoDate) {
    let date = new Date(isoDate).toLocaleString()
    date = date.split(',')[0].split('/').map(dat => (((dat < 10) && ("0" + dat)) || dat))
    date = date[1] + "/" + date[0] + "/" + date[2]
    return date;
  }



  dataTabs = [
    {
      label: <b>تفاصيل التقرير</b>,
      body: <TabDetailsReport reportId={this.props.match.params.id} />
    },
    {
      label: <b>تفاصيل العناصر</b>,
      body: <TabDetails reportId={this.props.match.params.id} />
    },
    {
      label: <b>التعليقات</b>,
      body: <TabComments reportId={this.props.match.params.id} />
    },
  ]

  printHandler = () => {
    window.print();
  }

  render() {

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "10px", position: "relative", float: "left" }}>
              <button className="btn btn-primary" onClick={this.printHandler}>طباعة التقرير</button>
            </div>
            <div style={{ marginBottom: "15px" }}><Tabs data={this.dataTabs} /></div>
          </Col>
        </Row>
      </div>
    )
  }
}


