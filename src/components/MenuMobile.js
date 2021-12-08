import React, {useState} from "react"
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from "react-router";
import HomeIcon from '@mui/icons-material/Home';
import CreateIcon from '@mui/icons-material/Create';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';

export default function MenuMobile(props) {

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate()

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const logout = () => {
        props.handleLogout()
        navigate('/')
        handleClose()
    }

    return (
        <>
        <Button
            startIcon={<MenuIcon />}
            id="basic-button"
            aria-controls="basic-menu"
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            size="large"
        >
            
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
            <MenuItem  onClick={() => {
                navigate('/')
                handleClose()
            }}><HomeIcon />Etusivu</MenuItem>
            {props.auth === false && 
                <MenuItem onClick={() => {
                    navigate('/login')
                    handleClose()
                }}>
                    <LoginIcon />Login
                </MenuItem>
            }
            {props.auth && 
                <MenuItem onClick={logout}>
                    <LogoutIcon />Logout
                </MenuItem>
            }
            
        </Menu>
        </>
    )
}