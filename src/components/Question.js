import React from 'react';
import aService from '../services/answer';
import NormAnswer from './normAnswer';
import OpenAnswer from './OpenAnswer';

export default function Question(props) {

    const [answers, setAnswers] = React.useState([]);
    const [currentAnswer, setCurrentAnswer] = React.useState({});

  

    const answered = (answer) => {
        console.log(answer);
        deleteOldAnswer();
        props.setChosenAnswers((data) => [...data, answer]);
        console.log(props.chosenAnswers);
        setCurrentAnswer(answer);
    }

    const deleteOldAnswer = () => {
        console.log('poistetaan '+ currentAnswer.answer);
        props.setChosenAnswers(props.chosenAnswers.filter(answer => answer.answer !== currentAnswer.answer));
    }

    const getAnswers = () => {
        aService
       .getByUrl(props.question._links.answers.href)
       .then(data => setAnswers(data._embedded.answers))
       .catch(error => console.error(error));
    }

    React.useEffect(() => getAnswers(), [])
    React.useEffect(() =>  console.log(props.chosenAnswers),[props.chosenAnswers]);

    return(
        
        <div><h4>{props.question.quest}</h4>
        {answers.map((a, index) => 
        <ul key={index}>
            
            {props.question.openQuestion && <OpenAnswer answer={a} answered={answered}/>}
            {props.question.normQuestion && <NormAnswer answer={a} answered={answered}/>}
            
            </ul>
         )}
        </div>
    )
}