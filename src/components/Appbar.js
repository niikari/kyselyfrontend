import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { BrowserRouter, Routes, Route, Link} from "react-router-dom";
import Inquiry from './Inquiry';
import Admin from './Admin';
import Inquiries from './Inqueries';
import { Button } from '@mui/material';
import { useNavigate } from "react-router";


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));



export default function PrimarySearchAppBar() {
  
  
  
    //kun painetaan nappia niin ikkuna reloadaa sen sivun missä käyttäjä on
  function Logout(){
    sessionStorage.clear("jwt")
    window.location.reload();
  
  }

  return (


<BrowserRouter>

  <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar>
                  <Typography>
                    <div className="topnav">
                    <Link to="/inquiries">Inqueries</Link>
                      <Link to="/inquiry"> Inquiry</Link>
                      <Link to="/loginpage">Login</Link>
                      {sessionStorage.getItem("jwt") !== null && <button onClick={Logout}>Logout </button>}
                    </div>

                  </Typography>
                  <Search>
                      <SearchIconWrapper>
                      <SearchIcon />
                      </SearchIconWrapper>
                      <StyledInputBase placeholder="Hae kyselyä..."
                      inputProps={{ 'aria-label': 'search' }}/>
                  </Search> 
                  
                 
      </Toolbar>
    </AppBar>
  </Box>

            <Routes>
                  <Route path="/inquiry/*" element={<Inquiry url={window.location.href}/>}></Route>
                  <Route path="/loginpage" element={<Admin />}></Route>
                  <Route path="/inquiries"  element={<Inquiries/>}></Route> 
                  
            </Routes>

             

            </BrowserRouter>

  );
}