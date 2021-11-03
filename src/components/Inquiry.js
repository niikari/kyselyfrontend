import React, { useEffect, useState } from "react";
import Paper from '@mui/material/Paper';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Question from "./Question";
import Button from '@mui/material/Button';
import QuestionOpen from "./QuestionOpen";
import QuestionMulti from "./QuestionMulti";
import SendIcon from '@mui/icons-material/Send';

export default function Inquiry() {

    // BACKENDIN OSOITE
    const url = 'http://localhost:8080'

    const [questions, setQuestions] = useState([])
    const [maker, setMaker] = useState({})

    // KERÄTÄÄN VASTAUKSET (SISÄLTÄÄ MYÖS TIEDON KYSYMYKSESTÄ)
    const [answers, setAnswers] = useState([])

    // LAITETAAN LÄHETYSNAPPI POIS KÄYTETTÄVISTÄ
    const [disabled, setDisabled] = useState(false)

    useEffect(() => fetchInquiry(), [])

    // HAETAAN ENSIN KYSELY
    const fetchInquiry = () => {
        // MÄÄRITELLÄÄN APP.JS -TIEDOSTOSSA (PROPS) MIKÄ PATTERISTO OTETAAN NÄYTILLE
        fetch('http://localhost:8080/api/inquiries/1')
        .then(res => res.json())
        .then(data => fetchQuestions(data._links.questions.href))
    }

    // HAETAAN TIETYN KYSELYN KYSYMYKSET
    const fetchQuestions = (url) => {
        fetch(url)
        .then(res => res.json())
        .then(data => setQuestions(data._embedded.questions))
        .catch(err => console.error(err))
    }

    // LUODAAN "MAKER-OLIO" 
    const postMakerAndAnswers = () => {
        fetch(`${url}/api/makers`, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({})
        })
        .then(res => res.json())
        .then(data => {
            postAnswers(data._links.maker.href)
            setMaker(data)
            setDisabled(true)
        })
        .catch(err => console.error(err))
    }

    // LÄHETETÄÄN BACKENDIIN => MAKER, KYSYMYS JA MAHDOLLINEN AVOIN VASTAUS (SIELLÄ LISÄTAULU VASTAAJAN VASTAUKSILLE)
    const postAnswers = (makerUrl) => {
        answers.forEach(function (answer, index) {
            fetch(`${url}/api/makerAnswers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "openAnswer": answer.openAnswer,
                "maker": makerUrl,
                "answer": answer._links.self.href
            })
            })
            .then(res => {
                if (res.ok) {
                    console.log("onnistui, viimeinkin....")
                }
            })
            .catch(err => console.error(err))
        })
    }
    
    // LISÄTÄÄN ANNETUT VASTAUKSET STATEEN
    const addNewAnswers = (answer) => {
        setAnswers([...answers, answer])
    }

    return (
        <div style={{ marginTop: 20, textAlign: 'center' }}>
        {
            questions.map((question, index) =>
            // TÄNNE IF LAUSEKE (JOS QUESTION MONIVALINTA, VAPAAKENTTÄ TAI VAIN YKSI VALINTA)
            <Paper style={{ width: '30%', margin: 'auto', padding: 40, marginTop: 20, textAlign:'left' }} elevation={3} key={index}>
               <FormControl key={index} component="fieldset">
                <FormLabel component="legend"><b>{question.quest}</b></FormLabel><br></br>
                    {question.openQuestion && <QuestionOpen question={question} add={addNewAnswers} />}
                    {question.multipleAnswers && <QuestionMulti />}
                    {question.normQuestion && <Question question={question} add={addNewAnswers} />}
                </FormControl> 
                
            </Paper>)
        }
        <Button startIcon={<SendIcon />} disabled={disabled} onClick={postMakerAndAnswers} style={{ margin: 30 }} size="large" variant="outlined">Lähetä vastaukset</Button>
        </div>
    )
}