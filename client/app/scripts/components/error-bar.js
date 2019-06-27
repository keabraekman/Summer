import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { warning } from 'react-icons-kit/typicons/warning';
import { Icon } from 'react-icons-kit';
import { connect } from 'react-redux';
import { shownNodesSelector } from '../selectors/node-filters';


export const ErrorIcon = () => <Icon icon={warning} />;

export class ErrorBar extends React.Component {
  formatData() {
    var data1 = this.props.nodes.toList().toJS();
    var return_data = [];
    var state;
    for(var i = 0; i < data1.length; i++)
    {
      if(this.props.topologies === "pods"){
        state = data1[i]['metadata'][0]['value'];
        if(data1[i]['metadata'][0]['id'] === "kubernetes_state" && state === "Running"){
          return_data[i] = {name: data1[i]['rank'], state: state}
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
        <ListGroupItem className="err-item" href="#"><ErrorIcon /> {element.name.slice(0,15)}... {element.state}</ListGroupItem>
        )}
      </ListGroup>
    );
  }
}

function mapStatetoProps(state){
  return {
    nodes: shownNodesSelector(state),
    topologies: state.get('currentTopologyId')
  };
}

export default connect(
  mapStatetoProps
)(ErrorBar);