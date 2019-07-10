import React from 'react';
import Plot from 'react-plotly.js';

class PieChart extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { data: [], layout: {}, frames: [], config: {} };
  }

  render() {
    return (

      <Plot
        data={
        [
          {
          values: this.props.values,
          labels: ['Used', 'Available'],
          type: 'pie',
          }
        ]
       }
       
        layout = {
          {height: 280, width: 300,
          title: this.props.title}
        }
      />

    );
  }
}

export default PieChart;