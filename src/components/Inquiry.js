import React from 'react';
import iService from '../services/inquiry';
import qService from '../services/question';
import Question from './Question';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';
import Paper from '@mui/material/Paper';
import { RadioGroup } from '@mui/material';
import makerService from '../services/maker';
import answerService from '../services/answer';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { Swiper, SwiperSlide} from "swiper/react";
import 'swiper/swiper.min.css'
import 'swiper/components/thumbs/thumbs.min.css'
import SwiperCore, { Navigation } from 'swiper'
import { Carousel } from 'react-responsive-carousel';
SwiperCore.use([Navigation])

export default function Inquiry(props) {





//muuttujat kysymykset ja valitut vastaukset. valitut vastaukset
//lähetetään tietokantaan, kun maker on tehty
const [questions, setQuestions] = React.useState([]); 
const [chosenAnswers, setChosenAnswers] = React.useState([]);
const [thumbsSwiper, setThumbsSwiper] = React.useState(null);


React.useEffect(() => getInquiry(),[]);

//haetaan kysely
const getInquiry = () => {

    var id = props.url.slice(-1);

    //jos kyselyssä ei validi id ni laittaa delault kyselyn
    if(isNaN(id)){
        iService.getById(1)
        .then(data => {
        console.log(data);
        getQuestions(data._links.questions.href);})
        .catch(error => console.error(error));
                
    }
    //jos id validi--> palauttaa halutun kyselyn
    else{
        iService.getById(id)
        .then(data => {
        console.log(data);
        getQuestions(data._links.questions.href);})
        .catch(error => console.error(error))
        }
}

//haetaan kysymykset kyselyn urlilla
const getQuestions = (url) => {
    console.log(url)
    qService
    .getByUrl(url)
    .then(data => {
        console.log(data._embedded.questions);
        setQuestions(data._embedded.questions);
        })
    .catch(error => console.error(error));
}

//nappia painamalla luodaan maker
const postMaker = () => {
    makerService
    .create()
    .then(data => {
        console.log('data:' + data);
        //kutsutaan alempi funktio 
        postAnswers(data._links.maker.href);
    })
    .catch(error => console.error(error));
}

//postataan makerin vastaukset 
const postAnswers = (url) => {
    console.log(url);
    chosenAnswers.forEach(a => {
        
        const aPost = {  
            openAnswer: a.openAnswer,
            maker: url,
            answer: a._links.self.href
        };

        console.log(aPost);

        answerService
        .createMakersAnswer(`https://kyselybackend123.herokuapp.com/api/makerAnswers`, aPost)
        .then(data => console.log(`posted answer ${data}`))
        .catch(error => console.error(error));
    });

   
}





return(
    
    <main> 
    
    <Swiper
        spaceBetween={50}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
        navigation={true}

        >
            
            {questions.map((q, index) =>


            <SwiperSlide>
            
                
                <Paper style={{ width: '30%', margin: 'auto', padding: 40, marginTop: 20, textAlign:'left' }}  elevation={3} key={index}>
                <FormControl key={index} component="fieldset">
                    
                        {
                            q.openQuestion && 
                            <Question question={q}  setChosenAnswers={setChosenAnswers} chosenAnswers={chosenAnswers}/>
                        }
                        {
                            
                            q.multipleAnswers && 
                            <Question question={q}  setChosenAnswers={setChosenAnswers} chosenAnswers={chosenAnswers}/>
                            
                        }
                        {
                            q.normQuestion && 
                            <RadioGroup>
                                <Question question={q}  setChosenAnswers={setChosenAnswers} chosenAnswers={chosenAnswers}/>
                            </RadioGroup>
                        }

                    </FormControl> 
                </Paper>
                
        
            </SwiperSlide>
            
            )}
    
            

            <SwiperSlide>
            <Button style={{width: 300, height: 200, alignContent: 'center',  marginTop: 40 }} startIcon={<AddCircleRoundedIcon/>} variant="contained" onClick={postMaker}>lähetä</Button>
            </SwiperSlide>

        </Swiper>

        

        
        </main>
)
}

