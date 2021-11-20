import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Loading from "./Loading";
import ReportsHandle from "./ReportsHandle";

export default function Reports(props) {

    // PROPSISSA TULEE MUKANA MAKER-OLIO JA APIN URL

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    // REACT ROUTER HAETAAN URL ID JA LUODAAN NAVIGATE OLIO
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`${props.url}/reports/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': sessionStorage.getItem('jwt')
            }
        })        
        .then(res => res.json())
        .then(data => {
            setData(data)
            setLoading(false)
        })
        .catch(err => {
            console.error(err)
            navigate('/login')
        })
    }, [id, navigate, props.url])


    while(loading) {
        return <Loading msg="Ladataan raporttia..." />
    }

    // MAPATAAN KAIKKI KYSYMYKSET KYSELYSSÄ LÄPI JA NÄISTÄ ERILLINEN RAPORTTI PER KYSSÄRI
    return (
        <div style={{ textAlign: 'center' }}>
        <h2>{data[0].answer.question.inquiry.name}</h2>
        <ReportsHandle data={data} />
        </div>
    )
}