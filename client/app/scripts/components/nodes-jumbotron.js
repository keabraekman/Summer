import React from 'react';
import NodesChart from '../charts/nodes-chart';

class NodesJumbotron extends React.Component {
    render() {
    return (
      <div id="NodeJumbotron">
        <h5>Host: Minikube / Pod: AshPod / Container: AshContainer / </h5>
        <NodesChart/>
      </div>
    );
  }
}

export default NodesJumbotron;