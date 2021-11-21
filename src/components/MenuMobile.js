import React, {useState} from "react"
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";

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
            <MenuItem onClick={() => {
                navigate('/')
                handleClose()
            }}>Etusivu</MenuItem>
            {props.auth && 
                <MenuItem onClick={() => {
                    navigate('/create')
                    handleClose()
                }}>Luo kysely</MenuItem>
            }
            {props.auth === false && 
                <MenuItem onClick={() => {
                    navigate('/login')
                    handleClose()
                }}>
                    Login
                </MenuItem>
            }
            {props.auth && 
                <MenuItem onClick={logout}>
                    <Link style={{ textDecoration: 'none', marginRight: 10 }} to="/">Logout</Link>
                </MenuItem>
            }
            
        </Menu>
        </>
    )
}