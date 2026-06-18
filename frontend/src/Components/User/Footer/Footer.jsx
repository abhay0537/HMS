import React from "react";
import { Box, Container, Grid, Link as MuiLink, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <Box component="footer" className="site-footer">
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} md={5}>
            <Typography variant="h6">Health Haven Hospital</Typography>
            <Typography color="text.secondary">
              A simple MERN hospital management system for patient bookings, doctor workflows, services, and enquiries.
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="subtitle2">Quick Links</Typography>
            <Box className="footer-links">
              <NavLink to="/doctor">Doctors</NavLink>
              <NavLink to="/services">Services</NavLink>
              <NavLink to="/ambulance-booking">Ambulance</NavLink>
              <NavLink to="/contact">Contact</NavLink>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2">Contact</Typography>
            <Typography color="text.secondary">Ratlam, India</Typography>
            <MuiLink href="mailto:a.abhay0537@gmail.com">example@gmail.com</MuiLink>
            <Typography color="text.secondary">+91-9876543210</Typography>
          </Grid>
        </Grid>
        <Typography className="footer-bottom" color="text.secondary">
          Copyright {new Date().getFullYear()} Health Haven Hospital.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
