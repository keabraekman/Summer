import React from 'react';
import {  Button, Toast, ToastBody, ToastHeader } from 'reactstrap';
import { warning } from 'react-icons-kit/typicons/warning';
import { Icon } from 'react-icons-kit';
import { connect } from 'react-redux';
import { shownNodesSelector } from '../selectors/node-filters';
import { clickNode } from '../actions/app-actions';
import { GRAPH_VIEW_MODE } from '../constants/naming';
import { trackAnalyticsEvent } from '../utils/tracking-utils';
import { isDashboardViewModeSelector } from '../selectors/topology'


export const ErrorIcon = () => <Icon icon={warning} />;

export const index_topoById = (topo, data) => {
 var sanity_check;
 for(var i = 0; i < data.length; i++){
   sanity_check = Object.keys(data[i])[0]
   if(sanity_check && sanity_check.slice(-topo.length) === topo)
     return i;
 }
 return -1;
}

export const formatData = (nodes, topologyId) => {
 var return_data;
 if(topologyId === "pods")
   return_data = [];
 else if (topologyId === "hosts")
   return_data = { cpu: { value: 0, max: 0}, memory: { value: 0, max: 0}};

 if(!nodes.get(topologyId))
   return return_data;

 var data = nodes.get(topologyId).toList().toJS();
 var i;
 var status;
 for(i = 0; i < data.length; i++){
   if(topologyId === "pods"){
     status = data[i]['metadata'][0]['value'];
     if(status !== "Running"){
       return_data[i] = {name: data[i]['rank'], status: status, id: data[i]['id'], label: data[i]['label']};
     }
   }
   else if(topologyId === "hosts"){
     return_data={cpu: {value: data[i]['metrics'][0]['value'], max: data[i]['metrics'][0]['max']}, memory: {value: data[i]['metrics'][1]['value'], max: data[i]['metrics'][1]['max']}}
   }
 }
 return return_data;
}

export class ErrorBar extends React.Component {
 constructor(props) {
   super(props);
   this.state = {
     show: false
   };

   this.toggle = this.toggle.bind(this);
 }

 toggle() {
   this.setState({
     show: !this.state.show
   });
 }

 onClickErr(ev, node, nodes) {
   trackAnalyticsEvent('scope.node.click', {
     layout: GRAPH_VIEW_MODE,
     parentTopologyId: nodes.get('parentId'),
     topologyId: nodes.get('id'),
   });
   this.props.clickNode(node.id, node.label, ev.target.getBoundingClientRect());
 }

 render() {
   const { isDashboardViewMode } = this.props;
   var nodes = this.props.state.get('nodesByTopology');
   var data = formatData(nodes, "pods");
   var allGoodMsg = false;
   if (data.length === 0 && isDashboardViewMode) {
    allGoodMsg = true;
   }
   
   return (
     <div className='err-bar' >
       { allGoodMsg ? 
       <div>You have no errors! All good!</div> :
        <div>
        {data.map((element) =>
        <Toast >
            <ToastHeader></ToastHeader>
            <ToastBody className="err-item" onClick = {ev => this.onClickErr(ev, element, nodes)} ><ErrorIcon /> {element.name}... {element.status}</ToastBody>
        </Toast>
          )}
        </div>
       }
     </div>

     // <ListGroup className='err-bar' >
     //   {data.map((element) =>
     //   <ListGroupItem className="err-item" onClick = {ev => this.onClickErr(ev, element, nodes)} ><ErrorIcon /> {element.name}... {element.status}</ListGroupItem>
     //   )}
     // </ListGroup>
   );
 }
}

function mapStatetoProps(state){
    return {
   state: state,
   nodes: shownNodesSelector(state),
   currentTopology: state.get('currentTopology'),
   isDashboardViewMode: isDashboardViewModeSelector(state)
   // topologies: state.get('currentTopologyId'),
    };
}

export default connect(
 mapStatetoProps,
 { clickNode }
)(ErrorBar);