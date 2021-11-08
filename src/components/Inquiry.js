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
import axios from "axios";
import Switch from '@material-ui/core/Switch';
import Collapse from '@material-ui/core/Collapse';

export default function Inquiry(props) {

    // BACKENDIN OSOITE, TUOTANNOSSAHAN VAIHTUU
    const url = 'https://kyselybackend123.herokuapp.com'
    const urli = props.url;

    const [isChecked, setIsChecked] = React.useState(false);
    
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
//SELITYS KOKONAISUUS
//HAETAAN QUERY JONKA SISÄLLÄ KYSYMYKSET
//HAETAAN KYSYMYKSET QUESTIONS MUUTTUJAAN
//PIIRRETÄÄN KÄYTTÄJÄLLE KYSELY, TAPAHTUU ANTAMALLA QUESTION KOMPONENTILLE PROPSINA TIEDOT KYSYMYKSISTÄ(LOOPATAAN TÄÄLLÄ)
//GUESTION KOMPONENTTI HAKEE MAHDOLLISET VASTAUKSET ITESELLEEN JA PALAUTTAA KÄYTTÄJÄN VALITSEMAN VASTAUKSEN
//INQUERY OTTAA VASTAAN VASTAUKSEN JA LAITTAA SEN TÄNNE ANSWER MUUTTUJAAN
//LOPUSSA KÄYTTÄJÄ PALAUTTAA KYSELYN, LUODAAN MAKER OILIO JA LOOPATAAN KANTAAN NIIN MONTA POSTIA SAMALLA MAKER 
//.. OLIOLLA KUN MAKERILLA ON VASTAUKSIA, JOTEN YHDELLÄ MAKERILLA ON KANNASSA MONTA ERI VASTAUSTA ERI KYSYMYKSIIN


    useEffect(() => 
    // HAETAAN ENSIN KYSELY
    axios.get(`${urli}`).then((response) => {  
    //haetaan kyselyltä siihen liittyvät kysymykset
        axios.get(response.data._links.questions.href)
        .then(res=> {
            setQuestions(res.data._embedded.questions)
            setLoading(false)
            
        })
        .catch(err => console.error(err))
      }),[]) 

    
    

    // LUODAAN "MAKER-OLIO" 
    const postMakerAndAnswers = () => {
        axios.post(`${url}/api/makers`, {
            body: JSON.stringify({})
        })
        //kutsutaan postanswer funktiota luodun maker olion urlilla
        //ja laitetaan setMakeriin koko luodun makerin url lista
        .then(response => {
            postAnswers(response.data._links.maker.href)
            setMaker(response.data)
            setDisabled(true)
        })
        .catch(err => console.error(err))
    }

    // LÄHETETÄÄN BACKENDIIN => MAKER, KYSYMYS JA MAHDOLLINEN AVOIN VASTAUS (SIELLÄ LISÄTAULU VASTAAJAN VASTAUKSILLE)
    const postAnswers = (makerUrl) => {
        answers.forEach(function (answer, index) {
            axios.post(`${url}/api/makerAnswers`, {
                // tallennetaan vastaus ja kuka vastas 
                "openAnswer": answer.openAnswer,
                "maker": makerUrl,
                "answer": answer._links.self.href
            })
            .then(res => {
                if (res.data.ok) {
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
            <Loading />
            </>
        )
    }

    return (
    
        <div style={{ marginTop: 20, textAlign: 'center' }}>
        
        <div>
            Tee tämä kysely 
            <Switch  checked={isChecked} onChange={() => {
            setIsChecked((prev) => !prev);}} ></Switch>
        </div>

        
        <Collapse in={isChecked}>
        {
            
            questions.map((question, index) =>
            // TÄÄLLÄ IF-LAUSEKE (JOS QUESTION MONIVALINTA, VAPAAKENTTÄ TAI VAIN YKSI VALINTAINEN RADIOKYSYMYS)
            <Paper style={{ width: '30%', margin: 'auto', padding: 40, marginTop: 20, textAlign:'left' }} elevation={3} key={index}>
               <FormControl key={index} component="fieldset">
               {/* tässä looppaa koko questions listan läpi ja laittaa guestion[index] propsina
               , Question komponentti palauttaa sitten kyseisen tietyn question[inndex]:in mahdolliset 
               vastaukset */}
                <FormLabel component="legend"><b>{question.quest}</b></FormLabel><br></br>
                    {question.openQuestion && <QuestionOpen question={question} add={addNewAnswers} />}
                    {question.multipleAnswers && <QuestionMulti question={question} add={addNewListOfAnswers} />}
                    {question.normQuestion && <Question question={question} add={addNewAnswers} />}
                </FormControl> 
                
            </Paper>
            
            )
        }
        <Button startIcon={<SendIcon />} disabled={disabled} onClick={postMakerAndAnswers} style={{ margin: 30 }} size="large" variant="outlined">Lähetä vastaukset</Button>
        <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={msg}
        action={action}
      />
      </Collapse>
        </div>
    )
}