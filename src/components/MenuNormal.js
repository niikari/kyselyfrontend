import React from "react";
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from "react-router-dom";

export default function MenuNormal(props) {

    return (
        <>
        <Link style={{ textDecoration: 'none', marginRight: 10 }} to="/"><Button variant="contained" startIcon={<HomeIcon />}>Etusivu</Button></Link>
        {props.auth === false && <Link  style={{ textDecoration: 'none' }} to="/login"><Button variant="contained" startIcon={<LoginIcon />}>Kirjaudu</Button></Link>}
        {props.auth && 
            <Link style={{ textDecoration: 'none', marginRight: 10 }} to="/">
            <Button variant="contained" onClick={props.handleLogout} endIcon={<LogoutIcon />}>Kirjaudu ulos</Button>
            </Link>
        }
        </>
    )
}