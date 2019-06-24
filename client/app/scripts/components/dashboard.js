import React from 'react';

// TODO Connect to actions
export default class Dashboard extends React.Component {
  render() {
    return (
      <div className="dashboard">
        <h1>Dashboard</h1>
        <div className="view">
          <div className="top">
            <div className="dash-status">Everything looks good!</div>
            <div className="pie-charts">Pie charts go here</div>
          </div>
          <div>Card thingys go here</div>
        </div>
      </div>
    );
  }
}
