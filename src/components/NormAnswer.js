
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';

export default function NormAnswer(props) {
    return(
        <FormControlLabel 
                    onChange={() => props.answered(props.answer)} 
                    key={props.answer.answer}
                    value={props.answer.answer} 
                    control={<Radio />} 
                    label={props.answer.answer} />
            ) 
    
}
