import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';
import AnswerE from './AnswerE';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

export default function QuestionE(props) {

    const [name, setName] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [answers, setAnswers] = React.useState([]);
    const [newAnswer, setNewAnswer] = React.useState('');

    React.useEffect(() => fetchAnswers(),[])
    
    const fetchAnswers = () => {
        fetch(props.question._links.answers.href)
        .then(res => res.json())
        .then(data => setAnswers(data._embedded.answers))
        .catch(err => console.error(err))
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
                fetchAnswers()
            }
        })
        .catch(err => console.error(err))
    }
    
    const editAnswerName = (answer, name) => {
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
               fetchAnswers();
            }
        })
        .catch(err => console.error(err))
    }

    const createButtonClicked = () => {
        setOpen(false)
        createAnswer()
    }

    const createAnswer = () => {
        fetch('https://kyselybackend123.herokuapp.com/api/answers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem('jwt')
            },
            body: JSON.stringify({answer: newAnswer, question: props.question._links.self.href })
        })
        .then(res => {
            if (res.ok) {
               fetchAnswers();
            }
        })
    }

    const inputChanged = (e) => {
        setName(e.target.value);
    }
    return(
        <Paper style={{margin:'auto', width:'80%', padding:30, marginTop:30, backgroundColor:'#FFFAF0'}}>
            <Button aria-label="delete" color="error" size="small" onClick={() => props.deleteQuestion(props.question)} > <CloseIcon/></Button>
            { !props.question.openQuestion &&  <Button size="small" variant="contained" onClick={() => setOpen(true)} >new answer</Button>}
            <h1>question name: {props.question.quest}</h1>
            <TextField style={{margin:'auto',padding:50, width:'80%'}} onChange={inputChanged} value={name}/>
            <Button onClick={() => props.editQuestionName(props.question, name)}>change question</Button>
            
            {
            !props.question.openQuestion && 
            answers.map((a, index) => 
            <AnswerE key={index} deleteAnswer={deleteAnswer} editAnswerName={editAnswerName} answer={a}/>)
            }

        <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogContent>
        <TextField style={{margin:'auto',padding:50, width:'80%'}} onChange={(e) => setNewAnswer(e.target.value)} value={newAnswer}/>
            <Button onClick={()=>createButtonClicked()}>create</Button>
        </DialogContent>
        </Dialog>
        </Paper>
    )
}