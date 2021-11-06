import React from 'react';
import aService from '../services/answer';
import Answer from './Answer';


export default function Question(props) {

    const [answers, setAnswers] = React.useState([]);
    const [currentAnswer, setCurrentAnswer] = React.useState({});

    const answered = (answer) => {
        
        props.setChosenAnswers(chosenAnswers => [...chosenAnswers, answer]);
        console.log(props.chosenAnswers);
        setCurrentAnswer(answer);
    }

    const deleteOldAnswer = () => {
        console.log('poistetaan '+ currentAnswer.answer);
        props.setChosenAnswers(props.chosenAnswers.filter(answer => answer.anwer !== currentAnswer.answer));
    }

    const getAnswers = () => {
        aService
       .getByUrl(props.question._links.answers.href)
       .then(data => setAnswers(data._embedded.answers))
       .catch(error => console.error(error));
    }

    React.useEffect(() => getAnswers(), [])

    return(
        
        <div><h4>{props.question.quest}</h4>
        {answers.map((a, index) => 
        <ul key={index}>
            
            <Answer i={index} answer={a} answered={answered}/>
            
            </ul>
         )}
        </div>
    )
}