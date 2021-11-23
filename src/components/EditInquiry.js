import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Loading from "./Loading";
import InquiryE from './edits/InquiryE';
import QuestionE from './edits/QuestionE';
import { Button } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

export default function EditInquiry(props) {

    const [iName, setIName] = React.useState('')
    const { id } = useParams()
    const [inquiry, setInquiry] = useState({})
    const [questions, setQuestions] = useState([])
    const [loading, setLoading] = useState(true)
    const [newQuest, setNewQuest] = useState('')
    const [open, setOpen] = React.useState(false);

    useEffect(() => console.log(iName),[iName])
    useEffect(() =>  fetchInquiry() ,[])

    const fetchInquiry = () => {
        fetch(`${props.url}/api/inquiries/${id}`)
        .then(res => res.json())
        .then(data => {
            setInquiry(data)
            fetchQuestions(data._links.questions.href)
            setLoading(false)
        })
        .catch(err => console.error(err))
    }

    const fetchQuestions = (link) => {
        fetch(link)
        .then(res => res.json())
        .then(data => setQuestions(data._embedded.questions))
        .catch(err => console.error(err))
    }

    const editInquiryName = () => {
        console.log(`Inquiry new name: ${iName}`);
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
                fetchInquiry()
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
            body: JSON.stringify({quest: newQuest, inquiry: inquiry._links.self.href })
        })
        .then(res => {
            if (res.ok) {
               fetchInquiry();
            }
        })
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
                fetchInquiry()
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
            }
        })
        .catch(err => console.error(err))
    }

    const editQuestionName = (question, name) => {
        console.log(`questions new name: ${name}`);
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
                fetchInquiry()
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
         <Button onClick={() => setOpen(true)} endIcon={<AddIcon/>}>Add a Question</Button>
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
            color="error" size="small" 
            onClick={() => deleteInquiry(inquiry)} >
                Delete Inquiry
            </Button>

            <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogContent>
            <p>Create a Question</p>
            <TextField style={{margin:'auto',padding:50, width:'80%'}} onChange={(e) => setNewQuest(e.target.value)} value={newQuest}/>
            <Button onClick={()=>createButtonClicked()}>create</Button>
        </DialogContent>
        </Dialog>
        
        </div>
    )
}