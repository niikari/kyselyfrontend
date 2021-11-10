import React, { useState } from "react";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { FormGroup } from "@mui/material";

export default function Login(props) {

    // MENU LOGIN NÄPPÄIMEN TAKANA
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl)

    // TÄHÄN TALLENETAAN ANNETUT ARVOT (KÄYTTÄJÄTUNNUS, SALASANA)
    const [user, setUser] = useState({})

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
    }

    const handleLogin = () => {
        fetchToken()
        handleClose()
        props.changeAuth()
    }

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
                handleClose()
                props.changeAuth()
            }
        })
        .catch(err => console.error(err))
    }

    return (
        <>
        <Button
            id="basic-button"
            aria-controls="basic-menu"
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            variant="outlined"
        >
        Login
        </Button>
        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
            'aria-labelledby': 'basic-button',
            }}
        >
            
            <FormGroup>
                <TextField
                    style={{ margin: 10}}
                    label="Käyttäjätunnus"
                    name="username"
                    type="text"
                    onChange={handleChange}
                 />
                 <TextField
                    style={{ margin: 10}}
                    label="Salasana"
                    name="password"
                    type="password"
                    onChange={handleChange}
                 />
                 <Button onClick={handleLogin} style={{ margin: 10}} variant="outlined">Login</Button>
            </FormGroup>
            
            
        </Menu>
        </>
    )
}