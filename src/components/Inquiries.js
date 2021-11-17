import { Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import Loading from "./Loading";
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export default function Inquiries(props) {

    const [inquiries, setInquiries] = useState([])
    const [loading, setLoading] = useState(true)

    // SNACKBAR
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
      setOpen(true);
    };
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };
    
    const action = (
        <React.Fragment>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      );

    // SNACKBAR LOPPUU

    useEffect(() => fetchInquiries(), [])

    const fetchInquiries = () => {
        fetch(`${props.url}/api/inquiries`)
        .then(res => res.json())
        .then(data => {
            setInquiries(data._embedded.inquiries)
            setLoading(false)
        })
        .catch(err => console.error(err))
    }

    while (loading) {
        return <Loading msg="Ladataan kyselyjä..." />
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
                    <Paper elevation={3} style={{margin: 'auto', marginTop: 20}}>
                        <h3>{inquiry.name}</h3>
                        <Link to={`/inquiries/${inquiry.id}`}>
                            <p>Aloita suorittaminen</p>
                        </Link>
                        {props.auth && 
                            <Link to={`/reports/${inquiry.id}`}>
                                <p>Raportti vastauksista</p>
                            </Link>
                        }
                    </Paper>
                    
                </Box>)
        }
        <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Kirjautuminen onnistui, tervetuloa!"
        action={action}
      />
        </>
    )
}