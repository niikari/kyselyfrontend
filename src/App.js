import React, { useState } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Login from "./components/Login";
import Inquiries from "./components/Inquiries";
import Inquiry from "./components/Inquiry";

function App() {

  const url = 'https://kyselybackend123.herokuapp.com'

  //const url = 'http://localhost:8080'

  const [auth, setAuth] = useState(false)
    
  return (
    <BrowserRouter>
      <div className="App">
        <Box sx={{ flexGrow: 1 }}>
          <AppBar color="transparent" position="static">
            <Toolbar>            
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Ohjelmistoprojekti kysely
              </Typography>
              <Link to="/">Etusivu</Link>
              {auth === false && <Link to="/login">Kirjaudu</Link>}
              {auth && <p>Kirjaudu ulos</p>}
            </Toolbar>
          </AppBar>
        </Box>
        <Routes>
          <Route path="/" exact element={<Inquiries url={url} />} />
          <Route path="/login" exact element={<Login url={url} />} />
          <Route path="/inquiries/:id" exact element={<Inquiry url={url} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
