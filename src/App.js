import React from "react";
import Inquiry from "./components/Inquiry";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SelectInquiry from "./components/SelectInquiry";
import Results from "./components/Results";

function App() {

  // PALVELIMEN OSOITE (PAIKALLINEN)
  // const url = "http://localhost:8080"

  // PILVESSÄ
  const url = 'https://kyselybackend123.herokuapp.com'

  return (
    <div className="App">
      <AppBar position="static" color="transparent">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Ohjelmistoprojekti kysely
          </Typography>
        </Toolbar>
      </AppBar>  
      <SelectInquiry url={url}/>  
      < Results />
    </div>
  );
}

export default App;
