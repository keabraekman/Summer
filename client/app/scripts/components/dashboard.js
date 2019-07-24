import React from 'react'
import { Card, CardText,
CardTitle } from 'reactstrap';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import PieChart from './pieChart';
import ErrorBar from './error-bar';
import { getNodesbyTopology } from '../actions/app-actions';
  
  class Dashboard extends React.Component {
  componentDidMount() {
    this.props.getNodesbyTopology("hosts");
  }
  
  getOverallStats = nodes => {
   let overallData = {Processes: 0, Containers: 0, Pods: 0, Hosts: 0};
   for (var topoIndex in nodes) {
     const topology = nodes[topoIndex].name;
     overallData[topology] = nodes[topoIndex].stats.node_count;
   }
   return overallData;
  }

  formatData = (nodes, topologyId) => {
    if (!nodes.get(topologyId)) {
      return { cpu: { value: 0, max: 0}, memory: { value: 0, max: 0}};
    }

    var data = nodes.get(topologyId).toList().toJS();
    // Just return information from the first host in the host array
    return { 
      cpu: {value: data[0]['metrics'][0]['value'], 
        max: data[0]['metrics'][0]['max']},
      memory: {value: data[0]['metrics'][1]['value'],
        max: data[0]['metrics'][1]['max']}
    }
  }
  
  render() {
  const { hostNodes, allNodes } = this.props;
  const hostData = this.formatData(hostNodes, "hosts");
  const overallData = this.getOverallStats(allNodes);
  let hostDataReceived = false;
  if (!hostDataReceived && hostData.memory.max !== 0 && hostData.cpu.value !== 0) {
    hostDataReceived = true;
  }
   return (
     <div className="dashboard">
       <h1>Dashboard</h1>
       <div className="view">
         <div className="top">
           <div className="dash-status">
           <div className="title">
              Alerts:
            </div>
            <div className="errors">
              <ErrorBar />
           </div>
           </div>
             { hostDataReceived ?  
              <div className="pie-charts">
                <PieChart values={[hostData.cpu.value, 100-hostData.cpu.value]} title={"HOST: CPU Usage"} />
                <PieChart values={[hostData.memory.value, hostData.memory.max-hostData.memory.value]} title={"HOST: Memory Usage"} />
              </div>
              :
              <div></div>
             }
         </div>
         <div className="bottom">
           <Card className="card">
             <CardTitle>{overallData.Hosts}</CardTitle>
             <CardText>hosts</CardText>
           </Card>
           <Card className="card">
             <CardTitle>{overallData.Pods}</CardTitle>
             <CardText>pods</CardText>
           </Card>
           <Card className="card">
             <CardTitle>{overallData.Containers}</CardTitle>
             <CardText>containers</CardText>
           </Card>
           <Card className="card">
             <CardTitle>{overallData.Processes}</CardTitle>
             <CardText>processes</CardText>
           </Card>
         </div>
       </div>
     </div>
   );
  }
  }
  
  const mapStateToProps = (state)  => ({
  hostNodes: state.get('nodesByTopology'),
  allNodes: state.get('topologies').toList().toJS(),
  topo1: state.get('topo1')
  })
  
  const mapDispatchToProps = dispatch => ({
  getNodesbyTopology: (topoId) => dispatch(getNodesbyTopology(topoId))
  })
  
  export default connect (
  mapStateToProps, mapDispatchToProps
  )(Dashboard);
