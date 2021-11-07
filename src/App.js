import React from "react";
import Inquiry from "./components/Inquiry";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

function App() {

  return (
    <div className="App">
      <AppBar position="static" color="transparent">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Ohjelmistoprojekti kysely
          </Typography>
        </Toolbar>
      </AppBar>      
      <Inquiry />
    </div>
  );
}

export default App;
