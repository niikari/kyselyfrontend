import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Loading from "./Loading";
import InquiryE from './edits/InquiryE';
import QuestionE from './edits/QuestionE';
import { Button } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Login from "./Login";

export default function EditInquiry(props) {

    const [iName, setIName] = React.useState('')
    const { id } = useParams()
    const [inquiry, setInquiry] = useState({})
    const [questions, setQuestions] = useState([])
    const [loading, setLoading] = useState(true)
    const [openNewInquiry, setOpenNewInquiry] = useState(false)
    const [newInquiry, setNewInquiry] = useState('')
    

    const navigate = useNavigate()

    //kysymyksen luonti
    const [newQuest, setNewQuest] = useState('')
    const [open, setOpen] = React.useState(false)

    //kysymyksien tapa (radio, normi tai open)
    const [multiple, setMultiple] = React.useState(false);
    const [openQuest, setOpenQuest] = React.useState(false);
    const [norm, setNorm] = React.useState(true);

    useEffect(() =>  fetchInquiry(id) ,[])

    const fetchInquiry = (inqId) => {
        console.log('fetching inquiry')
        fetch(`${props.url}/api/inquiries/${inqId}`)
        .then(res => res.json())
        .then(data => {
            setInquiry(data)
            fetchQuestions(data._links.questions.href)
            setLoading(false)
        })
        .catch(err => console.error(err))
    }

    const createInquiry = () => {
        fetch(`${props.url}/api/inquiries`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem('jwt')
            },
            body: JSON.stringify({name: newInquiry})
        })
        .then(res => res.json())
        .then(data => {
            navigate(`/edit/${data.id}`)
            fetchInquiry(data.id)
            })
        .catch(err => console.error(err))
        
        setOpenNewInquiry(false);
        
    }


    const fetchQuestions = (link) => {
        fetch(link)
        .then(res => res.json())
        .then(data => setQuestions(data._embedded.questions))
        .catch(err => console.error(err))
    }

    const editInquiryName = () => {
        fetch(inquiry._links.self.href, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem('jwt')
            },
            body: JSON.stringify({...inquiry, name: iName})
        })
        .then(res => {
            if (res.ok) {
                fetchInquiry(id)
            }
        })
        .catch(err => console.error(err))
    }

    const createQuestion = () => {
        fetch('https://kyselybackend123.herokuapp.com/api/questions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem('jwt')
            },
            body: JSON.stringify({
                quest: newQuest,
                inquiry: inquiry._links.self.href,
                multipleAnswers:multiple,
                openQuestion:openQuest,
                normQuestion:norm  })
        })
        .then(res => fetchInquiry(id))
    }

    const deleteQuestion = (question) => {
        fetch(question._links.self.href, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem('jwt')
            }
        })
        .then(res => {
            if (res.ok) {
                fetchInquiry(id)
            }
        })
        .catch(err => console.error(err))
    }

    const deleteInquiry = () => {
        fetch(inquiry._links.self.href, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem('jwt')
            }
        })
        .then(res => {
            if (res.ok) {
                alert('kysely poistettu')
                navigate('/')
            }
        })
        
        .catch(err => console.error(err))
    }

    const editQuestionName = (question, name) => {
        fetch(question._links.self.href, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem('jwt')
            },
            body: JSON.stringify({...question, quest: name})
        })
        .then(res => {
            if (res.ok) {
                fetchInquiry(id)
            }
        })
        .catch(err => console.error(err))
    }

    const createButtonClicked = () => {
        setOpen(false)
        createQuestion()
    }


    while (loading) {
        return <Loading msg="Ladataan kyselyä..." />
    }

    return (
            <div style={{width:'80%', margin:'auto'}}>
         <Button 
         onClick={() => setOpen(true)} 
         variant="contained" endIcon={<AddIcon/>} 
         style={{marginTop:10}}>
             lisää uusi kysymys
        </Button> 

        <Button 
        onClick={() => setOpenNewInquiry(true)}
        color="success"
        variant="contained" 
        endIcon={<AddIcon/>} 
        style={{marginTop:10, marginLeft:10}}>
             Luo uusi kysely
        </Button> 

        <Dialog open={openNewInquiry} onClose={() => setOpenNewInquiry(false)}>
            <DialogContent>
                <TextField style={{margin:'auto',padding:50, width:'80%'}} onChange={(e) => setNewInquiry(e.target.value)} value={newInquiry}/>
                <Button onClick={createInquiry}>create inquiry</Button>
            </DialogContent>
        </Dialog>

            <InquiryE
                inquiry={inquiry} 
                questions={questions} 
                name={iName}
                setName={setIName}
                editInquiryName={editInquiryName}
                />
            {
                questions.map((q,index) => 
                <QuestionE 
                deleteQuestion={deleteQuestion}
                editQuestionName={editQuestionName}
                question={q}
                key={index}/>)
            }

            <Button 
            aria-label="delete" 
            color="error" 
            size="small" 
            onClick={() => deleteInquiry(inquiry)}
            style={{marginTop:20}}>
                Poista kysely
            </Button>

            <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogContent>

            <p>Luo kysymys</p>
            <TextField style={{margin:'auto',padding:50, width:'80%'}} onChange={(e) => setNewQuest(e.target.value)} value={newQuest}/>
            <RadioGroup>
            <FormControlLabel 
                    onChange={() => {
                        setMultiple(true) 
                        setOpenQuest(false)
                        setNorm(false)
                        console.log(1)}}
                    value={1} 
                    control={<Radio />} 
                    label='monivalinta'/>
            
            <FormControlLabel 
                    onChange={() => {
                        setOpenQuest(true) 
                        setMultiple(false)
                        setNorm(false)
                        console.log(2)}}
                    value={2} 
                    control={<Radio />} 
                    label='teksti vastaus'/>
            <FormControlLabel 
                    onChange={() => {
                        setMultiple(false)
                        setOpenQuest(false)
                        setNorm(true)
                        console.log(3)}}
                    value={3}
                    control={<Radio />} 
                    label='tavallinen'/>
            </RadioGroup>
           <Button onClick={()=>createButtonClicked()}>Luo</Button>
        
        </DialogContent>
        </Dialog>
        
        </div>
        
    )
}