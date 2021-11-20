import React, { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts";
import _ from "lodash";
import Paper from '@mui/material/Paper';

export default function ReportQuestion(props) {

    const [question] = useState(props.question)
    const [answers, setAnswers] = useState([])

    useEffect(() => {
        const data = _.groupBy(props.answers, 'givenAnswer')
        const arr = Object.keys(data).map((answer, index) => 
            ({
                key: answer,
                Vastattu: data[answer].length
            })
        )

        setAnswers(arr)
    }, [])
    
    return (
        <div style={{ margin: 'auto', width: '80%' }}>
        <Paper elevation={3} width="auto">
            <h3>{question}</h3>
            <BarChart width={1050} height={250} data={answers}>
                <CartesianGrid strokeDasharray= "3 3" />
                <XAxis dataKey="key" />
                <YAxis />
                <Tooltip />
                
                <Bar dataKey="Vastattu" fill="#82ca9d" />
            </BarChart>
        </Paper>
        </div>
    )
}