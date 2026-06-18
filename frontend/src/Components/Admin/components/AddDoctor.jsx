import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Box, Stack } from '@mui/material';

import { MultiSelect } from "react-multi-select-component";
import "./doctor.css"
import toast from 'react-hot-toast';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const options = [
  { label: "10AM-12PM", value: "10AM-12PM" },
  { label: "12.30PM-2.30PM", value: "12.30PM-2.30PM" },
  { label: "3PM-5PM", value: "3PM-5PM" },
];

const AddDoctorForm = ({ fetchdata, initialDoctor, onCancel }) => {
  const [name, setName] = useState('');
  const [expertise, setExpertise] = useState(['']);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const [selectdate, setSelectDate] = useState([]);
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [desc, setDesc] = useState('');
  const [ammount, seAmmount] = useState('');

  const isEditing = Boolean(initialDoctor?._id);

  const date = selectdate.map(option => option.value);

  useEffect(() => {
    setName(initialDoctor?.name || "");
    setExpertise(initialDoctor?.expertise?.length ? initialDoctor.expertise : [""]);
    setImageFile(null);
    setImagePreview(initialDoctor?.image || "");
    setSelectDate(
      initialDoctor?.date?.map((value) => ({ label: value, value })) || []
    );
    setContact(initialDoctor?.contact || "");
    setEmail(initialDoctor?.email || "");
    setPassword("");
    setDesc(initialDoctor?.desc || "");
    seAmmount(initialDoctor?.ammount || "");
  }, [initialDoctor]);

  const handleExpertiseChange = (index, value) => {
    const updatedExpertise = [...expertise];
    updatedExpertise[index] = value;
    setExpertise(updatedExpertise);
  };

  const handleAddExpertise = () => {
    setExpertise([...expertise, '']);
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    setImageFile(file || null);
    setImagePreview(file ? URL.createObjectURL(file) : (initialDoctor?.image || ''));
  };

  const uploadDoctorPhoto = async () => {
    if (!imageFile) {
      if (imagePreview) return imagePreview;
      throw new Error("Please choose a doctor photo.");
    }

    const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      throw new Error("Cloudinary is not configured. Add REACT_APP_CLOUDINARY_CLOUD_NAME and REACT_APP_CLOUDINARY_UPLOAD_PRESET to frontend/.env");
    }

    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", uploadPreset);

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      formData
    );

    return response.data.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectdate.length) {
      toast.error("Please choose at least one available time.");
      return;
    }

    try {
      setIsUploading(true);
      const image = await uploadDoctorPhoto();
      const doctorData = { name, expertise, image,date,contact,email,password,desc,ammount };
      const url = isEditing
        ? `https://hms-five-kappa.vercel.app/doctor/${initialDoctor._id}`
        : 'https://hms-five-kappa.vercel.app/doctor';
      const response = await axios[isEditing ? "patch" : "post"](url, doctorData,{
        headers: {
            
            "authorization": localStorage.getItem("jwt")
            
          },
      });
      if(response)
      { 
toast.success(isEditing ? "Doctor Updated Successfully" : "Doctor Added Successfully")
if (!isEditing) {
  setName("")
  setExpertise([''])
  setImageFile(null)
  setImagePreview("")
  setSelectDate([])
  setContact("")
  setEmail("")
  setPassword("")
  setDesc("")
  seAmmount("")
}
fetchdata?.()
onCancel?.()
}
      
      
    } catch (error) {
     toast.error(error.response?.data?.message || error.message || "Unable to add doctor")
    } finally {
      setIsUploading(false);
    }
  };

  return (
   
    <Box  sx={{ maxWidth: 500, margin: '0 auto' }}>
      {onCancel && (
        <Button
          type="button"
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={onCancel}
          sx={{ mb: 2 }}
        >
          Back
        </Button>
      )}
      <Typography variant="h4" sx={{
        textAlign: 'center',
      }} gutterBottom>
        {isEditing ? "Edit Doctor" : "Add Doctor"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          fullWidth
          margin="normal"
        />

        <TextField
          label="Contact"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          required
          fullWidth
          margin="normal"
        />

        <TextField
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required={!isEditing}
          fullWidth
          margin="normal"
          helperText={isEditing ? "Leave blank to keep the current password." : ""}
        />

<TextField
          label="Total Amount"
          value={ammount}
          onChange={(e) => seAmmount(e.target.value)}
          required
          fullWidth
          margin="normal"
        />

        <TextField
          label="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          required
          fullWidth
          margin="normal"
        />

        <Typography variant="subtitle1" gutterBottom>
          Expertise:
        </Typography>
        {expertise.map((value, index) => (
          <TextField
            key={index}
            label="Expertise"
            value={value}
            onChange={(e) => handleExpertiseChange(index, e.target.value)}
            required
            fullWidth
            margin="normal"
          />
        ))}
        <Button variant="contained" onClick={handleAddExpertise}>
          Add More
        </Button>



        <Box sx={{ my: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Doctor Photo
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
            {imageFile ? "Change Doctor Photo" : "Upload Doctor Photo"}
            <input
              type="file"
              accept="image/*"
              hidden
              required={!imageFile && !imagePreview}
              onChange={handleImageChange}
            />
          </Button>
          {imagePreview && (
            <Box
              component="img"
              src={imagePreview}
              alt="Doctor preview"
              sx={{ display: "block", width: "100%", maxHeight: 260, objectFit: "cover", borderRadius: 1, mt: 2 }}
            />
          )}
        </Box>


      <Typography variant="subtitle1" gutterBottom>
        Available Time
      </Typography>
      <MultiSelect
     
   
        options={options}
        value={selectdate}
        onChange={setSelectDate}
        labelledBy="Choose Date"


       className='select'

     

      />
   

        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          <Button type="submit" variant="contained" color="primary" disabled={isUploading}>
            {isUploading ? "Uploading..." : isEditing ? "Update Doctor" : "Add Doctor"}
          </Button>
          {onCancel && (
            <Button type="button" variant="outlined" onClick={onCancel}>
              Back
            </Button>
          )}
        </Stack>
      </form>
    </Box>
  
  );
};

export default AddDoctorForm;




