import React from 'react';
import aService from '../services/answer';
import Answer from './Answer';

export default function Question(props) {

    const [answers, setAnswers] = React.useState([]);
    const [chosenAnswers, setChosenAnswers] = React.useState([]);
    const [disabled, setDisabled] = React.useState(false)

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
        <ul key={index}><Answer answer={a}/></ul>
        )}
        </div>
    )
}