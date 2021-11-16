import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import ReactDOM from "react-dom";
import Question from "./Question";
import QuestionOpen from "./QuestionOpen";
import QuestionMulti from "./QuestionMulti";
import Chart from "react-google-charts";

export default function Results(props) {

  const { id } = useParams()



  useEffect(() => fetchName() ,[])

  const [questions, setQuestions] = useState([])
  const [name, setName] = useState ([])

  const fetchName = () => {
    fetch(`https://kyselybackend123.herokuapp.com/api/questions/2/quest`, {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
        'Authorization': sessionStorage.getItem('jwt')
      },
    })
    .then(res => {
      if (res.ok) {
        res.json()
      } else {
        // MITÄ TEHDÄÄN JOS KEY EI TOIMI = CONSOLE.LOG(RES)
      }
    })
    .then(data => setName(data))
    .then(console.log(name))
    .catch(err => console.error(err))

  }

 

  const options = {
    
    title: JSON.stringify(name),
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
