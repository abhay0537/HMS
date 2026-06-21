import React, { useEffect, useState } from 'react';
import { Button, TextField, Container, Grid, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function Report() {

    const navigate = useNavigate();
    const { id } = useParams();
    const [data,setDatas] = useState();

 const fetchdata = async () => {
    try {
      const response = await axios.get(`https://hms-0s4w.onrender.com/single/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          authorization: localStorage.getItem('jwt'),
        },
      });

      setDatas(response.data.appointment    );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => { 
    fetchdata();
    }, [id]);

  return (
    <Container maxWidth="sm">
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{ mb: 2 }}
        >
          Back
        </Button>
        <Typography variant="h4">Report Generator</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Patient Name"
              variant="outlined"
              value={data?.user?.username}
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Doctor Name"
              variant="outlined"
              value={data?.doctor?.name}
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Total Amount"
              variant="outlined"
              value={data?.invoice}
              disabled
            />
          </Grid>
        </Grid>
    </Container>
  );
}


export default Report;
