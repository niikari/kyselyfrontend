import React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios';

export default function Admin() {
 
    const [user, setUser] = React.useState({
        username:'',
        password:''
    });
 
    React.useEffect(data => console.log(data),[user])

    const handleChange = (e) => {
     setUser({...user, [e.target.name]: e.target.value});
     
    }

    const getToken = () => {
        axios.post('https://kyselybackend123.herokuapp.com/login', {username: user.username, password:user.password})
        .then(res => {
            console.log(res);
            const jwtToken = res.headers.authorization;
            jwtToken ? sessionStorage.setItem("jwt", jwtToken) 
            : console.log('jwtToken is null');
            console.log(sessionStorage.getItem('jwt'));
        })
        .catch(err => console.error(err))
    }

    return(
        <Stack style={{width:'50%', margin:'auto'}}>                    
            <TextField  label="Käyttäjätunnus" name="username" onChange={handleChange} />                    
            <TextField type="password"  label="Salasana" name="password" onChange={handleChange} />
            <Button color="inherit" onClick={getToken} size="large" >Kirjaudu</Button>                  
        </Stack> 
        )
}