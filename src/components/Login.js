import React, { useState } from "react";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import TextField from '@mui/material/TextField';
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
        <div>
        <h1>Testi</h1>
        </div>
    )
}