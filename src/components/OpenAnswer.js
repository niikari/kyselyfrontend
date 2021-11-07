import { TextField } from "@mui/material";
import React from 'react';
export default function OpenAnswer(props) {

    const [oAnswer, setoAnswer] = React.useState({ });

    const changeAnswer = (e) => {
        setoAnswer({...oAnswer, 'openAnswer': e.target.value});
        props.answered(oAnswer);
    }

    React.useEffect(() => setoAnswer(props.answer) ,[]);

    return(
        
        <TextField 
        style={{ width: 400, marginBottom: 20 }} 
        label="Vastaa tähän" 
        onChange={(e) => changeAnswer(e)}
        />)

}