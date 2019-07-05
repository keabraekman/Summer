import React from 'react';
import { Card, CardText,
CardTitle } from 'reactstrap';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { formatData } from './error-bar';
import { getNodesbyTopology } from '../actions/app-actions';

class Dashboard extends React.Component {
 constructor() {
   super();

   this.state = {
     finishedLoading: false
   };
 }

componentWillMount() {
   console.log(1);
   this.props.getNodesbyTopology("hosts");
}

render() {
 const { hostNodes } = this.props;
 const data = formatData(hostNodes, "hosts");
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="view">
        <div className="top">
          <div className="dash-status">
           </div>
          <div className="pie-charts">
             <div>
               <div>{data.cpu.value}% CPU used</div>
               <div>{data.memory.value} MB Memory used</div>
             </div>
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

const mapStateToProps = (state)  => ({
 hostNodes: state.get('nodesByTopology')
})

const mapDispatchToProps = dispatch => ({
 getNodesbyTopology: (topoId) => dispatch(getNodesbyTopology(topoId))
})

export default connect (
 mapStateToProps, mapDispatchToProps
)(Dashboard);