import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridOverlay } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect } from "react";
import AddDoctorForm from "./AddDoctor";
import { Button, Grid, Stack, Typography } from "@mui/material";

export default function DataGridDemo() {
  const [data, setData] = React.useState([]);
  const [showForm, setShowForm] = React.useState(false);
  const [selectedDoctor, setSelectedDoctor] = React.useState(null);
  

  const fetchData = async () => {
    try {
      const response = await axios.get("https://hms-five-kappa.vercel.app/public/doctor", {
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("jwt"),
        },
      });
     

      const rowsWithId = response.data.doctors.map((row, index) => ({
        id: index + 1,
        ...row,
      }));
      setData(rowsWithId);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("jwt");
    try {
      await axios.delete(`https://hms-five-kappa.vercel.app/doctor/${id}`, {
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      });
      fetchData();
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleAddDoctor = () => {
    setSelectedDoctor(null);
    setShowForm(true);
  };

  const handleEditDoctor = (doctor) => {
    setSelectedDoctor(doctor);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setSelectedDoctor(null);
    setShowForm(false);
  };

  const columns = [
    { field: "name", headerName: "Name", width: 200 },
    {
      field: "expertise",
      headerName: "Expertise",
      width: 300,
      renderCell: (params) => {
        const expertise = params.value || [];
        return expertise.join(", ");
      },
    },
    {
      field: "date",
      headerName: "Available Date",
      width: 220,
      renderCell: (params) => {
        const date = params.value || [];
        return date.join(", ");
      },
    },
    { field: "contact", headerName: "Contact", width: 140 },
    {
      field: "actions",
      headerName: "Actions",
      width: 180,
      sortable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Button size="small" variant="outlined" onClick={() => handleEditDoctor(params.row)}>
            Edit
          </Button>
          <Button size="small" variant="contained" color="error" onClick={() => handleDelete(params.row._id)}>
            Delete
          </Button>
        </Stack>
      ),
    },
  ];

  const CustomNoRowsOverlay = () => {
    return (
      <GridOverlay>
        <div>loading....</div>
      </GridOverlay>
    );
  };

  if (showForm) {
    return (
      <Box sx={{ maxWidth: 640, mx: "auto", py: 3 }}>
        <AddDoctorForm
          fetchdata={fetchData}
          initialDoctor={selectedDoctor}
          onCancel={handleCloseForm}
        />
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      
      <Grid item xs={12} sm={12}>
        <Box sx={{ height: "450px", maxWidth: "95%", mx: "auto" }}>
          <Grid container sx={{ justifyContent:"space-between", alignItems: "center", mb: 2 }}>
            <Typography
              variant="h4"
              sx={{
                textAlign: "left",
              }}
              gutterBottom
            >
              Doctor List
            </Typography>
            <Button variant="contained" onClick={handleAddDoctor}>
              Add Doctor
            </Button>
          </Grid>
          <DataGrid
            rows={data}
            columns={columns}
            components={{
              NoRowsOverlay: CustomNoRowsOverlay,
            }}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
          />
        </Box>
      </Grid>
    </Grid>
  );
}
