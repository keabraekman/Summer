import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { warning } from 'react-icons-kit/typicons/warning';
import { Icon } from 'react-icons-kit';
import { connect } from 'react-redux';
import { shownNodesSelector } from '../selectors/node-filters';

export const ErrorIcon = () => <Icon icon={warning} />;

export class ErrorBar extends React.Component {
  formatData() {
    var data1 = this.props.state.get('nodesByTopology').toList().toJS();
    console.log(data1[0]);
    var return_data = [];
    var status;
    var i = 0;
    for(var key in data1[0])
    {
      console.log(data1[0][key]['metadata']);
      if(data1[0].hasOwnProperty(key)){
        status = data1[0][key]['metadata'][0]['value'];
        if(data1[0][key]['metadata'][0]['id'] === "kubernetes_state" && status === "Running"){
          return_data[i] = {name: data1[0][key]['rank'], status: status}
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