import React, { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendAndArchiveIcon from '@mui/icons-material/SendAndArchive';
import axios from "axios";

export default function QuestionOpen(props) {

    const [answer, setAnswer] = useState({})
    const [disabled, setDisabled] = useState(false)

    useEffect(() => 
    // hakee saadun tietyn kysymyksen vastaukset eli kysymysurl._links.answers.href
    axios.get(props.question._links.answers.href)
    //laittaa haetut kyseisen kyssärin vastaukset listana paikalliseen anwers constiin
    .then(res => setAnswer(res.data._embedded.answers[0]))
    .catch(err => console.error(err))
    
    , [])

    // VASTAAJA VAHVISTAA VASTANNEENSA => LISÄTÄÄN PARENTILTA TULEVAAN STATEEN ANNETTU VASTAUS JA TALLENNETAAN VASTAUS
    const handleClick = () => {
        props.add(answer)
        setDisabled(true)       
    }

    return (
        <>
        <TextField 
            disabled={disabled} 
            style={{ width: 500, marginBottom: 20 }} 
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