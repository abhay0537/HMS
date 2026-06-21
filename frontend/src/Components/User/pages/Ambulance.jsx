import React, { useState } from 'react';
import { Typography, Container, TextField, Button, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AmbulanceBooking = () => {
  const navigate = useNavigate();
  const [bookingInfo, setBookingInfo] = useState({
    name: '',
    phoneNumber: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    emergencyType: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingInfo({ ...bookingInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://hms-0s4w.onrender.com/patient/ambulance', bookingInfo);
      if (response.status === 200) {
        toast.success(response.data.message);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Book an Ambulance
      </Typography>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField fullWidth label="Name" variant="outlined" name="name" value={bookingInfo.name} onChange={handleChange} required />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Phone Number" variant="outlined" name="phoneNumber" value={bookingInfo.phoneNumber} onChange={handleChange} required />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth placeholder="Address" variant="outlined" name="address" value={bookingInfo.address} onChange={handleChange} required />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth placeholder="City" variant="outlined" name="city" value={bookingInfo.city} onChange={handleChange} required />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth placeholder="State" variant="outlined" name="state" value={bookingInfo.state} onChange={handleChange} required />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth placeholder="Zip Code" variant="outlined" name="zip" value={bookingInfo.zip} onChange={handleChange} required />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="emergencyType">Emergency Type</InputLabel>
              <Select label="Emergency Type" name="emergencyType" value={bookingInfo.emergencyType} onChange={handleChange} required>
                <MenuItem value="">Select an emergency type</MenuItem>
                <MenuItem value="Accident">Accident</MenuItem>
                <MenuItem value="Medical Emergency">Medical Emergency</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sx={{ marginBottom: "20px" }}>
            <Button type="submit" variant="contained" color="primary" onClick={handleSubmit} fullWidth>
              Book Ambulance
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default AmbulanceBooking;
