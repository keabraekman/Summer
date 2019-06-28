import React from 'react';
import { Card, CardText,
  CardTitle } from 'reactstrap';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { focusSearch } from '../actions/app-actions';
// import { shownNodesSelector } from '../selectors/node-filters';

class Dashboard extends React.Component {
  // // getValue = (node) => {
  //   // const values = {};
  //   // ['metrics', 'metadata'].forEach((collection) => {
  //   //   if (node[collection]) {
  //   //     node[collection].forEach((field) => {
  //   //       const result = Object.assign({}, field);
  //   //       result.valueType = collection;
  //   //       values[field.id] = result;
  //   //     });
  //   //   }
  //   // });
  //   // return values.docker_cpu_total_usage.value;
  // }

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

  getMetric = (metric) => {
    const { hostNodes } = this.props.hostNodes;
    if (metric === 'docker_cpu_total_usage') {
      for (var key in hostNodes) {
        if (hostNodes.hasOwnProperty(key)){
          console.log(hostNodes[key]['metrics'][0]['value']);
          return hostNodes[key]['metrics'][0]['value'];
        }
      }
    } else if (metric === 'docker_memory_usage') {
      for (var key in hostNodes) {
        if (hostNodes.hasOwnProperty(key)){
          console.log(hostNodes[key]['metrics'][1]['value']);
          return hostNodes[key]['metrics'][1]['value'];
        }
      }
    }
    return -1;
  }

  render() {
    console.log(this.props.hostNodes);
    const cpu = this.getMetric('docker_cpu_total_usage');
    const memory = this.getMetric('docker_memory_usage');
    // const { nodes } = this.props;
    // const formattedNodes = nodes
    //   .toList()
    //   .toJS();
    // console.log(this.props.nodez.toList().toJS());
    // console.log(shownNodesSelector('Host'));
    // const cpu = nodes.reduce((total, node) => total + this.getCPU(node));
    // const memory = nodes.reduce((total, node) => total + this.getMemory(node));
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
    hostNodes: state.get('nodesByTopology').toList().toJS()[0]
  };
}

export default connect(
  mapStateToProps,
  { focusSearch }
)(Dashboard);
