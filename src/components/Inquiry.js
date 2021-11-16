import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { useParams } from "react-router";
import ErrorNotFound from "./ErrorNotFound";
import Loading from "./Loading";
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Question from "./Question";
import Button from '@mui/material/Button';
import QuestionOpen from "./QuestionOpen";
import QuestionMulti from "./QuestionMulti";
import Paper from '@mui/material/Paper';

export default function Inquiry(props) {

    const { id } = useParams()

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
        <Carousel
            
            autoPlay={false}
            navButtonsAlwaysVisible
            animation="slide"
            cycleNavigation={false}
            >
            {
                questions.map(( question, index) =>
                <Paper style={{ width: '30%', margin: 'auto', padding: 40, marginTop: 20, textAlign:'left' }} elevation={3} key={index}>
               <FormControl key={index} component="fieldset">
                <FormLabel component="legend"><b>{question.quest}</b></FormLabel><br></br>
                    {question.openQuestion && <QuestionOpen question={question}/>}
                    {question.multipleAnswers && <QuestionMulti question={question}/>}
                    {question.normQuestion && <Question question={question}  />}
                </FormControl> 
                
            </Paper>)
            }
        </Carousel>
        </>
    )
}