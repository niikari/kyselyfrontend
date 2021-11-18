import logo from './logo.svg';
import './App.css';
import React from 'react';
import Inquiry from './components/Inquiry';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Admin from './components/admin/Admin';

function App() {
  
  const [loginBoolean, setLoginBoolean] = React.useState(false);
  
  const loginClicked = () => {
    loginBoolean ? setLoginBoolean(false) : setLoginBoolean(true);
  }  
  
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" onClick={loginClicked}>login</Button>
          </Toolbar>
          </AppBar>
      {!loginBoolean &&<Inquiry />}
      {loginBoolean && <Admin />}
    </div>
  );
}

export default App;
