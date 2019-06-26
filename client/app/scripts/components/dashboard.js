import React from 'react';
import { Card, CardText,
  CardTitle } from 'reactstrap';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { shownNodesSelector } from '../selectors/node-filters';

class Dashboard extends React.Component {
  getCPU = (node) => {
    const values = {};
    ['metrics', 'metadata'].forEach((collection) => {
      if (node[collection]) {
        node[collection].forEach((field) => {
          const result = Object.assign({}, field);
          result.valueType = collection;
          values[field.id] = result;
        });
      }
    });
    return values.docker_cpu_total_usage.value;
  }

  getMemory = (node) => {
    const values = {};
    ['metrics', 'metadata'].forEach((collection) => {
      if (node[collection]) {
        node[collection].forEach((field) => {
          const result = Object.assign({}, field);
          result.valueType = collection;
          values[field.id] = result;
        });
      }
    });
    return values.docker_memory_usage.value;
  }

  render() {
    const { nodes } = this.props;
    const cpu = nodes.reduce((total, node) => total + this.getCPU(node));
    const memory = nodes.reduce((total, node) => total + this.getMemory(node));
    return (
      <div className="dashboard">
        <h1>Dashboard</h1>
        <div className="view">
          <div className="top">
            <div className="dash-status">Everything looks good!</div>
            <div className="pie-charts">
              {cpu}% CPU used
              {memory}MB Memory used
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

function mapStateToProps(state) {
  return {
    nodes: shownNodesSelector(state)
  };
}

export default connect(mapStateToProps)(Dashboard);
