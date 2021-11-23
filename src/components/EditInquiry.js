import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Loading from "./Loading";
import InquiryE from './edits/InquiryE';
import QuestionE from './edits/QuestionE';

export default function EditInquiry(props) {

    const [iName, setIName] = React.useState('')
    

    const { id } = useParams()

    const [inquiry, setInquiry] = useState({})
    const [questions, setQuestions] = useState([])
    const [loading, setLoading] = useState(true)

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
                // ILMOITETAANKO SNACKBARILLA?
                console.log(res.json())
            }
        })
        .catch(err => console.error(err))
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
                //fetchInquiry()
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
                // ILMOITETAANKO SNACKBARILLA?
                console.log(res.json())
            }
        })
        .catch(err => console.error(err))
    }


    while (loading) {
        return <Loading msg="Ladataan kyselyä..." />
    }

    return (
        <div style={{width:'80%', margin:'auto'}}>
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
        </div>
    )
}