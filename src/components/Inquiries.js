import { Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';

export default function Inquiries(props) {

    const [inquiries, setInquiries] = useState([])

    useEffect(() => fetchInquiries(), [])

    const fetchInquiries = () => {
        fetch(`${props.url}/api/inquiries`)
        .then(res => res.json())
        .then(data => setInquiries(data._embedded.inquiries))
        .catch(err => console.error(err))
    }

    return (
        <>
        {
            inquiries.map(inquiry => 
                <Box
                    key={inquiry.id}
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        '& > :not(style)': {
                        m: 1,
                        width: 380,
                        height: 128,
                        },
                    }}
                >
                    <Paper elevation={3} >
                        <h3>{inquiry.name}</h3>
                        <Link to={`/inquiries/${inquiry.id}`}>
                            <p>Aloita suorittaminen</p>
                        </Link>
                    </Paper>
                    
                </Box>)
        }
        </>
    )
}