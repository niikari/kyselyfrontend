import React from 'react';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';
import { RadioGroup } from '@mui/material';
import makerService from '../services/maker';
import answerService from '../services/answer';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import axios from 'axios';
import Fab from '@mui/material/Fab';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import { Grid } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Zoom from '@mui/material/Zoom';
import SwipeableViews from 'react-swipeable-views';
import { Bar } from 'react-chartjs-2';
import Collapse from '@material-ui/core/Collapse';


import PropTypes from 'prop-types';
import AddIcon from '@mui/icons-material/Add';
import UpIcon from '@mui/icons-material/KeyboardArrowUp';
import { green } from '@mui/material/colors';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NavigationIcon from '@mui/icons-material/Navigation';
import TextField from '@mui/material/TextField';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import loginImg from './login.jpg'

            function TabPanel(props) {
                const { children, value, index, ...other } = props;
            
                return (
                <Typography
                    component="div"
                    role="tabpanel"
                    hidden={value !== index}
                    id={`action-tabpanel-${index}`}
                    aria-labelledby={`action-tab-${index}`}
                    {...other}
                >
                    {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
                </Typography>
                );
            }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
            function a11yProps(index) {
                return {
                id: `action-tab-${index}`,
                'aria-controls': `action-tabpanel-${index}`,
                };
            }
  
  const fabStyle = {
    position: 'absolute',
    bottom: 16,
    right: 16,
  };
  
            const fabGreenStyle = {
                color: 'common.white',
                bgcolor: green[500],
                '&:hover': {
                bgcolor: green[600],
                },
            };

export default function Admin(props) {

    const [open, setOpen] = React.useState(false)
    const [msg, setMsg] = React.useState('')
    const [userJwt, setUserJwt] = React.useState(null);
    const [clicked, setClicked] = React.useState(false);
    const url = "https://kyselybackend123.herokuapp.com"
    const [user, setUser] = React.useState({username: "", password:""});
    const [loggedin, setLoggedin] = React.useState(false);

    
//Snackbar maarittelyä
    const action = (
        <React.Fragment>
          <IconButton
            size="small"
            aria-label="close"
            color="primary"
            onClick={()=>setOpen(false)}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
    )


    const theme = useTheme();
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    const handleChangeIndex = (index) => {
      setValue(index);
    };
  
    const transitionDuration = {
      enter: theme.transitions.duration.enteringScreen,
      exit: theme.transitions.duration.leavingScreen,
    };
  
    const fabs = [
      {
        color: 'secondary',
        sx: fabStyle,
        icon: <LoginIcon onClick={()=>getToken()} />,
        label: 'Add',
      },
      {
        color: 'primary',
        sx: fabStyle,
        icon: <LoginIcon onClick={()=>getToken()}/>,
        label: 'Edit',
      },
      {
        color: 'inherit',
        sx: { ...fabStyle, ...fabGreenStyle },
        icon: <LoginIcon />,
        label: 'Expand',
      },
    ];



//ALKAA CHART MÄÄRITTELY
const data = {
    labels: ['1', '2', '3', '4', '5', '6'],
    datasets: [
      {
        label: '# of Red Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: 'rgb(255, 99, 132)',
      },
      {
        label: '# of Blue Votes',
        data: [2, 3, 20, 5, 1, 4],
        backgroundColor: 'rgb(54, 162, 235)',
      },
      {
        label: '# of Green Votes',
        data: [3, 10, 13, 15, 22, 30],
        backgroundColor: 'rgb(75, 192, 192)',
      },
    ],
  };
  
  const options = {
    scales: {
      y: {
        stacked: true,
        ticks: {
          beginAtZero: true
        }
      },
      x: {
        stacked: true
      }
    }
  };

// TÄSSÄ LOPPUU TYYLIMÄÄRITTELYT



//haetaan tokeni servulta
const getToken = () => {

    axios.post(url+"/login", {
        username:user.username, password:user.password})
        .then((response) => {
            //pitäs laittaa viel johonki globaalliin muistiin tokeni
            //nyt menee vaa statee ja poistuu refreshissä ja muilla sivuilla
            //täytyy pistää selaime muistiin niin voi käyttää boolean muutujia hyväks renderöinnis
            setUserJwt(response.headers.authorization)
            setClicked(false);
            setLoggedin(true);
            setMsg("Logged in succesfully!")
            setOpen(true)

      }, (error) => {
            console.log(error)
            setMsg(error+"error")
            setOpen(true)
      });
 
    
    }
    
   const fetchStats=()=>{
       alert("moi")
   }

   const handleChange1 = (event)=>{
    setUser({...user, [event.target.name]: event.target.value});
    
    }



return(
    
<main> 
   {loggedin===true && <div>  USER TOKEN: </div>}
   {loggedin===false && <div className="loginImage">
    <img src={loginImg} width="300" style={{position: 'relative'}} alt="login"/>
    </div>}
   
   <Grid
  container
  spacing={0}
  direction="column"
  alignItems="center"
  justifyContent="top"
  style={{ minHeight: '100vh' }}
>

{loggedin===false && <Box 
        sx={{
            
            bgcolor: 'background.paper',
            width: 500,
            position: 'relative',
            minHeight: 200,
        }}
        >
        <AppBar position="static" color="default">
            <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="action tabs example"
            >
                <Tab label="Admin Login" {...a11yProps(0)} />
                <Tab label="Creator login" {...a11yProps(1)} />
                <Tab label="Item Three" {...a11yProps(2)} />
            </Tabs>
        </AppBar>
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={value}
                    onChangeIndex={handleChangeIndex}
                >
                    <TabPanel value={value} index={0} dir={theme.direction}>
                    <div> Admin Login </div>
                                <TextField id="outlined-basic" name ="username" label="username" variant="outlined" onChange={handleChange1}/>
                                <TextField id="filled-basic" name ="password" label="password" variant="filled" onChange={handleChange1} />
                    </TabPanel>
                    <TabPanel value={value} index={1} dir={theme.direction}>
                    <div> Survey creator login </div>
                                <TextField id="outlined-basic" name ="username" label="username" variant="outlined" onChange={handleChange1}/>
                                <TextField id="filled-basic" name ="password" label="password" variant="filled" onChange={handleChange1} />
                    </TabPanel>
                    <TabPanel value={value} index={2} dir={theme.direction}>
                    <div> mitävaan</div>
                    
                    </TabPanel>
                </SwipeableViews>
            {fabs.map((fab, index) => (
                        <Zoom
                        key={fab.color}
                        in={value === index}
                        timeout={transitionDuration}
                        style={{
                            transitionDelay: `${value === index ? transitionDuration.exit : 0}ms`,
                        }}
                        unmountOnExit
                        >
                        <Fab sx={fab.sx} aria-label={fab.label} color={fab.color}>
                            {fab.icon}
                        </Fab>
                        </Zoom>
            ))}
        </Box>}

    
 
{userJwt}
    
{/* myöhemmin täst selaimelta info että onko tokenia yms */}
 {loggedin===true && <Button onClick={()=>setClicked(true)}> Show charts </Button>}
 {loggedin===true && <Button onClick={()=>setClicked(true)}> Add new inqueries</Button>}
 {loggedin===true && <Button onClick={()=>setClicked(true)}> Show something </Button>}
 {loggedin===true && <Button onClick={()=>setClicked(true)}> Add Questions </Button>}
 {/* myöhemmin täst selaimelta info että onko tokenia yms */}
 {clicked===true && <Bar data={data} options={options} />}


</Grid> 

<Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={()=>setOpen(false)}
        message={msg}
        action={action}
        alignItems="center"
        justifyContent="center"
        color="secondary"
      />
      </main> 
)
}

