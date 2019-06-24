import React from 'react';
import { Card, CardText, CardBody,
  CardTitle } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// TODO Connect to actions
export default class Dashboard extends React.Component {
  render() {
    return (
      <div className="dashboard">
        <h1>Dashboard</h1>
        <div className="view">
          <div className="top">
            <div className="dash-status">Everything looks good!</div>
            <div className="pie-charts">Pie charts go here</div>
          </div>
          <div>
            <Card>
              <CardBody>
                <CardTitle>TITLE</CardTitle>
                <CardText>Text</CardText>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}
