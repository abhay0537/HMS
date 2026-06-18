import React from "react";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import h1Hero from "../../assets/h1_hero.png";

const highlights = [
  {
    icon: <CalendarMonthIcon />,
    title: "Easy appointments",
    text: "Book visits with available doctors and keep your reports in one place.",
  },
  {
    icon: <MedicalServicesIcon />,
    title: "Core services",
    text: "Browse hospital departments, care options, and treatment support quickly.",
  },
  {
    icon: <SupportAgentIcon />,
    title: "Patient support",
    text: "Send enquiries, request ambulance help, and reach the hospital team.",
  },
];

const Homepage = () => {
  return (
    <Box>
      <Box className="simple-hero">
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box className="eyebrow">
                <LocalHospitalIcon fontSize="small" />
                Hospital Management System
              </Box>
              <Typography variant="h2" component="h1" className="hero-title">
                Simple care management for patients, doctors, and staff.
              </Typography>
              <Typography className="hero-copy">
                Health Haven helps patients book appointments, view services, contact the hospital, and manage care requests from one clean interface.
              </Typography>
              <Box className="hero-actions">
                <Button variant="contained" size="large" component={Link} to="/doctor">
                  Find Doctor
                </Button>
                <Button variant="outlined" size="large" component={Link} to="/services">
                  View Services
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box className="hero-image-wrap">
                <img src={h1Hero} alt="Hospital care" className="hero-image" />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="lg" className="home-section">
        <Grid container spacing={3}>
          {highlights.map((item) => (
            <Grid item xs={12} md={4} key={item.title}>
              <Box className="feature-card">
                <Box className="feature-icon">{item.icon}</Box>
                <Typography variant="h6">{item.title}</Typography>
                <Typography color="text.secondary">{item.text}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Homepage;
