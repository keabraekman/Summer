import React from 'react';
import Plot from 'react-plotly.js';

class PieChart extends React.Component {
  render() {
    return (
      <Plot
        data={[
          {
          values: [19, 26, 55],
          labels: ['Residential', 'Non-Residential', 'Utility'],
          type: 'pie'
          }
        ]}
        
        // layout = {{height: 300, width: 500}}

      />
    );
  }
}

export default PieChart;