import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
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

    
    const deleteAnswer = (answer) => {
        fetch(answer._links.self.href, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem('jwt')
            }
        })
        .then(res => {
            if (res.ok) {
                //fetchInquiry()
            }
        })
        .catch(err => console.error(err))
    }
    
    const editAnswerName = (answer, name) => {
        console.log(`answers new name: ${name}`);
        fetch(answer._links.self.href, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem('jwt')
            },
            body: JSON.stringify({...answer, answer: name})
        })
        .then(res => {
            if (res.ok) {
                // ILMOITETAANKO SNACKBARILLA?
                console.log(res.json())
            }
        })
        .catch(err => console.error(err))
    }

    const inputChanged = (e) => {
        setName(e.target.value);
        console.log(name);
    }
    return(
        <Paper style={{margin:'auto', width:'80%', padding:30, marginTop:30, backgroundColor:'#FFFAF0'}}>
            <Button aria-label="delete" color="error" size="small" onClick={() => props.deleteQuestion(props.question)} > <CloseIcon/></Button>

            <h1>question name: {props.question.quest}</h1>
            <TextField style={{margin:'auto',padding:50, width:'80%'}} onChange={inputChanged} value={name}/>
            <Button onClick={() => props.editQuestionName(props.question, name)}>change question</Button>
            
            {
            !props.question.openQuestion && 
            answers.map((a, index) => 
            <AnswerE key={index} deleteAnswer={deleteAnswer} editAnswerName={editAnswerName} answer={a}/>)
            }

        </Paper>
    )
}