import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

export default function DoctorCard({ item }) {
  const { expertise, name, image, _id, email, phone } = item;

  return (
    <Card className="simple-card doctor-card">
      {image && <CardMedia component="img" image={image} title={name} alt={name} />}
      <CardContent>
        <Typography variant="h6">{name}</Typography>
        <Typography color="primary">{expertise || "Doctor"} </Typography>
        {email && <Typography color="text.secondary">{email}</Typography>}
        
      </CardContent>
      <CardActions>
        <Button component={Link} to={`/form/${_id}`} variant="contained" fullWidth>
          Book Appointment
        </Button>
      </CardActions>
    </Card>
  );
}
