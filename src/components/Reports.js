import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function Report(props) {

    // PROPSISSA TULEE MUKANA MAKER-OLIO JA APIN URL

    const [makerAnswers, setMakerAnswers] = useState([])

    const { id } = useParams()

    useEffect(() => fetchMakerAnswers(), [])

    const fetchMakerAnswers = () => {
        fetch(`${props.url}/reports/${id}`)
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.error(err))
    }

    return (
        <>
        <p>raportti osio</p>
        </>
    )
}