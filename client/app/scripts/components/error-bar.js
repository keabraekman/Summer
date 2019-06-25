import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { warning } from 'react-icons-kit/typicons/warning';
import { Icon } from 'react-icons-kit';

export const ErrorIcon = () => <Icon icon={warning} />;

export default class Example extends React.Component {
  render() {
    return (
      <ListGroup hover>
        <ListGroupItem className="err-bar" href="#"><ErrorIcon />  Pod 1.12.9 ImagePullBackOff</ListGroupItem>
        <ListGroupItem className="err-bar" tag="a" href="#"><ErrorIcon /> Pod 2.83.3 Excessive Restarts</ListGroupItem>
        <ListGroupItem className="err-bar" tag="a" href="#"><ErrorIcon /> Morbi leo risus</ListGroupItem>
        <ListGroupItem className="err-bar" tag="a" href="#"><ErrorIcon /> Porta ac consectetur ac</ListGroupItem>
        <ListGroupItem className="err-bar" tag="a" href="#"><ErrorIcon /> Vestibulum at eros</ListGroupItem>
      </ListGroup>
    );
  }
}
