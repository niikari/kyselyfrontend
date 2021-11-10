import React, { useState } from "react";
import Inquiry from "./components/Inquiry";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SelectInquiry from "./components/SelectInquiry";
import Box from '@mui/material/Box';
import Login from './components/Login';
import Button from '@mui/material/Button';

function App() {

  // PALVELIMEN OSOITE (PAIKALLINEN)
  const url = "http://localhost:8080"

  const [auth, setAuth] = useState(false)

  // PILVESSÄ
  // const url = 'https://kyselybackend123.herokuapp.com'

  
  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="transparent">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Ohjelmistoprojekti kysely
            </Typography>
            <Login url={url} />
            {auth && <Button>Logout</Button>}
          </Toolbar>
        </AppBar>
      </Box> 
      <SelectInquiry url={url} />
    </div>
  );
}

export default App;
