import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Chart from "react-google-charts";

export default function Results(props) {

  const options = {
    title: "My daily activities",
    is3D: true,
    hAxis: { title: "Age", viewWindow: { min: 0, max: 15 } },
    vAxis: { title: "Weight", viewWindow: { min: 0, max: 15 } },
  };

  const data = [
    ['Task', 'Hours per Day'],
    ['Work', 11],
    ['Eat', 2],
    ['Commute', 2],
    ['Watch TV', 2],
    ['Sleep', 7],
  ];
  
  return (
    <div className="Chart">
      <Chart
        width={'800px'}
        height={'400px'}
        chartType="PieChart"
        loader={<div>Loading Chart</div>}
        data={data}
        options={options}
        rootProps={{ 'data-testid': '7' }}
        />
    </div>
  );
}

