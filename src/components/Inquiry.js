import React , { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Paper from '@mui/material/Paper';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';


import Question from "./Question";
import MultipleChoice from "./MultipleChoice";
import OpenQuestion from "./OpenQuestion";
function Inquiry() {
   
    const url = 'https://kyselybackend123.herokuapp.com'
   
   const [questions, setQuestions] = useState([]);
   const [answers, setAnswers] = useState([]);

   const [disabled, setDisabled] = useState(false)
 
   useEffect(() => fetchInquiry(), [])

   const fetchInquiry = () => {
    
    fetch(`${url}/api/inquiries/1`)
    .then(res => res.json())
    .then(data => fetchQuestions(data._links.questions.href))
}
   const fetchQuestions = (url) => {
       console.log(url)
    fetch(url)
    .then(response => response.json())
    .then(data => setQuestions(data._embedded.questions))
    .catch(err => console.error(err))
   }

 
   
   const addNewListOfAnswers = (arr) => {
    setAnswers([...answers, ...arr])
}

const addNewAnswers = (answer) => {
    setAnswers([...answers, answer])
}
   
   
   return(

    <div>

            {
                questions.map((question, index) =>
                <Paper style={{ width: '30%', margin: 'auto', padding: 40, marginTop: 20, textAlign:'left' }} elevation={8} key={index}>
               
               <FormControl key={index} component="fieldset">
                    <FormLabel component="legend"> <b>{question.quest}</b></FormLabel><br></br>
                    {question.multipleAnswers && <MultipleChoice question={question} add={addNewListOfAnswers} />}
                    {question.normQuestion && <Question question={question} add={addNewAnswers} />}
                    {question.openQuestion && <OpenQuestion question={question} add={addNewAnswers} />}
                </FormControl>
                </Paper>
                )
            }

    </div>

)

}

export default Inquiry;