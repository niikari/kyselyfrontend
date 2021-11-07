import { Checkbox, FormControlLabel } from "@mui/material"

export default function MultiAnswer(props) {

    return(
        <FormControlLabel 
            key={props.answer.answer} 
            label={props.answer.answer} 
            value={props.answer}
            control={<Checkbox /> }
            onChange={(e) => props.multiChange(e, props.answer)}
         />

    )
}