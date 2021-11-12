import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import ErrorNotFound from "./ErrorNotFound";
import Loading from "./Loading";

export default function Inquiry(props) {

    const { id } = useParams()

    state = {
        slideIndex: 0
      };
    const [questions, setQuestions] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => fetchInquiry() ,[])

    const fetchInquiry = () => {
        fetch(`${props.url}/api/inquiries/${id}`)
        .then(res => res.json())
        .then(data => fetchQuestions(data._links.questions.href))
        .catch(err => console.error(err))
    }

    const fetchQuestions = (questionsUrl) => {
        fetch(questionsUrl)
        .then(res => res.json())
        .then(data => {
            setQuestions(data._embedded.questions)
            setLoading(false)
        })
        .catch(err => console.error(err))
    }

    while (loading) {
        return <Loading />
    }

    return (
        <>
        
        </>
    )
}