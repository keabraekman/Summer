import React from 'react';
import { Card, CardText,
CardTitle } from 'reactstrap';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import PieChart from './pieChart';

class Dashboard extends React.Component {
getMetric = (metric) => {
  const { hostNodes } = this.props;
  let data = {};
  for (var key in hostNodes) {
    console.log(hostNodes);
   if (hostNodes.hasOwnProperty(key)){
     if (metric === 'docker_cpu_total_usage') {
       data.value = hostNodes[key]['metrics'][0]['value'];
       data.max = hostNodes[key]['metrics'][0]['max'];
     } else if (metric === 'docker_memory_usage') {
       data.value = hostNodes[key]['metrics'][1]['value'];
       data.max = hostNodes[key]['metrics'][1]['max'];
     }
     return data;
   }
 }
}

render() {
  const cpu = this.getMetric('docker_cpu_total_usage');
  const memory = this.getMetric('docker_memory_usage');
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="view">
        <div className="top">
          <div className="dash-status">Everything looks good!</div>
          <div className="pie-charts">
            <div>{cpu.value}% CPU used</div>
            <div>{memory.value} MB Memory used</div>
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

export default connect(mapStateToProps)(Dashboard);