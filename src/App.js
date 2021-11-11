import React, { useEffect, useState } from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SelectInquiry from "./components/SelectInquiry";
import Box from '@mui/material/Box';
import Login from './components/Login';
import Button from '@mui/material/Button';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import NewInquiry from "./components/NewInquiry";

function App() {

  // PALVELIMEN OSOITE (PAIKALLINEN)
<<<<<<< HEAD
  // const url = "http://localhost:8080"

  // PILVESSÄ
  const url = 'https://kyselybackend123.herokuapp.com'
=======
  const url = "http://localhost:8080"
  // PALVELIMEN OSOITE PILVESSÄ
  // const url = 'https://kyselybackend123.herokuapp.com'
>>>>>>> oma_login

  const [auth, setAuth] = useState(false)

  // KATSO ONKO KIRJAUDUTTU
  useEffect(() => {
    if (sessionStorage.getItem('jwt') !== null) {
      setAuth(true)
    }
  }, [])

  const changeAuth = () => {
    setAuth(true)
  }

  const handleLogout = () => {
    sessionStorage.removeItem('jwt')
    setAuth(false)
  }

    
  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="transparent">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Ohjelmistoprojekti kysely
            </Typography>
            
            {auth === false && <Login url={url} changeAuth={changeAuth} />}
            {auth && <Button variant="outlined" color="error" onClick={handleLogout} style={{ marginLeft: 10 }}>Logout</Button>}
          </Toolbar>
        </AppBar>
      </Box> 
      {auth && <NewInquiry />}
      <SelectInquiry url={url} />
    </div>
  );
}

export default App;
