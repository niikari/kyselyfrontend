import React, { useState, useEffect } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Inquiries from "./components/Inquiries";
import Inquiry from "./components/Inquiry";
import CreateInquiry from "./components/CreateInquiry";
import colours from "./images/texture-g9dfd8c623_1920.jpg"
import Reports from './components/Reports';
import MenuMobile from "./components/MenuMobile";
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import EditInquiry from "./components/EditInquiry";

function App() {

  const url = 'https://kyselybackend123.herokuapp.com'
<<<<<<< HEAD
=======

>>>>>>> oma
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
    setMsg("Kirjautuminen onnistui, tervetuloa!")
    handleClick()
  }

  const handleLogout = () => {
    setAuth(false)
    setMsg("Kirjauduttu onnistuneesti ulos.")
    handleClick()
    sessionStorage.removeItem('jwt')
  }
  // KIRJAUTUMINEN PÄÄTTYY

  // SNACKBAR ALKAA
  const [open, setOpen] = useState(false)
  const [msg, setMsg] = useState('')

  const handleClick = () => {
      setOpen(true)
  }
  
  const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return
      }
  
      setOpen(false)
  }
  
  const action = (
      <React.Fragment>
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={handleClose}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </React.Fragment>
  )

  // SNACKBAR LOPPUU
  //<div className="App">
  // <MenuNormal auth={auth} handleLogout={handleLogout}/>
  //
  return (
    <BrowserRouter>      
    <div className="App" style={{ backgroundImage: `url(${colours})`, minHeight: 950 }}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar color="transparent" position="static" style={{ backgroundColor: 'white' }}>
            <Toolbar>      
            <MenuMobile auth={auth} handleLogout={handleLogout}/>      
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Ohjelmistoprojekti kysely
              </Typography>              
            </Toolbar>
          </AppBar>
        </Box>
        <Routes>
          <Route path="/" exact element={<Inquiries url={url} auth={auth}  />} />
          <Route path="/login" exact element={<Login url={url} login={login}  />} />
          <Route path="/inquiries/:id" exact element={<Inquiry url={url} />} />
          <Route path="/create" exact element={<CreateInquiry url={url} auth={auth} />} />          
          <Route path="/reports/:id" exact element={<Reports url={url} auth={auth} />} />
          <Route path="/edit/:id" exact element={<EditInquiry url={url} auth={auth} />} />
        </Routes>
      </div>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={msg}
        action={action}
        />
        
    </BrowserRouter>
    
  );
}

export default App;
