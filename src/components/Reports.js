import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, Legend } from 'recharts';
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
        .then(data => setMakerAnswers(data))
        .catch(err => {
            console.error(err)
            navigate('/login')
        })
    }

    return (
        <>
        <Paper elevation={3} style={{ margin: 20 }}>
        <BarChart width={1500} height={750} data={makerAnswers}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="answer.answer" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="pv" fill="#8884d8" />
        <Bar dataKey="uv" fill="#82ca9d" />
        </BarChart>
        </Paper>
        </>
    )
}