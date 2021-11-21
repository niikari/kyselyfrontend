import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, Legend } from 'recharts';
import _ from "lodash";
import Paper from '@mui/material/Paper';

export default function Report(props) {

    // PROPSISSA TULEE MUKANA MAKER-OLIO JA APIN URL

    const [makerAnswers, setMakerAnswers] = useState([])

    // REACT ROUTER HAETAAN URL ID JA LUODAAN NAVIGATE OLIO
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => fetchMakerAnswers(), [])

    // HAETAAN RAPORTTIDATA, JOS EI KIRJAUTUNUT KÄYTTÄJÄ OHJATAAN LOGIN SIVULLE
    const fetchMakerAnswers = () => {
        fetch(`${props.url}/reports/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': sessionStorage.getItem('jwt')
            }
        })        
        .then(res => res.json())
        .then(data => setMakerAnswers(data.map( data =>
            ({
               questionAnswers: data.answer.question.quest,
               numberOfAnswers:  data.answer.answer

            }))    
        ))
    
    }

    const values = _(makerAnswers)
        .groupBy(answers => answers.questionAnswers)
        .map((value, key) => ({
            questionAnswers: key,
            total: _.sumBy(value, 'answer')
        }))
        .value()

    return (
        <>
        <Paper elevation={3} style={{ margin: 20 }}>
        <BarChart width={1500} height={750} data={values}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="questionAnswers" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar barSize={80}  dataKey="total" fill="#3366ff" />
        </BarChart>
        </Paper>
        </>
    )
}