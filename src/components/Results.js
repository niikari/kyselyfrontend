import React from "react";
import ReactDOM from "react-dom";
import Chart from "react-google-charts";

class Results extends React.Component {
  
  render() {
    return (
      <div className="App">
        <Chart
  width={'800px'}
  height={'400px'}
  chartType="PieChart"
  loader={<div>Loading Chart</div>}
  data={[
    ['Pizza', 'Popularity'],
    ['Pepperoni', 33],
    ['Hawaiian', 26],
    ['Mushroom', 22],
    ['Sausage', 10], // Below limit.
    ['Anchovies', 9], // Below limit.
  ]}
  options={{
    title: 'Popularity of Types of Pizza',
    sliceVisibilityThreshold: 0.05, // 20%
  }}
  rootProps={{ 'data-testid': '7' }}
/>
      </div>
    );
  }
}

export default Results;