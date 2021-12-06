import { Paper } from "@mui/material";
import React, { useState } from "react";

export default function ReportsOpenQuestion(props) {

    const [answers] = useState(props.answers)
    const [question] = useState(props.question)

    // TÄTÄ ALLA OLEVAAN TIETOA TUSKIN TÄÄLLÄ TARVITAAN, MUTTA VARUIKSI => JOS TRUE NIIN PUHELIN, MUUTEN ISOMPI KUIN 500 PX LEVEÄ
    // const [mobile] = useState(props.mobile)


    return (
        <>
        <Paper elevation={3}>
            <p><b>{question}</b></p>
            <p>Annetut vastaukset:</p>
            {
                answers.map((answer, index) =>
                <p key={index}>{answer.givenOpenAnswer}</p>)
            }
            <br></br>
        </Paper>
        </>
    )
}