import React ,{ useEffect, useState } from "react";
import axios from 'axios';
import Inquiry from "./Inquiry";
import Paper from '@mui/material/Paper';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Collapse from '@material-ui/core/Collapse';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Loading from "./Loading";

export default function Inqueries() {
    const url = 'https://kyselybackend123.herokuapp.com'
    const [search, setSearch] = React.useState();
   const[fetched, setFetched]=React.useState(false);
   const[inqueries, setQuery]=React.useState([]);
   const[inquiryurl, setInquiryurl]= React.useState("");
   
   
   useEffect(() => 
   // HAETAAN ENSIN KYSELYT
   axios.get(`${url}/api/inquiries/`).then((response) => {  
        console.log(response.data._embedded.inquiries)
       setQuery(response.data._embedded.inquiries)

       setFetched(true);
        }),[]) 

        const handleChange = (event) => {
         setSearch(event.target.value);
       };

  return (
    <div>
        {
        inqueries.map((inquiryx, index) =>
            <>
                          
                      <Paper  style={{ width: '60%', margin: 'auto', padding: 40, marginTop: 20, textAlign:'left' }} key={index}>
                          
                              <FormLabel component="legend"><b>kysely: {inquiryx._links.inquiry.href}</b></FormLabel><br></br>
                  
                               
                              {fetched && <Inquiry url={inquiryx._links.inquiry.href}></Inquiry>}
                              
                  
                      </Paper>
                          
                      {fetched===false && <Loading />}
            </>
                )
        }
        
        
    </div>
  );
}
