import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Box, CircularProgress, Avatar } from '@mui/material';
import toast from 'react-hot-toast';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useNavigate } from 'react-router-dom';

const AddDoctorForm = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [name, setName] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [desc, setDesc] = useState('');
  const [ammount, setAmmount] = useState('');

  const fetchdoctor = async () => {
    try {
      const response = await axios.get('https://hms-0s4w.onrender.comdoctor-single', {
        headers: { authorization: localStorage.getItem("jwt") }
      });
      if (response) setUser(response.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => { fetchdoctor(); }, []);

  useEffect(() => {
    setName(user.name || '');
    setImagePreview(user.image || '');
    setContact(user.contact || '');
    setEmail(user.email || '');
    setDesc(user.desc || '');
    setAmmount(user.ammount || '');
  }, [user]);

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    setImageFile(file || null);
    setImagePreview(file ? URL.createObjectURL(file) : (user.image || ''));
  };

  const uploadImage = async () => {
    if (!imageFile) return user.image || '';
    const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;
    if (!cloudName || !uploadPreset) {
      throw new Error("Cloudinary not configured. Add REACT_APP_CLOUDINARY_CLOUD_NAME and REACT_APP_CLOUDINARY_UPLOAD_PRESET to frontend/.env");
    }
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", uploadPreset);
    const res = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData);
    return res.data.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsUploading(true);
      const image = await uploadImage();
      const doctorData = { name, image, contact, email, desc, ammount };
      const response = await axios.patch('https://hms-0s4w.onrender.comdoctor-update', doctorData, {
        headers: { authorization: localStorage.getItem("jwt") }
      });
      if (response) {
        toast.success("Doctor Updated Successfully");
        fetchdoctor();
        setImageFile(null);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "Update failed");
    } finally {
      setIsUploading(false);
    }
  };

  return (
      <Box sx={{ maxWidth: 560, margin: '0 auto', py: 3 }}>
        <Button
          type="button"
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{ mb: 2 }}
        >
          Back
        </Button>
        <Typography variant="h4" sx={{ textAlign: 'center', mb: 2 }} gutterBottom>
          Edit Profile
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} required fullWidth margin="normal" />

          <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} required fullWidth margin="normal" />

          <TextField label="Contact" value={contact} onChange={(e) => setContact(e.target.value)} required fullWidth margin="normal" />

          <TextField label="Consultation Fee" value={ammount} onChange={(e) => setAmmount(e.target.value)} required fullWidth margin="normal" type="number" />

          <TextField label="Description" value={desc} onChange={(e) => setDesc(e.target.value)} required fullWidth margin="normal" multiline rows={3} />

          <Box sx={{ my: 2 }}>
            <Typography variant="subtitle2" gutterBottom>Profile Photo:</Typography>
            {imagePreview && (
              <Avatar
                src={imagePreview}
                alt="Doctor preview"
                sx={{ width: 120, height: 120, mb: 2, mx: 'auto', display: 'block' }}
              />
            )}
            <Button
              variant="outlined"
              component="label"
              fullWidth
              startIcon={<CloudUploadIcon />}
              sx={{
                borderColor: "primary.main",
                color: "primary.main",
                bgcolor: "background.paper",
                "&:hover": { bgcolor: "action.hover" },
              }}
            >
              {imageFile ? "Change Photo" : "Upload New Photo"}
              <input type="file" accept="image/*" hidden onChange={handleImageChange} />
            </Button>
          </Box>

          <Button type="submit" variant="contained" color="primary" disabled={isUploading} fullWidth sx={{ mt: 2 }}>
            {isUploading ? <><CircularProgress size={20} sx={{ mr: 1 }} color="inherit" /> Uploading...</> : "Save Changes"}
          </Button>
        </form>
      </Box>
  );
};

export default AddDoctorForm;
