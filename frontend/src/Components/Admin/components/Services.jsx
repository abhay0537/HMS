import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import { DataGrid, GridOverlay } from "@mui/x-data-grid";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import toast from "react-hot-toast";

const emptyService = {
  name: "",
  description: "",
  features: [""],
  image: "",
};

const Services = () => {
  const [services, setServices] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [formData, setFormData] = useState(emptyService);
  const [imageFile, setImageFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const token = localStorage.getItem("jwt");
  const isEditing = Boolean(selectedService?._id);

  const fetchServices = async () => {
    try {
      const response = await axios.get("https://hms-five-kappa.vercel.app/services", {
        headers: { authorization: token },
      });
      const rowsWithId = response.data.services.map((service, index) => ({
        id: index + 1,
        ...service,
      }));
      setServices(rowsWithId);
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to load services");
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    setFormData(
      selectedService
        ? {
            name: selectedService.name || "",
            description: selectedService.description || "",
            features: selectedService.features?.length ? selectedService.features : [""],
            image: selectedService.image || "",
          }
        : emptyService
    );
    setImageFile(null);
  }, [selectedService]);

  const handleFeatureChange = (index, value) => {
    const features = [...formData.features];
    features[index] = value;
    setFormData({ ...formData, features });
  };

  const uploadServiceImage = async () => {
    if (!imageFile) {
      if (formData.image) return formData.image;
      throw new Error("Please choose a service image.");
    }

    const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;
    if (!cloudName || !uploadPreset) {
      throw new Error("Cloudinary is not configured. Add REACT_APP_CLOUDINARY_CLOUD_NAME and REACT_APP_CLOUDINARY_UPLOAD_PRESET to frontend/.env");
    }

    const uploadData = new FormData();
    uploadData.append("file", imageFile);
    uploadData.append("upload_preset", uploadPreset);
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      uploadData
    );
    return response.data.secure_url;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsUploading(true);
      const image = await uploadServiceImage();
      const payload = { ...formData, image };
      const url = isEditing
        ? `https://hms-five-kappa.vercel.app/services/${selectedService._id}`
        : "https://hms-five-kappa.vercel.app/services";
      await axios[isEditing ? "patch" : "post"](url, payload, {
        headers: { authorization: token },
      });
      toast.success(isEditing ? "Service updated successfully" : "Service added successfully");
      setShowForm(false);
      setSelectedService(null);
      fetchServices();
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "Unable to save service");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://hms-five-kappa.vercel.app/services/${id}`, {
        headers: { authorization: token },
      });
      toast.success("Service deleted successfully");
      fetchServices();
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to delete service");
    }
  };

  const closeForm = () => {
    setShowForm(false);
    setSelectedService(null);
  };

  const columns = [
    { field: "name", headerName: "Service", width: 220 },
    { field: "description", headerName: "Description", width: 360 },
    {
      field: "features",
      headerName: "Features",
      width: 320,
      renderCell: (params) => (params.value || []).join(", "),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 180,
      sortable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Button
            size="small"
            variant="outlined"
            onClick={() => {
              setSelectedService(params.row);
              setShowForm(true);
            }}
          >
            Edit
          </Button>
          <Button size="small" variant="contained" color="error" onClick={() => handleDelete(params.row._id)}>
            Delete
          </Button>
        </Stack>
      ),
    },
  ];

  const CustomNoRowsOverlay = () => (
    <GridOverlay>
      <div>No services added yet.</div>
    </GridOverlay>
  );

  if (showForm) {
    return (
      <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 640, mx: "auto", py: 3 }}>
        <Button
          type="button"
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={closeForm}
          sx={{ mb: 2 }}
        >
          Back
        </Button>
        <Typography variant="h4" sx={{ textAlign: "center", mb: 2 }}>
          {isEditing ? "Edit Service" : "Add Service"}
        </Typography>
        <TextField
          label="Service Name"
          value={formData.name}
          onChange={(event) => setFormData({ ...formData, name: event.target.value })}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Description"
          value={formData.description}
          onChange={(event) => setFormData({ ...formData, description: event.target.value })}
          fullWidth
          required
          multiline
          rows={3}
          margin="normal"
        />
        <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
          Features
        </Typography>
        {formData.features.map((feature, index) => (
          <TextField
            key={index}
            label={`Feature ${index + 1}`}
            value={feature}
            onChange={(event) => handleFeatureChange(index, event.target.value)}
            fullWidth
            required
            margin="normal"
          />
        ))}
        <Button
          type="button"
          variant="contained"
          onClick={() => setFormData({ ...formData, features: [...formData.features, ""] })}
        >
          Add Feature
        </Button>

        <Box sx={{ my: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Service Image
          </Typography>
          <Button
            variant="outlined"
            component="label"
            fullWidth
            startIcon={<CloudUploadIcon />}
            sx={{
              borderColor: "secondary.main",
              color: "secondary.main",
              bgcolor: "background.paper",
              "&:hover": { borderColor: "secondary.light", bgcolor: "action.hover" },
            }}
          >
            {imageFile ? "Change Service Image" : "Upload Service Image"}
            <input
              type="file"
              accept="image/*"
              hidden
              required={!imageFile && !formData.image}
              onChange={(event) => setImageFile(event.target.files?.[0] || null)}
            />
          </Button>
          {(formData.image || imageFile) && (
            <Box
              component="img"
              src={imageFile ? URL.createObjectURL(imageFile) : formData.image}
              alt="Service preview"
              sx={{ display: "block", width: "100%", maxHeight: 240, objectFit: "cover", borderRadius: 1, mt: 2 }}
            />
          )}
        </Box>

        <Stack direction="row" spacing={2}>
          <Button type="submit" variant="contained" disabled={isUploading}>
            {isUploading ? "Uploading..." : isEditing ? "Update Service" : "Add Service"}
          </Button>
          <Button type="button" variant="outlined" onClick={closeForm}>
            Back
          </Button>
        </Stack>
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Box sx={{ height: 450, maxWidth: "95%", mx: "auto" }}>
          <Grid container sx={{ justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography variant="h4">Services</Typography>
            <Button
              variant="contained"
              onClick={() => {
                setSelectedService(null);
                setShowForm(true);
              }}
            >
              Add Service
            </Button>
          </Grid>
          <DataGrid
            rows={services}
            columns={columns}
            components={{ NoRowsOverlay: CustomNoRowsOverlay }}
            initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
          />
        </Box>
      </Grid>

    </Grid>
  );
};

export default Services;
