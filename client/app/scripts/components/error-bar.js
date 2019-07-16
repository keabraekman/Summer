import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { warning } from 'react-icons-kit/typicons/warning';
import { Icon } from 'react-icons-kit';
import { connect } from 'react-redux';
import { shownNodesSelector } from '../selectors/node-filters';
import { clickNode } from '../actions/app-actions';
import { GRAPH_VIEW_MODE } from '../constants/naming';
import { trackAnalyticsEvent } from '../utils/tracking-utils';

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

export class ErrorBar extends React.Component {
  //Format Data so it's readable
  formatData(nodes) {
    var global_data = nodes.get('nodesByTopology').toList().toJS();
    var index = index_topoById('<pod>',global_data);
    if(index != -1)
      var data = global_data[index];
    var return_data = [];
    var status;
    var i = 0;
    for(var key in data)
    {
      if(data.hasOwnProperty(key) && data[key].hasOwnProperty('metadata')){
        status = data[key]['metadata'][0]['value'];
        if(data[key]['metadata'][0]['id'] === "kubernetes_state" && status === "Running"){
          console.log(data[key]);
          return_data[i] = {name: data[key]['rank'], status: status, id: data[key]['id'], label: data[key]['label']};
          i++;
        }
      }
    }
    return (
      return_data
    );
  }

  onClickErr(ev, node, nodes) {
    console.log(nodes);
    trackAnalyticsEvent('scope.node.click', {
      layout: GRAPH_VIEW_MODE,
      parentTopologyId: nodes.get('parentId'),
      topologyId: nodes.get('id'),
    });
    this.props.clickNode(node.id, node.label, ev.target.getBoundingClientRect());
  }

  render() {
    var nodes = this.props.state;
    var data = this.formatData(nodes);
    return (
      <ListGroup className='err-bar' >
        {data.map((element) => 
        <ListGroupItem className="err-item" onClick = {ev => this.onClickErr(ev, element, nodes)} ><ErrorIcon /> {element.name.slice(0,15)}... {element.status}</ListGroupItem>
        )}
      </ListGroup>
    );
  }
}

function mapStatetoProps(state){
	return {
    state: state,
    nodes: shownNodesSelector(state),
    currentTopology: state.get('currentTopology'),
    // topologies: state.get('currentTopologyId'),
	};
}

export default connect(
  mapStatetoProps,
  { clickNode }
)(ErrorBar);   