import React, { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendAndArchiveIcon from '@mui/icons-material/SendAndArchive';

export default function QuestionOpen(props) {

    const [answer, setAnswer] = useState({})
    const [disabled, setDisabled] = useState(false)

    useEffect(() => fetchAnswer(), [])

    const fetchAnswer = () => {
        fetch(props.question._links.answers.href)
        .then(res => res.json())
        .then(data => setAnswer(data._embedded.answers[0]))
        .catch(err => console.error(err))
    }

    // VASTAAJA VAHVISTAA VASTANNEENSA => LISÄTÄÄN PARENTILTA TULEVAAN STATEEN ANNETTU VASTAUS JA TALLENNETAAN VASTAUS
    const handleClick = () => {
        props.add(answer)
        setDisabled(true)       
    }

    return (
        <>
        <TextField 
            disabled={disabled} 
            style={{ width: 'auto', marginBottom: 20 }} 
            label="Vastauksesi..." 
            onChange={(e) => setAnswer({...answer, 'openAnswer': e.target.value})} 
            />
        <Button 
            startIcon={<SendAndArchiveIcon />} 
            style={{ width: 150}} 
            disabled={disabled} 
            onClick={handleClick} 
            variant="outlined">
                Vahvista
        </Button>
        </>
    )
}