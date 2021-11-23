import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Chart from "react-google-charts";

export default function Report(props) {

    // PROPSISSA TULEE MUKANA MAKER-OLIO JA APIN URL

    const [makerAnswers, setMakerAnswers] = useState([])
    const [quest, setQuest] = useState([])
    const [question, setQuestion] = useState([])
    const [answers, setAnswers] =useState([])
    const { id } = useParams()

    useEffect(() => fetchMakerAnswers(), [])
    useEffect(() => fetchQuestion(), [])

    const fetchQuestion = () => {
    fetch('https://kyselybackend123.herokuapp.com/api/questions/2/answers')
    .then(res => res.json())
    .then(data => {
        console.log(data._embedded.answers)
        setQuestion(data._embedded.answers)
        
    })
}


    const fetchMakerAnswers = () => {
        fetch(`${props.url}/reports/${id}`)
        .then(res => res.json())
        .then(data => {
            console.log(data[0].answer.answer)
            console.log(data)
            console.log(data.answer)
            setAnswers(data)

            setQuest(data[0].answer.question.quest)
            setMakerAnswers(data[0].answer.answer)
        })

        .catch(err => console.error(err))
    }
    
    const ids = [answers[1].answer.id]
    const test = ids.map((ids) => ids)
    console.log(test)

    
   
      const options =  {
        
        title: JSON.stringify(quest),
        is3D: true,
       
      };
    
      const chartdata = [
        ['Kysymys', 'Vastaus'],
        [question[0].answer, 11],
        [question[1].answer, 11],
        [question[2].answer, 11],
        


      ];
      
     
    
    
    return (
        <div className="Chart">
          <Chart
            width={'500px'}
            height={'300px'}
            chartType="PieChart"
            loader={<div>Loading Chart</div>}
            data={chartdata}
            options={options}
            rootProps={{ 'data-testid': '1' }}
            />
        </div>
    )
}