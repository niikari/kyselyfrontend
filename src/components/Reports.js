import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Loading from "./Loading";
import ReportsHandle from "./ReportsHandle";
import useMediaQuery from '@mui/material/useMediaQuery';

export default function Reports(props) {

    // PROPSISSA TULEE MUKANA MAKER-OLIO JA APIN URL

    // KATSOTAAN TUTKITAANKO RAPORTTIA KÄNNYLLÄ VAI EI
    const matches = useMediaQuery('(max-width:600px)')

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    // REACT ROUTER HAETAAN URL ID JA LUODAAN NAVIGATE OLIO
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        console.log(props.auth)
        if (props.auth) {
            fetch(`${props.url}/${props.what}/${id}`, {
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
            })
        } else {
            fetch(`${props.url}/${props.what}/${id}`)        
            .then(res => res.json())
            .then(data => {
                setData(data)
                setLoading(false)
            })
            .catch(err => {
                console.error(err)
            })
        }
        
    }, [id, navigate, props.url])


    while(loading) {
        return <Loading msg="Ladataan raporttia..." />
    }

    // MAPATAAN KAIKKI KYSYMYKSET KYSELYSSÄ LÄPI JA NÄISTÄ ERILLINEN RAPORTTI PER KYSSÄRI
    // JOS VASTAUKSIA EI OLE => RENDERÖIDÄÄN "EI ANNETTUJA VASTAUKSIA VIELÄ, MUUTEN TULEE ERROR"
    return (
        <>
        
        <div style={{ textAlign: 'center' }}>
        <h2>{data[0].answer.question.inquiry.name}</h2>
        <ReportsHandle data={data} mobile={matches} />
        </div>
        
        </>
    )
}