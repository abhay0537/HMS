import React, { useEffect, useState } from 'react';
import { Container, Typography, Avatar, Grid, Box } from '@mui/material';
import axios from 'axios';

const DoctorProfile = () => {
  const [doctor, setDoctor] = useState({});

  const fetchDoctor = async () => {
    try {
      const response = await axios.get('https://hms-five-kappa.vercel.app/doctor-single', {
        headers: { authorization: localStorage.getItem('jwt') },
      });
      if (response) setDoctor(response.data.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => { fetchDoctor(); }, []);

  return (
    <Container maxWidth="md" sx={{ pt: 3, pb: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4} textAlign="center">
          <Avatar
            alt={doctor.name}
            src={doctor?.image}
            sx={{ width: 150, height: 150, mx: 'auto' }}
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <Typography variant="h4" gutterBottom>{doctor?.name}</Typography>
          <Typography variant="body1" paragraph>{doctor?.desc}</Typography>
          <Box display="flex" alignItems="center" mt={1}>
            <Typography variant="body1" fontWeight="bold">Email:</Typography>
            <Typography variant="body1" ml={1}>{doctor?.email}</Typography>
          </Box>
          <Box display="flex" alignItems="center" mt={1}>
            <Typography variant="body1" fontWeight="bold">Contact:</Typography>
            <Typography variant="body1" ml={1}>{doctor?.contact}</Typography>
          </Box>
          <Box display="flex" alignItems="center" mt={1}>
            <Typography variant="body1" fontWeight="bold">Consultation Fee:</Typography>
            <Typography variant="body1" ml={1}>₹{doctor?.ammount}</Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DoctorProfile;
