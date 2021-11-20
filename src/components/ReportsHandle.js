import _ from "lodash";
import React, { useEffect, useState } from "react";
import ReportQuestion from '../components/ReportQuestion';
import Loading from "./Loading";

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

    }, [])

    const addToData = (arr) => {
        const data = _.groupBy(arr, 'question')
        setData(data)
        setLoading(false)
    }
    
    while (loading) {
        return <Loading msg="Ladataan raporttia..." />
    }
    
    return (
        <>
        {
            Object.keys(data).map((question, index) =>
            <ReportQuestion question={question} key={index} answers={data[question]} />)
        }
        </>
    )
}