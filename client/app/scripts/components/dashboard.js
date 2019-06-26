import React from 'react';
import { Card, CardText,
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
          <div className="bottom">
            <Card className="card">
              <CardTitle>3</CardTitle>
              <CardText>nodes</CardText>
            </Card>
            <Card className="card">
              <CardTitle>105</CardTitle>
              <CardText>pods</CardText>
            </Card>
            <Card className="card">
              <CardTitle>42</CardTitle>
              <CardText>containers</CardText>
            </Card>
            <Card className="card">
              <CardTitle>31</CardTitle>
              <CardText>services</CardText>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}
