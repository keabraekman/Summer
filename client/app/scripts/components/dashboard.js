import React from 'react';
import { Card, CardText,
  CardTitle } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import BarChart from './example-graph';

// TODO Connect to actions
export default class Dashboard extends React.Component {
  render() {
    return (
      <div className="dashboard">
        <h1>Dashboard</h1>
        <div className="view">
          <div className="top">
            <div className="dash-status">Everything looks good!</div>
            <div className="pie-charts">
              <BarChart data={[5,10,1,3,1,3,5,3,4,5,6]} size={[1000,250]} />
            </div>
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
