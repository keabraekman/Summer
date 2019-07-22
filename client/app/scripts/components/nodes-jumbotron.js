import React from 'react';
import { Jumbotron} from 'reactstrap';
import NodesChart from '../charts/nodes-chart';

class NodesJumbotron extends React.Component {
    render() {
    return (
      <div>
        <Jumbotron/><NodesChart/>
      </div>
    );
  }
}

export default NodesJumbotron;