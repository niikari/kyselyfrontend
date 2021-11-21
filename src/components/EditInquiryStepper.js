import React, { useState } from "react";
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import TextField from '@mui/material/TextField';
import { Stack } from "@mui/material";

export default function EditInquiryStepper(props) {

    const steps = [
        {
          label: 'Vaihda tai muokkaa kyselysi nimeä',
          description: `Kyselysi nimi nyt: ${props.inquiry.name}`,
        },
        {
          label: 'Muokkaa tai vaihda kysymyksiä',
          description:
            `Kysymyksiä nyt yhteensä: ${props.questions.length}`,
        },
        {
          label: 'Muokkaa tai vaihda tietyn kysymyksen vastauksia',
          description: `Tähän jotain infoa...`,
        },
      ];


    const [newName, setNewName] = useState('')

    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);
    const maxSteps = steps.length;
  
    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <div style={{ marginTop: 20, maxWidth: 400, margin: 'auto' }}>
            <Paper elevation={3} style={{ marginTop: 20 }}>
    <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
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
      <Box sx={{ height: 450, maxWidth: 400, width: '92%', p: 2 }}>
        {steps[activeStep].description}
        {activeStep === 0 && 
            <Stack direction="row" style={{ marginTop: 80 }}>
                <TextField 
                    label="Anna uusi nimi"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    />
                <Button onClick={() => {
                    props.editInquiryName(newName)
                    setNewName('')
                }} style={{ marginLeft: 10 }} variant="outlined">Vahvista</Button>
            </Stack>
        }
        {activeStep === 1 &&
            props.questions.map((question, index) =>
            <p key={index}>{index + 1}) {question.quest}</p>)
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
        </div>
    )
}