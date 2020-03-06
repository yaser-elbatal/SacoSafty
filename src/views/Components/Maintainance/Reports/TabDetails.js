import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import { Query } from 'react-apollo';
import { List_Report_Details, List_Items_Cats } from '../../../../services/queries/Maintainance/MaintainanceReports/Reports';
import Loader from "../../Custom/Loader/Loader"
import Error from "../../Custom/Error/Error"
import NoResults from "../../Custom/NoResults/NoResults"
import TableDetails from "./TableDetails"
import { config } from 'aws-sdk';



export default class DetailsQuery extends Component {

  manipulationData = (details, configs) => {

    let cats = configs.map(c => c.maintainance_items_category);
    cats = cats.filter((cat, ind) => cats.findIndex(ct => ct.id === cat.id) === ind);//get unique cats by id

    let configsEdited = configs.map(con => {
      con.details = details[0].maintainance_report_items.find(det => det.item_id == con.id)
      return con;
    });
    
    let data = cats.map(cat => {
      cat.items = configsEdited
        .filter(ce => ce.maintainance_items_category.id == cat.id);
      return cat;
    })

    return <TableDetails data={data} />
  }

  render() {

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Query query={List_Report_Details} variables={{ report_id: parseInt(this.props.reportId) }}>
              {
                ({ loading, error, data }) => {
                  if (loading) return (<Loader />);
                  if (error) { return (<Error />); }

                  if (data.maintainance_report.length) {
                    let itemsIds = [];
                    let details = data.maintainance_report,
                      configIds = details.map(det => det.maintainance_report_items.map(i => itemsIds.push(i.item_id)));
                    configIds = itemsIds

                    return <Query query={List_Items_Cats} variables={{ ids: configIds }}>
                      {
                        ({ loading, error, data }) => {
                          if (loading) return (<Loader />);
                          if (error) return (<Error />);

                          if (data.maintainance_items.length) {
                            let configs = data.maintainance_items;
                            
                            return this.manipulationData(details, configs);
                          }
                          else return <NoResults />;
                        }
                      }
                    </Query>

                  }
                  else return <NoResults />;

                }
              }
            </Query>
          </Col>
        </Row>
      </div>
    )
  }
}


