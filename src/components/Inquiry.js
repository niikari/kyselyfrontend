import React from 'react';
import iService from '../services/inquiry';
import qService from '../services/question';
import Question from './Question';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';
import Paper from '@mui/material/Paper';
import { RadioGroup } from '@mui/material';
import makerService from '../services/maker';
import answerService from '../services/answer';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';

export default function Inquiry() {

//muuttujat kysymykset ja valitut vastaukset. valitut vastaukset
//lähetetään tietokantaan, kun maker on tehty
const [questions, setQuestions] = React.useState([]); 
const [chosenAnswers, setChosenAnswers] = React.useState([]);

React.useEffect(() => getInquiry() ,[]);

//haetaan kysely
const getInquiry = () => {
    iService
    .getById(1)
    .then(data => {
        console.log(data);
        getQuestions(data._links.questions.href);})
    .catch(error => console.error(error));
}

//haetaan kysymykset kyselyn urlilla
const getQuestions = (url) => {
    console.log(url)
    qService
    .getByUrl(url)
    .then(data => {
        console.log(data._embedded.questions);
        setQuestions(data._embedded.questions);
        })
    .catch(error => console.error(error));
}

//nappia painamalla luodaan maker
const postMaker = () => {
    makerService
    .create()
    .then(data => {
        console.log('data:' + data);
        //kutsutaan alempi funktio 
        postAnswers(data._links.maker.href);
    })
    .catch(error => console.error(error));
}

//postataan makerin vastaukset 
const postAnswers = (url) => {
    console.log(url);
    chosenAnswers.forEach(a => {
        
        const aPost = {  
            openAnswer: a.openAnswer,
            maker: url,
            answer: a._links.self.href};

        console.log(aPost);

        answerService
        .createMakersAnswer(`https://kyselybackend123.herokuapp.com/api/makerAnswers`, aPost)
        .then(data => console.log(`posted answer ${data}`))
        .catch(error => console.error(error));
    });

   
}




return(
    <div>
        {questions.map((q, index) =>
        <ul key={index}>
            
            <Paper style={{ width: '30%', margin: 'auto', padding: 40, marginTop: 20, textAlign:'left' }}  elevation={3} key={index}>
               <FormControl key={index} component="fieldset">
                
                    {q.openQuestion && <Question question={q}  setChosenAnswers={setChosenAnswers} chosenAnswers={chosenAnswers}/>}
                    {q.multipleAnswers && 
                    <FormGroup>
                    <Question question={q}  setChosenAnswers={setChosenAnswers} chosenAnswers={chosenAnswers}/>
                    </FormGroup>
                    }
                    {q.normQuestion && 
                    <RadioGroup>
                    <Question question={q}  setChosenAnswers={setChosenAnswers} chosenAnswers={chosenAnswers}/>
                    </RadioGroup>
                    }
                </FormControl> 
            </Paper>
            
            </ul>
        )}

        <Button startIcon={<AddCircleRoundedIcon/>} variant="contained" onClick={postMaker}>lähetä</Button>
    </div>
)
}

