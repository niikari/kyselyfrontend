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
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';

export default function Inquiry(props) {

    const { id } = useParams()

    const [questions, setQuestions] = useState([])
    const [loading, setLoading] = useState(true)

    // KERÄTÄÄN VASTAUKSET (SISÄLTÄÄ MYÖS TIEDON KYSYMYKSESTÄ JA KYSELYSTÄ)
    const [answers, setAnswers] = useState([])
    // TEKIJÄ, VIELÄ EI KÄYTETÄ MUTTA SITTEN KUN RAPORTTIA LÄHDETÄÄN TEKEMÄÄN TARVITAAN
    const [maker, setMaker] = useState({})

    // SNACKBAR ALKAA
    const [open, setOpen] = useState(false)
    const [msg, setMsg] = useState('')

    const handleClick = () => {
        setOpen(true)
    }
    
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return
        }
    
        setOpen(false)
    }
    
    const action = (
        <React.Fragment>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
    )

    // SNACKBAR LOPPUU

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
    // LUODAAN "MAKER-OLIO" 
    const postMakerAndAnswers = () => {
        fetch(`${props.url}/api/makers`, {
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
        })
        .catch(err => console.error(err))
    }

    // LÄHETETÄÄN BACKENDIIN => MAKER, KYSYMYS JA MAHDOLLINEN AVOIN VASTAUS (SIELLÄ LISÄTAULU VASTAAJAN VASTAUKSILLE)
    const postAnswers = (makerUrl) => {
        answers.forEach(function (answer, index) {
            fetch(`${props.url}/api/makerAnswers`, {
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
                    setMsg('Vastaukset lähetetty')
                    setOpen(true)
                }
            })
            .catch(err => {
                console.error(err)
                setMsg('Hups, jokin meni pieleen...')
            })
        })
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
                    <Button startIcon={<SendIcon />}  onClick={postMakerAndAnswers} style={{ margin: 30 }} size="large" variant="outlined">Lähetä vastaukset</Button>
                </FormControl> 
                        
            </Paper>
        </Carousel>
        <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={msg}
        action={action}
      />
        </div>
    )
}