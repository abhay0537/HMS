import React, { useState, useEffect } from 'react';
import {
  Typography,
  Button,
  Container,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Grid,
  Box,
  Avatar,
  CircularProgress,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';
import toast from 'react-hot-toast';

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({});
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userContact, setUserContact] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [userGender, setUserGender] = useState('');
  const [userAge, setUserAge] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const fetch_user = async () => {
    try {
      const response = await axios.get('https://hms-0s4w.onrender.comuserdetails', {
        headers: { authorization: localStorage.getItem('jwt') },
      });
      setUser(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => { fetch_user(); }, [isEditing]);

  useEffect(() => {
    setUserName(user?.username || '');
    setUserEmail(user?.email || '');
    setUserContact(user?.phone || '');
    setUserAddress(user?.location || '');
    setUserGender(user?.gender || '');
    setUserAge(user?.age || '');
    setImagePreview(user?.image || '');
  }, [user, isEditing]);

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    setImageFile(file || null);
    setImagePreview(file ? URL.createObjectURL(file) : (user?.image || ''));
  };

  const uploadImage = async () => {
    if (!imageFile) return user?.image || '';
    const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;
    if (!cloudName || !uploadPreset) {
      throw new Error("Cloudinary not configured.");
    }
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", uploadPreset);
    const res = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData);
    return res.data.secure_url;
  };

  const handleSaveClick = async () => {
    try {
      setIsUploading(true);
      const image = await uploadImage();
      await axios.put(
        'https://hms-0s4w.onrender.comupdatepatient',
        {
          username: userName,
          email: userEmail,
          password: userPassword,
          phone: userContact,
          location: userAddress,
          age: userAge,
          gender: userGender,
          image,
        },
        { headers: { authorization: localStorage.getItem('jwt') } }
      );
      toast.success('Profile Updated Successfully');
      setIsEditing(false);
      setImageFile(null);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Update failed');
    } finally {
      setIsUploading(false);
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setImageFile(null);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" sx={{ textAlign: 'center', mb: 3 }}>User Profile</Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
        <Avatar
          src={imagePreview || user?.image}
          alt={user?.username}
          sx={{ width: 120, height: 120, mb: 2 }}
        />
        {isEditing && (
          <Button
            variant="outlined"
            component="label"
            startIcon={<CloudUploadIcon />}
            size="small"
            sx={{
              borderColor: 'primary.main',
              color: 'primary.main',
              bgcolor: 'background.paper',
              '&:hover': { bgcolor: 'action.hover' },
            }}
          >
            Change Photo
            <input type="file" accept="image/*" hidden onChange={handleImageChange} />
          </Button>
        )}
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          {isEditing ? (
            <TextField label="Name" fullWidth value={userName} onChange={(e) => setUserName(e.target.value)} margin="normal" />
          ) : (
            <Typography variant="subtitle1">Name: {userName}</Typography>
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          {isEditing ? (
            <TextField label="Email" fullWidth value={userEmail} onChange={(e) => setUserEmail(e.target.value)} margin="normal" />
          ) : (
            <Typography variant="subtitle1">Email: {userEmail}</Typography>
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          {isEditing ? (
            <TextField label="New Password (leave blank to keep)" fullWidth type="password" value={userPassword} onChange={(e) => setUserPassword(e.target.value)} margin="normal" />
          ) : (
            <Typography variant="subtitle1">Password: ********</Typography>
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          {isEditing ? (
            <TextField label="Contact" fullWidth value={userContact} onChange={(e) => setUserContact(e.target.value)} margin="normal" />
          ) : (
            <Typography variant="subtitle1">Contact: {userContact}</Typography>
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          {isEditing ? (
            <TextField label="Address" fullWidth value={userAddress} onChange={(e) => setUserAddress(e.target.value)} margin="normal" />
          ) : (
            <Typography variant="subtitle1">Address: {userAddress}</Typography>
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          {isEditing ? (
            <Box>
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup row value={userGender} onChange={(e) => setUserGender(e.target.value)}>
                <FormControlLabel value="Male" control={<Radio />} label="Male" />
                <FormControlLabel value="Female" control={<Radio />} label="Female" />
                <FormControlLabel value="Other" control={<Radio />} label="Other" />
              </RadioGroup>
            </Box>
          ) : (
            <Typography variant="subtitle1">Gender: {userGender}</Typography>
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          {isEditing ? (
            <TextField label="Age" fullWidth value={userAge} onChange={(e) => setUserAge(e.target.value)} margin="normal" />
          ) : (
            <Typography variant="subtitle1">Age: {userAge}</Typography>
          )}
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        {isEditing ? (
          <>
            <Button variant="contained" color="primary" onClick={handleSaveClick} disabled={isUploading}>
              {isUploading ? <><CircularProgress size={18} sx={{ mr: 1 }} color="inherit" />Saving...</> : 'Save'}
            </Button>
            <Button variant="outlined" onClick={handleCancelClick}>Cancel</Button>
          </>
        ) : (
          <Button variant="contained" color="primary" onClick={() => setIsEditing(true)}>Edit Profile</Button>
        )}
      </Box>
    </Container>
  );
};

export default UserProfile;
