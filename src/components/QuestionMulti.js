import React, { useState, useEffect } from "react";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import SendAndArchiveIcon from '@mui/icons-material/SendAndArchive';

export default function QuestionMulti(props) {

    const [answers, setAnswers] = useState([])
    const [chosenAnswers, setChosenAnswers] = useState([])
    const [disabled, setDisabled] = useState(false)

    useEffect(() => fetchAnswers(), [])

    // HAETAAN ANNETUN KYSYMYKSEN MAHDOLLISET VASTAUKSET
    const fetchAnswers = () => {
        fetch(props.question._links.answers.href)
        .then(res => res.json())
        .then(data => setAnswers(data._embedded.answers))
        .catch(err => console.error(err))
    }

    // VASTAAJA VAHVISTAA VASTANNEENSA => LISÄTÄÄN PARENTILLA OLEVAAN STATEEN ANNETTU VASTAUS
    const handleClick = () => {
        props.add(chosenAnswers)
        setDisabled(true)      
    }

    return (
        <>
        <FormGroup>
            {
                answers.map((answer, index) =>
                <FormControlLabel 
                    key={index} 
                    disabled={disabled}
                    label={answer.answer} 
                    value={answer}
                    control={<Checkbox />} 
                    /> )
            }
        <br></br>
        <Button startIcon={<SendAndArchiveIcon />} style={{ width: 150}} disabled={disabled} onClick={handleClick} variant="outlined">Vahvista</Button>
        </FormGroup>
        </>
    )
}