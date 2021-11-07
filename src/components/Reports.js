import React, { useEffect, useState } from "react";

export default function Report(props) {

    // PROPSISSA TULEE MUKANA MAKER-OLIO JA APIN URL

    const [makerAnswers, setMakerAnswers] = useState([])
    const [notMakerAnswers, setNotMakerAnswers] = useState([])

    useEffect(() => {
        fetchMakerAnswers()
        fetchNotMakerAnswers()
    }, [])

    const fetchMakerAnswers = () => {
        console.log(`${props.url}/api/makerAnswers/search/findByMaker?maker=${props.maker._links.self.href}`)
        fetch(`${props.url}/api/makerAnswers/search/findByMaker?maker=${props.maker._links.self.href}`)
        .then(res => res.json())
        .then(data => setMakerAnswers(data._embedded.makerAnswers))
        .catch(err => console.error(err))
    }

    const fetchNotMakerAnswers = () => {
        fetch(`${props.url}/api/makerAnswers/search/findByMakerIsNot?maker=${props.maker._links.self.href}`)
        .then(res => res.json())
        .then(data => setNotMakerAnswers(data._embedded.makerAnswers))
        .catch(err => console.error(err))
    }

    return (
        <>

        </>
    )
}