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
          },
          domain= {
            row: 0,
            column: 0
          }
        ]
        [
          {
          values: [num, 100-num],
          labels: ['CPU Usage', 'Available'],
          type: 'pie'
          },
          domain= {
            row: 1,
            column: 0
          }
        ]
      }
        
        ultimateColors = {[
        
          {color:'rgb(56, 75, 126)', color:'rgb(18, 36, 37)'}
        
        ]}

        layout = {
          // {height: 200, width: 500}
          {title: 'HOST: CPU Usage'}
        }
      />

    );
  }
}

export default PieChart;