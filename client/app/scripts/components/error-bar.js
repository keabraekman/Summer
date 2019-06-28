import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { warning } from 'react-icons-kit/typicons/warning';
import { Icon } from 'react-icons-kit';
import { connect } from 'react-redux';
import { shownNodesSelector } from '../selectors/node-filters';

export const ErrorIcon = () => <Icon icon={warning} />;

export class ErrorBar extends React.Component {
  render() {
    return (
      <ListGroup className='err-bar'>
        <ListGroupItem className="err-item" href="#"><ErrorIcon />  Pod 1.12.9 ImagePullBackOff</ListGroupItem>
        <ListGroupItem className="err-item" href="#"><ErrorIcon /> Pod 2.83.3 Excessive Restarts</ListGroupItem>
        <ListGroupItem className="err-item" tag="a" href="#"><ErrorIcon /> Morbi leo risus</ListGroupItem>
        <ListGroupItem className="err-item" tag="a" href="#"><ErrorIcon /> Porta ac consectetur ac</ListGroupItem>
        <ListGroupItem className="err-item" tag="a" href="#"><ErrorIcon /> Vestibulum at eros</ListGroupItem>
      </ListGroup>
    );
  }
}

function mapStatetoProps(state){
	return {
		nodes: shownNodesSelector(state)
	};
}

export default connect(
	 mapStatetoProps
)(ErrorBar);