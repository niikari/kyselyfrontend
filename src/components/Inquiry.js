import React from 'react';
import iService from '../services/inquiry';
import qService from '../services/question';
import Question from './Question';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';
import Paper from '@mui/material/Paper';
import { RadioGroup } from '@mui/material';

export default function Inquiry() {


const [questions, setQuestions] = React.useState([]); 
const [chosenAnswers, setChosenAnswers] = React.useState([]);


const getInquiry = () => {
    iService
    .getById(1)
    .then(data => {
        console.log(data);
        getQuestions(data._links.questions.href);})
    .catch(error => console.error(error));
}

const getQuestions = (url) => {
    console.log(url)
    qService
    .getByUrl(url)
    .then(data => {
        console.log(data._embedded.questions)
        setQuestions(data._embedded.questions)
        })
    .catch(error => console.error(error));
}

React.useEffect(() => getInquiry() ,[]);

return(
    <div>
        {questions.map((q, index) =>
        <ul key={index}>
            
            <Paper style={{ width: '30%', margin: 'auto', padding: 40, marginTop: 20, textAlign:'left' }} elevation={3} key={index}>
               <FormControl key={index} component="fieldset">
                
                    {q.openQuestion && <p>open question</p>}
                    {q.multipleAnswers && <p>multiple answer question</p>}
                    {q.normQuestion && <RadioGroup>
                        <Question question={q}  setChosenAnswers={setChosenAnswers} chosenAnswers={chosenAnswers}/>
                        </RadioGroup>
                    }
                </FormControl> 
            </Paper>
            
            </ul>
        )}
    </div>
)
}

{/* <Question question={q} setChosenAnswers={setChosenAnswers}/> */}