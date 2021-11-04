import React , { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';


function Inquiry() {
   
   const backend = 'http://localhost:8080';
   
   const [questions, setQuestions] = useState([]);
   const [answers, setAnswers] = useState([]);

   const fetchInquiry = () => {
        fetch('http://localhost:8080/api/inquiries/1')
        .then(response => response.json())
        .then(data => fetchQuestions(data._links.questions.href))
   }
   
   const fetchQuestions = (backend) => {
       console.log(backend)
    fetch(backend)
    .then(response => response.json())
    .then(data => console.log(data._embedded._links))
    .catch(err => console.error(err))
   }

   useEffect(() => fetchInquiry(),[])
   
   
   
   return(
        <>
           {
                  

                
                   
           }
</>
    );
}

export default Inquiry;