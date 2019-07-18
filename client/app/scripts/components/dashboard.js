import React from 'react'
import { Card, CardText,
CardTitle } from 'reactstrap';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import PieChart from './pieChart';
import ErrorBar, { formatData } from './error-bar';
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
  
  render() {
  const { hostNodes, allNodes } = this.props;
  const hostData = formatData(hostNodes, "hosts");
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
              Errors:
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
  })
  
  const mapDispatchToProps = dispatch => ({
  getNodesbyTopology: (topoId) => dispatch(getNodesbyTopology(topoId))
  })
  
  export default connect (
  mapStateToProps, mapDispatchToProps
  )(Dashboard);
