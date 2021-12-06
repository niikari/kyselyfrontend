import _ from "lodash";
import React, { useEffect, useState } from "react";
import ReportQuestion from '../components/ReportQuestion';
import Loading from "./Loading";
import ReportsOpenQuestion from "./ReportsOpenQuestion";

export default function ReportsHandle(props) {

    const [answers] = useState(props.data)
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const arr = answers.map(answer => 
            ({
                question: answer.answer.question.quest, 
                givenAnswer: answer.answer.answer,
                openAnswer: answer.answer.question.openQuestion,
                givenOpenAnswer: answer.openAnswer
            })
        )
        
        addToData(arr)

    }, [answers])

    const addToData = (arr) => {
        const data = _.groupBy(arr, 'question')
        setData(data)
        setLoading(false)
    }
    
    while (loading) {
        return <Loading msg="Ladataan raporttia..." />
    }
    // <ReportQuestion question={question} key={index} answers={data[question]} mobile={props.mobile}/>
    // data[0].openAnswer
    // <Test question={question} data={data[question]} />
    // <Test question={question} data={data} other={data[question][0].openAnswer} /> TÄÄLLÄ ON OIKEA
    return (
        <div style={{ margin: 'auto', width: '80%' }}>
        {
            Object.keys(data).map((question, index) =>
                <div key={index}>
                    {data[question][0].openAnswer === false && <ReportQuestion question={question} key={index} answers={data[question]} mobile={props.mobile}/>}
                    {data[question][0].openAnswer && <ReportsOpenQuestion question={question} key={index} answers={data[question]} mobile={props.mobile} />}
                </div>
            )
        }
        </div>
    )
}