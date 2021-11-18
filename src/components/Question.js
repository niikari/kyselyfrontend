import React from 'react';
import aService from '../services/answer';
import NormAnswer from './NormAnswer';
import OpenAnswer from './OpenAnswer';
import MultiAnswer from './MultiAnswer';

export default function Question(props) {

    //muuttujat vastaukset ja nykyiset vastaukset. Muuttujaa nykyiset vastaukset
    //käytetään kun vastaus muuttuu ja vanhat vastaukset pitää poistaa
    const [answers, setAnswers] = React.useState([]);
    const [currentAnswer, setCurrentAnswer] = React.useState({});
    
    //monivalinta kysymyksessä
    const multiChange = (e, answer) => {
        if (e.target.checked) {
            props.setChosenAnswers((data) => [...data, answer]);
        }
        if (e.target.checked === false) {
            console.log(`poistetaan ${answer}`)
            deleteOldAnswer(answer);
        }
    }

    //muissa kysymyksissä 
    const answered = (answer) => {
        console.log(answer);
        deleteOldAnswer(currentAnswer);
        props.setChosenAnswers((data) => [...data, answer]);
        console.log(props.chosenAnswers);
        setCurrentAnswer(answer);
    }

    const deleteOldAnswer = (answer) => {
        console.log('poistetaan '+ answer.answer);
        props.setChosenAnswers(props.chosenAnswers.filter(data => data.answer !== answer.answer));
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
        
        <div style={{textAlign:'left'}}><h4>{props.question.quest}</h4>
        {answers.map((a, index) => 
        <ul key={index}>
            
            {props.question.openQuestion && <OpenAnswer answer={a} answered={answered}/>}
            {props.question.normQuestion && <NormAnswer answer={a} answered={answered}/>}
            {props.question.multipleAnswers && <MultiAnswer answer={a} answered={answered} multiChange={multiChange}/>}
            </ul>
         )}
        
        </div>
    )
}