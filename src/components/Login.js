import React, { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import { useNavigate } from "react-router";
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export default function Login(props) {

    // TÄHÄN TALLENETAAN ANNETUT ARVOT (KÄYTTÄJÄTUNNUS, SALASANA)
    const [user, setUser] = useState({})

    const navigate = useNavigate()

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

    // HAETAAN TOKEN - JOS EI HYVÄKSYTTYJÄ TUNNUKSIA NIIN...?
    const fetchToken = () => {
        fetch(`${props.url}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res => {
            const jwtToken = res.headers.get('Authorization')
            if (jwtToken !== null) {
                sessionStorage.setItem("jwt", jwtToken)
                props.login()
                navigate('/')
            } else {
                handleClick()
            }
        })
        .catch(err => console.error(err))
    }

    const handleChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
    }

    return (
        <>
        <Box            
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                '& > :not(style)': {
                m: 1,
                width: 360,
                height: 320,
                },
            }}
            >
            <Paper elevation={3} style={{margin: 'auto', marginTop: 10}}  >
                <Stack>
                    <TextField style={{ margin: '7%' }} label="Käyttäjätunnus" name="username" onChange={handleChange} />
                    <TextField type="password" style={{ margin: '7%' }} label="Salasana" name="password" onChange={handleChange} />
                    <Button onClick={fetchToken} startIcon={<VpnKeyOutlinedIcon />}>Kirjaudu</Button>
                </Stack>
            </Paper>
        </Box> 
        <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Tarkista antamasi käyttäjätunnus tai salasana..."
        action={action}
      />        
        </>
    )
}