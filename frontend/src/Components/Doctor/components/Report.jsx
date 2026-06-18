import React, { useEffect, useState } from 'react';
import { Button, Container, Grid, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

function Report() {
  const navigate = useNavigate();
  const [isEditingDate, setIsEditingDate] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { id } = useParams();
  const [data, setDatas] = useState();

  const fetchdata = async () => {
    try {
      const response = await axios.get(`https://hms-five-kappa.vercel.app/single/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          authorization: localStorage.getItem('jwt'),
        },
      });
      setDatas(response.data.appointment);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchdata();
  }, [isEditingDate]);

  const handlesave = async () => {
    setIsEditingDate(!isEditingDate);
    try {
      await axios.patch(`https://hms-five-kappa.vercel.app/update-date`, { _id: id, date: selectedDate }, {
        headers: {
          'Content-Type': 'application/json',
          authorization: localStorage.getItem('jwt'),
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Container maxWidth="md">
        <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} sx={{ mb: 2 }}>
          Back
        </Button>
        <Typography variant="h2" sx={{ textAlign: "center", marginBottom: "60px" }}>
          Patient Information
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="h3">Patient Name</Typography>
            <Typography variant="h6">{data?.user?.username}</Typography>
          </Grid>
          <Grid item xs={6} md={6}>
            <Typography variant="h3">Patient Email</Typography>
            <Typography variant="h6">{data?.user?.email}</Typography>
          </Grid>
          <Grid item xs={6} md={6}>
            <Typography variant="h3">Patient Phone</Typography>
            <Typography variant="h6">{data?.user?.phone}</Typography>
          </Grid>
          <Grid item xs={6} md={6}>
            <Typography variant="h3">Patient Address</Typography>
            <Typography variant="h6">{data?.user?.location}</Typography>
          </Grid>
          <Grid item xs={6} md={6}>
            <Typography variant="h3">Patient Age</Typography>
            <Typography variant="h6">{data?.user?.age}</Typography>
          </Grid>
          <Grid item xs={3} sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <Typography variant="h3">Date</Typography>
            {isEditingDate ? (
              <DatePicker
                open
                value={moment(data?.date).format('DD/MM/YYYY')}
                onChange={(newDate) => setSelectedDate(newDate)}
                minDate={new Date()}
              />
            ) : (
              <Typography variant="h6">{moment(data?.date).format('DD/MM/YYYY')}</Typography>
            )}
          </Grid>
          <Grid item xs={6} md={6}>
            <Button variant="contained" color="primary" onClick={handlesave}>
              {isEditingDate ? 'Save Date' : 'Edit Date'}
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Report;
