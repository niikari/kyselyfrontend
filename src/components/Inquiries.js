import { Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import Loading from "./Loading";
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

export default function Inquiries(props) {

    const [inquiries, setInquiries] = useState([])
    const [loading, setLoading] = useState(true)

    // SNACKBAR
    const [open, setOpen] = React.useState(false);

  
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

    useEffect(() => {
        fetch(`${props.url}/api/inquiries`)
        .then(res => res.json())
        .then(data => {
            setInquiries(data._embedded.inquiries)
            setLoading(false)
        })
        .catch(err => console.error(err))
    }, [props.url])


    while (loading) {
        return <Loading msg="Ladataan kyselyjä..." />
    }

    return (
        <>
        {
            inquiries.map(inquiry => 
                <Box
                    margin={0.2}
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
                    <Paper elevation={3} style={{margin: 'auto', marginTop: 20, padding: 15}}>
                        <h3>{inquiry.name}</h3>
                        <Link style={{ textDecoration: 'none' }} to={`/inquiries/${inquiry.id}`}>
                            <Button style={{  marginRight: 5 }} variant="outlined">Suorita</Button>
                        </Link>
                        {props.auth && 
                            <Link to={`/reports/${inquiry.id}`} style={{ textDecoration: 'none' }}>
                                <Button style={{  marginRight: 5 }} variant="outlined" color="warning" startIcon={<ShowChartIcon />}>Raportti</Button>
                            </Link>
                        }
                        {props.auth && 
                            <Link to={`/edit/${inquiry.id}`} style={{ textDecoration: 'none' }}>
                                <Button variant="outlined" color="secondary" startIcon={<ModeEditIcon />}>Muokkaa</Button>
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