import React from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

export default function InquiryE(props) {

    const inputChanged = (e) => {
        props.setName(e.target.value);
    }

    return(
        <Paper style={{margin:'auto', width:'80%', padding:30, marginTop:30, backgroundColor:'#FFFAF0'}}>
            <h1>Kyselyn nimi: {props.inquiry.name}</h1>
            <TextField style={{margin:'auto',padding:50, width:'80%'}} onChange={inputChanged} value={props.name}/>
            <Button onClick={() => props.editInquiryName()}>muuta kyselyn nimeä</Button>
        </Paper>
    )

} 