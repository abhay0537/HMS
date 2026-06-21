import React, { useState } from "react";
import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material";
import { Email, LocationOn, Phone } from "@mui/icons-material";
import axios from "axios";
import { toast } from "react-hot-toast";

const ContactUsPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [contact, setContact] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    try {
      const response = await axios.post("https://hms-0s4w.onrender.com/patient/patientmessage", {
        name,
        email,
        message,
        contact,
      });

      toast.success(response.data.message || "Message sent successfully.");
      setName("");
      setEmail("");
      setContact("");
      setMessage("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to send message.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Container maxWidth="lg" className="page-shell">
      <Box className="page-heading">
        <Typography variant="h3" component="h1">
          Contact
        </Typography>
        <Typography color="text.secondary">
          Send a message to the hospital team or use the contact details below.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={5}>
          <Box className="contact-panel">
            <Box className="contact-row">
              <Email />
              <Typography>example@gmail.com</Typography>
            </Box>
            <Box className="contact-row">
              <Phone />
              <Typography>+91-9876543210</Typography>
            </Box>
            <Box className="contact-row">
              <LocationOn />
              <Typography>Ratlam, India</Typography>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} md={7}>
          <Box component="form" className="simple-form" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField label="Name" fullWidth required value={name} onChange={(e) => setName(e.target.value)} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Email" type="email" fullWidth required value={email} onChange={(e) => setEmail(e.target.value)} />
              </Grid>
              <Grid item xs={12}>
                <TextField label="Contact Number" fullWidth required value={contact} onChange={(e) => setContact(e.target.value)} />
              </Grid>
              <Grid item xs={12}>
                <TextField label="Message" multiline rows={5} fullWidth required value={message} onChange={(e) => setMessage(e.target.value)} />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" type="submit" disabled={isSending}>
                  {isSending ? "Sending..." : "Submit Message"}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>

    </Container>
  );
};

export default ContactUsPage;
