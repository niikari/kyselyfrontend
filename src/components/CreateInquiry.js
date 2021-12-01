import React, {useState} from "react";
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import TextField from '@mui/material/TextField';


const steps = [
    {
      label: 'Aloitetaan luomaan uutta kyselyä',
      description: `Ensin määritellään uudelle kyselyllesi kuvaava nimi`,
    },
    {
      label: 'Create an ad group',
      description:
        'An ad group contains one or more ads which target a shared set of keywords.',
    },
    {
      label: 'Create an ad',
      description: ``,
    },
  ];

export default function CreateInquiry(props) {

    const [inquiry, setInquiry] = useState({})

    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = steps.length;

  
    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <div style={{ marginTop: 20, maxWidth: 400, margin: 'auto' }}>
            {props.auth && 
            <Paper elevation={3} style={{marginTop: 20}}>
            <Box sx={{ maxWidth: 400, flexGrow: 1}}>
                <Paper
                    square
                    elevation={0}
                    sx={{
                    display: 'flex',
                    alignItems: 'center',
                    height: 50,
                    pl: 2,
                    bgcolor: 'background.default',
                    }}
                >
                    <Typography>{steps[activeStep].label}</Typography>
                </Paper>
                <Box sx={{ height: 450, maxWidth: 400, width: '100%', p: 2 }}>
                    {steps[activeStep].description}
                    {activeStep === 0 && 
                        <TextField 
                            style={{ marginTop: 80 }}
                            label="Anna nimi..."
                            name="name"
                            onChange={(e) => setInquiry({...inquiry, [e.target.name]: e.target.value})}
                            />
                    }
                </Box>
                <MobileStepper
                    variant="text"
                    steps={maxSteps}
                    position="static"
                    activeStep={activeStep}
                    nextButton={
                    <Button
                        size="small"
                        onClick={handleNext}
                        disabled={activeStep === maxSteps - 1}
                    >
                        Eteenpäin
                        {theme.direction === 'rtl' ? (
                        <KeyboardArrowLeft />
                        ) : (
                        <KeyboardArrowRight />
                        )}
                    </Button>
                    }
                    backButton={
                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                        {theme.direction === 'rtl' ? (
                        <KeyboardArrowRight />
                        ) : (
                        <KeyboardArrowLeft />
                        )}
                        Taaksepäin
                    </Button>
                    }
                />
                </Box>
                </Paper>

            }
        </div>
    )
}