import React, { useEffect, useState } from "react";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import SendAndArchiveIcon from '@mui/icons-material/SendAndArchive';
import axios from 'axios'

export default function Question(props) {

    const [answers, setAnswers] = useState([])
    const [answer, setAnswer] = useState({})
    const [disabled, setDisabled] = useState(false)


// HAETAAN ANNETUN KYSYMYKSEN MAHDOLLISET VASTAUKSET
    useEffect(() => 
    // hakee saadun tietyn kysymyksen vastaukset eli kysymysurl._links.answers.href
    axios.get(props.question._links.answers.href)
    //laittaa haetut kyseisen kyssärin vastaukset listana paikalliseen anwers constiin
    .then(res => setAnswers(res.data._embedded.answers))
    .catch(err => console.error(err))
    
    , [])

    


    // VASTAAJA VAHVISTAA VASTANNEENSA => LISÄTÄÄN INQUERYN ANSWER LISTAAN KYSEINEN VASTAUS
    const handleClick = () => {
        if (Object.keys(answer).length !== 0) {
            props.add(answer)
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
            //tässä looppaa kaikki fetchillä saadut answerit ja käyttäjän  klikatessa tiettyä
            //aswers listan answeria, lisätään se setAnswerilla paikalliseen konstiin.
            answers.map((currentanswer, index) => 
                <FormControlLabel 
                    onChange={() => setAnswer(currentanswer)} 
                    disabled={disabled}
                    key={index}
                    value={currentanswer.answer} 
                    control={<Radio />} 
                    label={currentanswer.answer} />
                    
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