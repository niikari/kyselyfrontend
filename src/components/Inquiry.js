import React from 'react';
import iService from '../services/inquiry';
import qService from '../services/question';
import Question from './Question';

export default function Inquiry() {


const [questions, setQuestions] = React.useState([]); 

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
        <ul key={index}><Question question={q}/></ul>
        )}
    </div>
)
}