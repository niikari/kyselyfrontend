import React, { useEffect, useState } from "react";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import SendAndArchiveIcon from '@mui/icons-material/SendAndArchive';

export default function Question(props) {

    const [answers, setAnswers] = useState([])
    const [answer, setAnswer] = useState({})
    const [disabled, setDisabled] = useState(false)

    // HAETAAN ANNETUN KYSYMYKSEN MAHDOLLISET VASTAUKSET
    useEffect(() => {
        fetch(props.question._links.answers.href)
        .then(res => res.json())
        .then(data => setAnswers(data._embedded.answers))
        .catch(err => console.error(err))
    }, [props.question._links.answers.href])    

    // VASTAAJA VAHVISTAA VASTANNEENSA => LISÄTÄÄN PARENTILLA OLEVAAN STATEEN ANNETTU VASTAUS
    const handleClick = () => {
        if (Object.keys(answer).length !== 0) {
            props.add(answer)
            //props.removeAnswered(props.question)
            setDisabled(true)
        }        
    }

    return (
        <>
        
        <RadioGroup
            aria-label={props.question.quest}
            name="radio-buttons-group"
            >
        {
            answers.map((answer, index) => 
                <FormControlLabel 
                    onChange={() => setAnswer(answer)} 
                    disabled={disabled}
                    key={index}
                    value={answer.answer} 
                    control={<Radio />} 
                    label={answer.answer} />
            )
        }
        <br></br>
        <Button 
            startIcon={<SendAndArchiveIcon />} 
            style={{ width: 150}} 
            disabled={disabled} 
            onClick={handleClick} 
            variant="outlined">
                Vahvista
        </Button>
        </RadioGroup>
        
        </>
    )
}