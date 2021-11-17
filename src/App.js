import React, { useState, useEffect } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Login from "./components/Login";
import Inquiries from "./components/Inquiries";
import Inquiry from "./components/Inquiry";
import MenuNormal from "./components/MenuNormal";
import CreateInquiry from "./components/CreateInquiry";
import colours from "./images/texture-g9dfd8c623_1920.jpg"

import Reports from './components/Reports';

function App() {

  // const url = 'https://kyselybackend123.herokuapp.com'

  const url = 'http://localhost:8080'

  // KIRJAUTUMINEN ALKAA
  const [auth, setAuth] = useState(false)


  // JOS KÄYTTÄJÄ ON KIRJAUTUNUT NIIN SESSIOON ON TALLENTUNUT JWT-TOKEN ARVO
  useEffect(() => {
    if (sessionStorage.getItem('jwt') !== null) {
      setAuth(true)
    }
  },[])

  // KIRJAUTUMISSIVUN KAUTTA ASETETAAN ARVO
  const login = () => {
    setAuth(true)
  }

  const handleLogout = () => {
    setAuth(false)
    sessionStorage.removeItem('jwt')
  }
  // KIRJAUTUMINEN PÄÄTTYY
    
  return (
    <BrowserRouter>
      <div className="App" style={{ backgroundImage: `url(${colours})`, height: 1600 }}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar color="transparent" position="static" style={{ backgroundColor: 'white' }}>
            <Toolbar>            
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Ohjelmistoprojekti kysely
              </Typography>
              <MenuNormal auth={auth} handleLogout={handleLogout}/>
            </Toolbar>
          </AppBar>
        </Box>
        <Routes>
          <Route path="/" exact element={<Inquiries url={url} auth={auth} />} />
          <Route path="/login" exact element={<Login url={url} login={login} />} />
          <Route path="/inquiries/:id" exact element={<Inquiry url={url} />} />
          <Route path="/create" exact element={<CreateInquiry url={url} auth={auth} />} />
          {auth &&
            <Route path="/reports/:id" exact element={<Reports url={url} />} />
          }
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
