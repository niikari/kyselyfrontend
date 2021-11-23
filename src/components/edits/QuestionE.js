import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import React from 'react';
import AnswerE from './AnswerE';
export default function QuestionE(props) {

    const [name, setName] = React.useState('');
    const [answers, setAnswers] = React.useState([]);

    React.useEffect(() => console.log(answers,[answers]))
    React.useEffect(() => console.log(name),[name])
    React.useEffect(() => getAnswers(),[])
    
    const getAnswers = () => {
        fetch(props.question._links.answers.href)
        .then(res => res.json())
        .then(data => setAnswers(data._embedded.answers))
        .catch(err => console.error(err))
        console.log(answers);
    }

    const inputChanged = (e) => {
        setName(e.target.value);
        console.log(name);
    }
    return(
        <Paper style={{margin:'auto', width:'80%', padding:30, marginTop:30}}>
            <TextField style={{margin:'auto',padding:50, width:'80%'}} onChange={inputChanged} value={name}/>
            <Button onClick={() => props.editQuestionName(props.question, name)}>edit question {props.question.quest} name</Button>
            {answers.map((a, index) => <AnswerE key={index} answer={a}/>)}
        </Paper>
    )
}