import React, { useEffect, useState } from "react";

export default function ReportsHandle(props) {

    const [answers, setAnswers] = useState([props.data])
    const [data, setData] = useState([])

    useEffect(() => {
        answers.forEach(element => {
            console.log(element)
            setData([...data, {'question': 'testi'}])
        })
        //console.log(data)
    }, [])
    
    return (
        <>

        </>
    )
}