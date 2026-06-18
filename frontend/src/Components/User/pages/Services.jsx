import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Modal,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getservice } from "../slices/getService";
import Loading from "../Loading";

const ServiceItem = ({ service }) => {
  const [open, setOpen] = useState(false);
  const features = Array.isArray(service.features) ? service.features : [];
  const serviceName = service.name || service.title || "Hospital Service";
  const serviceDescription = service.description || "Professional care from our hospital team.";

  return (
    <>
      <Card className="simple-card service-card">
        {service.image && (
          <CardMedia component="img" image={service.image} alt={serviceName} />
        )}
        <CardContent>
          <Typography variant="h6" className="service-title">
            {serviceName}
          </Typography>
          <Typography color="text.secondary">{serviceDescription}</Typography>
          <Button sx={{ mt: 2 }} variant="outlined" onClick={() => setOpen(true)}>
            Details
          </Button>
        </CardContent>
      </Card>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box className="simple-modal">
          {service.image && <img src={service.image} alt={serviceName} />}
          <Typography variant="h5">{serviceName}</Typography>
          <Typography color="text.secondary">{serviceDescription}</Typography>
          {features.length > 0 && (
            <Box component="ul">
              {features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </Box>
          )}
        </Box>
      </Modal>
    </>
  );
};

const OurServicesPage = () => {
  const dispatch = useDispatch();
  const { service, isLoading, error } = useSelector((state) => state.service);
  const services = service?.user_service || [];

  useEffect(() => {
    dispatch(getservice());
  }, [dispatch]);

  return (
    <>
      <Loading isloading={isLoading} />
      <Container maxWidth="lg" className="page-shell">
        <Box className="page-heading">
          <Typography variant="h3" component="h1">
            Services
          </Typography>
          <Typography color="text.secondary">
            Browse available hospital services and departments.
          </Typography>
        </Box>

        {error && <Typography color="error">{error}</Typography>}
        {!isLoading && services.length === 0 && (
          <Typography color="text.secondary">No services are available right now.</Typography>
        )}

        <Grid container spacing={3}>
          {services.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item._id || item.name || item.title}>
              <ServiceItem service={item} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default OurServicesPage;
