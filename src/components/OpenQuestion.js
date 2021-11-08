import React, { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendAndArchiveIcon from '@mui/icons-material/SendAndArchive';

export default function OpenQuestion(props) {
    const [answer, setAnswer] = useState({})
    const [disabled, setDisabled] = useState(false)

    useEffect(() => fetchAnswer(), [])

    const fetchAnswer = () => {
        fetch(props.question._links.answers.href)
        .then(response => response.json())
        .then(data => setAnswer(data._embedded.answers[0]))
        .catch(err => console.error(err))

    }

    const handleChange = (event) => {
        setAnswer({...answer, 'openAnswer': event.target.value})
    }

    const handleClick = () => {
        props.add(answer)
        setDisabled(true)       
    }

    return(
        <>
<TextField
          id="outlined-multiline-flexible"
          label="Answer"
          multiline
          maxRows={4}
          onChange={handleChange}
        />
        <br></br>
    <Button 
            startIcon={<SendAndArchiveIcon />} 
            style={{ width: 150}} 
            disabled={disabled} 
            onClick={handleClick} 
            variant="outlined">
                Send
        </Button>


        </>
    )
}