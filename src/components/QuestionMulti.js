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

    // HAETAAN ANNETUN KYSYMYKSEN MAHDOLLISET VASTAUKSET
    useEffect(() => {
        fetch(props.question._links.answers.href)
        .then(res => res.json())
        .then(data => setAnswers(data._embedded.answers))
        .catch(err => console.error(err))
    }, [props.question._links.answers.href])

    // VASTAAJA VAHVISTAA VASTANNEENSA => LISÄTÄÄN PARENTILLA OLEVAAN STATEEN ANNETTU VASTAUS
    const handleClick = () => {
        if (chosenAnswers.length > 0) {
            props.add(chosenAnswers)
            setDisabled(true)  
        }        
    }

    // VASTAAJA KLIKKAA VALINNAN PÄÄLLE JA VALINNAN POIS 
    const handleChange = (e, answer, index) => {
        // VALINTA PÄÄLLE
        if (e.target.checked) {
            setChosenAnswers([...chosenAnswers, {...answer, index:index}])
        }
        // VALINTA POIS
        if (e.target.checked === false) {
            const arr = chosenAnswers.filter(ans => ans.index !== index)
            setChosenAnswers(arr)
        }
    }

    return (
        <>
        <FormGroup >
            {
                answers.map((answer, index) =>
                <FormControlLabel 
                    key={index} 
                    disabled={disabled}
                    label={answer.answer} 
                    value={answer}
                    control={<Checkbox /> }
                    onChange={(e) => handleChange(e, answer, index)}
                    /> )
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
        </FormGroup>
        </>
    )
}