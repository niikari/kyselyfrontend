import React, { useState, useEffect } from "react";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import SendAndArchiveIcon from '@mui/icons-material/SendAndArchive';


export default function MultipleChoice(props) {


    const [answers, setAnswer] = useState([]);
    const [userAnswers, setUserAnswers] = useState([]);
    const [disabled, setDisabled] = useState(false)


    useEffect(() => fetchAnswers(),[]);
  
    const fetchAnswers = () => {
        fetch(props.question._links.answers.href)
        .then(response => response.json())
        .then(data => setAnswer(data._embedded.answers))
        .catch(err => console.error(err))
    }

    const handleClick = () => {
        if (userAnswers.length > 0) {
            props.add(userAnswers)
            setDisabled(true)  
        }        
    }

    const handleChange = (e, answer, index) => {
        // VALINTA PÄÄLLE
        if (e.target.checked) {
            setUserAnswers([...userAnswers, {...answer, index:index}])
        }
        // VALINTA POIS
        if (e.target.checked === false) {
            const arr = userAnswers.filter(ans => ans.index !== index)
            setUserAnswers(arr)
        }
    }

    return(
        <>
    <FormGroup>
        {
            answers.map((answer,index) =>
            <FormControlLabel
                key={index}
                label={answer.answer}
                value={answer}
                control={<Checkbox/>}
                onChange={(e) => handleChange(e, answer, index)}
                />
            )
        }

        <br></br>
        <Button 
            startIcon={<SendAndArchiveIcon />} 
            style={{ width: 150}} 
            disabled={disabled} 
            onClick={handleClick} 
            variant="outlined">
                Send
        </Button>
    </FormGroup>
        </>

    )
}
