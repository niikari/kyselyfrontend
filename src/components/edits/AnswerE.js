import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';
import { Paper } from '@mui/material';

export default function AnswerE(props) {
    
    const [name, setName] = React.useState('');

    const inputChanged = (e) => {
        setName(e.target.value);
    }



    return(
        <Paper style={{padding:10, margin:10}}>
            <Button 
            aria-label="delete" 
            color="error" 
            size="small" 
            onClick={() => props.deleteAnswer(props.answer)} >
                 <CloseIcon/>
            </Button>
            
        <p>Vastaus: {props.answer.answer}</p>
        <TextField style={{margin:'auto',padding:50, width:'80%'}} onChange={inputChanged} value={name}/>
        <Button onClick={() => props.editAnswerName(props.answer, name)}>Muuta kysymystä</Button>
        </Paper>
    )
}