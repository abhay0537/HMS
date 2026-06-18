import React, { useEffect } from "react";
import DoctorCard from "./Doctorcard";
import { Box, Container, Grid, Typography } from "@mui/material";
import Loading from "../../Loading";
import { getdoctor } from "../../slices/getDoctor";
import { useDispatch, useSelector } from "react-redux";

const Doctor = () => {
  const dispatch = useDispatch();
  const { doctor, isLoading, error } = useSelector((state) => state.doctor);
  const doctors = doctor?.doctors || [];

  useEffect(() => {
    dispatch(getdoctor());
  }, [dispatch]);

  return (
    <>
      <Loading isloading={isLoading} />
      <Container maxWidth="lg" className="page-shell">
        <Box className="page-heading">
          <Typography variant="h3" component="h1">
            Doctors
          </Typography>
          <Typography color="text.secondary">
            Choose a doctor and continue to the appointment form.
          </Typography>
        </Box>

        {error && <Typography color="error">{error}</Typography>}
        {!isLoading && doctors.length === 0 && (
          <Typography color="text.secondary">No doctors are available right now.</Typography>
        )}

        <Grid container spacing={3}>
          {doctors.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item._id}>
              <DoctorCard item={item} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Doctor;
