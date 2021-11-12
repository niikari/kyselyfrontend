import Carousel from "nuka-carousel";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import ErrorNotFound from "./ErrorNotFound";
import Loading from "./Loading";
import Paper from '@mui/material/Paper';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Question from "./Question";
import QuestionOpen from "./QuestionOpen";
import QuestionMulti from "./QuestionMulti";
import Button from '@mui/material/Button';

export default function Inquiry(props) {

    const { id } = useParams()

    const [questions, setQuestions] = useState([])
    const [loading, setLoading] = useState(true)

    // KERÄTÄÄN VASTAUKSET (SISÄLTÄÄ MYÖS TIEDON KYSYMYKSESTÄ JA KYSELYSTÄ)
    const [answers, setAnswers] = useState([])

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

    // LISÄTÄÄN ANNETUT VASTAUKSET STATEEN. TÄMÄ FUNKTIO ANNETAAN CHILDIEN KÄYTTÖÖN
    const addNewAnswers = (answer) => {
        setAnswers([...answers, answer])
    }

    // JOS ANNETUT VASTAUKSET ON LISTA => LISÄTÄÄN NÄMÄ STATEEN
    const addNewListOfAnswers = (arr) => {
        setAnswers([...answers, ...arr])
    }

    while (loading) {
        return <Loading />
    }

    return (
        <div style={{ marginTop: 0 }}>
        <Carousel>
            {
                questions.map(question =>
                    <Paper style={{ width: '100%', height: 300, margin: 'auto', padding: 40, marginTop: 20, textAlign:'left' }} elevation={3} key={question.id}>
                    <FormControl key={question.id} component="fieldset">
                        <FormLabel component="legend"><b>{question.quest}</b></FormLabel><br></br>
                            {question.openQuestion && <QuestionOpen question={question} add={addNewAnswers} />}
                            {question.multipleAnswers && <QuestionMulti question={question} add={addNewListOfAnswers} />}
                            {question.normQuestion && <Question question={question} add={addNewAnswers} />}
                        </FormControl> 
                        
                    </Paper>)
            }
            <Paper style={{ width: '100%', height: 300, margin: 'auto', padding: 40, marginTop: 20, textAlign:'left' }} elevation={3}>
                <FormControl component="fieldset">
                    <FormLabel component="legend"><b>Vastasit kaikkiin, lähetä eteenpäin</b></FormLabel><br></br>
                </FormControl> 
                        
            </Paper>
        </Carousel>
        </div>
    )
}