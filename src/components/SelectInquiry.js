import React, { useEffect, useState } from "react";
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Inquiry from "./Inquiry";
import Loading from "./Loading";

export default function SelectInquiry(props) {

    const [inquiries, setInquiries] = useState([])
    const [selected, setSelected] = useState(false)
    const [inquiry, setInquiry] = useState()
    const [loading, setLoading] = useState(true)

    // HAETAAN PALVELIMELTA KAIKKI KYSELY-PATTERISTOT
    useEffect(() => {
        fetch(`${props.url}/api/inquiries`)
        .then(res => res.json())
        .then(data => {
            setInquiries(data._embedded.inquiries)
            setLoading(false)
        })
        .catch(err => console.error(err))
    }, [])

    // KUN KYSELY VALITTU NIIN PIILOTETAAN TÄMÄ VALIKKO JA AVATAAN NÄKYVIIN KYSYMYKSET
    const handleSelection = (inq) => {
        setInquiry(inq)
        setSelected(true)
    }

    // NÄYTETÄÄN LOADING, KUNNES KYSELYT LADATTU
    while (loading) {
        return <Loading msg="Ladataan kyselyjä..." />
    }

    return (
        <>
        {selected === false &&
        <div style={{ textAlign:"center" }}>
        {
            inquiries.map((inquiry, index) => 
            <Box
                key={index}
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                '& > :not(style)': {
                m: 1,
                width: 480,
                height: 'auto',
                },
            }}
            >
            <Paper elevation={3}>
                <p>Nimi: <b>{inquiry.name}</b></p>
                <Button onClick={() => handleSelection(inquiry)} style={{marginBottom:10}} variant="outlined">Aloita suorittaminen</Button><br></br>
                
            </Paper>
            </Box>)
        }
        </div>}
        {selected && <Inquiry inquiry={inquiry} url={props.url} />}
        </>
    )
}