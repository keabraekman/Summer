import React from 'react';
import Plot from 'react-plotly.js';

const num = 56; 

class PieChart extends React.Component {
  render() {
    return (

      <Plot
        data={
        [
          {
          values: [num, 100-num],
          labels: ['CPU Usage', 'Available'],
          type: 'pie'
          }
        ]
      }

        layout = {
          // {height: 200, width: 500}
          {title: 'HOST: CPU Usage'}
        }
      />

    );
  }
}

export default PieChart;