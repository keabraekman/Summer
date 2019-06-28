import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { warning } from 'react-icons-kit/typicons/warning';
import { Icon } from 'react-icons-kit';
import { connect } from 'react-redux';
import { shownNodesSelector } from '../selectors/node-filters';

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
  formatData() {
    var global_data = this.props.state.get('nodesByTopology').toList().toJS();
    var index = index_topoById('<pod>',global_data);
    var data = global_data[index];
    if(index != -1)
      var data = global_data[index];
    var return_data = [];
    var status;
    var i = 0;
    for(var key in data)
    {
      // console.log(data1[0][key]['metadata']);
      if(data.hasOwnProperty(key) && data[key].hasOwnProperty('metadata')){
        status = data[key]['metadata'][0]['value'];
        if(data[key]['metadata'][0]['id'] === "kubernetes_state" && status === "Running"){
          return_data[i] = {name: data[key]['rank'], status: status}
          i++;
        }
      }
    }
    return (
      return_data
    );
  }
  render() {
    var data = this.formatData();
    return (
      <ListGroup className='err-bar'>
        {data.map((element) => 
        <ListGroupItem className="err-item" href="#"><ErrorIcon /> {element.name.slice(0,15)}... {element.status}</ListGroupItem>
        )}
      </ListGroup>
    );
  }
}

function mapStatetoProps(state){
	return {
    state: state,
    nodes: shownNodesSelector(state),
    // topologies: state.get('currentTopologyId'),
	};
}

export default connect(
  mapStatetoProps,
)(ErrorBar);   