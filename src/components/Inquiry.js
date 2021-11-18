
   
import React, { useEffect, useState } from "react";
import Paper from '@mui/material/Paper';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Question from "./Question";
import Button from '@mui/material/Button';
import QuestionOpen from "./QuestionOpen";
import QuestionMulti from "./QuestionMulti";
import SendIcon from '@mui/icons-material/Send';
import Loading from "./Loading";
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useParams } from "react-router";
import Carousel from 'react-material-ui-carousel'

export default function Inquiry(props) {

    const url = props.url

    const { id } = useParams()

    const [questions, setQuestions] = useState([])

    // TEKIJÄ, VIELÄ EI KÄYTETÄ MUTTA SITTEN KUN RAPORTTIA LÄHDETÄÄN TEKEMÄÄN TARVITAAN
    const [maker, setMaker] = useState({})

    // LADATAANKO KYSELYÄ VIELÄ
    const [loading, setLoading] = useState(true)

    // KERÄTÄÄN VASTAUKSET (SISÄLTÄÄ MYÖS TIEDON KYSYMYKSESTÄ JA KYSELYSTÄ)
    const [answers, setAnswers] = useState([])

    // LAITETAAN LÄHETYSNAPPI POIS KÄYTETTÄVISTÄ VASTAUSTEN LÄHETYSTEN JÄLKEEN
    const [disabled, setDisabled] = useState(false)

    // SNACKBAR ALKAA
    const [open, setOpen] = useState(false)
    const [msg, setMsg] = useState('')
    
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

    // HAETAAN ENSIN KYSELY
    // MÄÄRITELLÄÄN SELECTINQUIRY.JS -TIEDOSTOSSA (PROPS) MIKÄ PATTERISTO OTETAAN NÄYTILLE
    useEffect(() => {
        fetch(`${props.url}/api/inquiries/${id}`)
        .then(res => res.json())
        .then(data => fetchQuestions(data._links.questions.href))
        .catch(err => console.error(err))
    }, [props.url, id])

    // HAETAAN SITTEN TIETYN KYSELYN KYSYMYKSET
    const fetchQuestions = (url) => {
        fetch(url)
        .then(res => res.json())
        .then(data => {
            setQuestions(data._embedded.questions)
            setLoading(false)
        })
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
    
    // LISÄTÄÄN ANNETUT VASTAUKSET STATEEN. TÄMÄ FUNKTIO ANNETAAN CHILDIEN KÄYTTÖÖN
    const addNewAnswers = (answer) => {
        setAnswers([...answers, answer])
    }

    // JOS ANNETUT VASTAUKSET ON LISTA => LISÄTÄÄN NÄMÄ STATEEN
    const addNewListOfAnswers = (arr) => {
        setAnswers([...answers, ...arr])
    }

    
    // NÄYTETÄÄN LOADING KUNNES KYSYMYKSET ON LADATTU
    while (loading) {
        return (
            <>
            <Loading msg={"Ladataan kysymyksiä"} />
            </>
        )
    }

    return (
        <div style={{ marginTop: 20, textAlign: 'center' }}>
            <Carousel
                autoPlay={false}
                animation="slide"
                cycleNavigation={false}
                navButtonsAlwaysVisible
                >            
            {
                questions.map((question, index) =>
                // TÄÄLLÄ IF-LAUSEKE (JOS QUESTION MONIVALINTA, VAPAAKENTTÄ TAI VAIN YKSI VALINTAINEN RADIOKYSYMYS)
                <Paper style={{ width: '50%', height: 400, margin: 'auto', padding: 40, marginTop: 20, textAlign:'left' }} elevation={3} key={index}>
                
                <FormControl key={index} component="fieldset">
                    <FormLabel component="legend"><b>{question.quest}</b></FormLabel><br></br>
                        {question.openQuestion && <QuestionOpen question={question} add={addNewAnswers} index={index} />}
                        {question.multipleAnswers && <QuestionMulti question={question} add={addNewListOfAnswers} index={index}  />}
                        {question.normQuestion && <Question question={question} add={addNewAnswers} index={index}  />}
                    </FormControl> 
                    
                </Paper>)
            }
            </Carousel>
        <Button startIcon={<SendIcon />} disabled={disabled} onClick={postMakerAndAnswers} style={{ margin: 30 }} size="large" variant="contained">Lähetä vastaukset</Button>
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
