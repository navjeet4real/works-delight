import React, { useState } from 'react';
import axios from "axios";
import { URL } from "../utils/constants"
import { Box, Button, LinearProgress, TextField } from '@mui/material';

const UploadFile = () => {
  const [name, setName] = useState("");
  const [videos, setVideos] = useState([]);
  const [uploaded, setUploaded] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formdata = new FormData();
    for (let key in videos) {
      formdata.append("videos", videos[key]);
    }
    formdata.append("name", name);
    axios
      .post(`${URL}/app/upload-file`, formdata, {
        onUploadProgress: (data) => {
          setUploaded(Math.round((data.loaded / data.total) * 100))
        }
      })
      .then((success) => {
        alert("Submitted successfully");
      })
      .catch((error) => {
        console.log(error);
        alert("Error happened!");
      });
  };


  return (
    <>
     <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400 }}>
      <TextField
        label="Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        type="file"
        label="Upload Videos"
        inputProps={{ accept: '.mp4, .mkv', multiple: true }}
        variant="outlined"
        fullWidth
        margin="normal"
        onChange={(e) => setVideos(e.target.files)}
      />
      {uploaded > 0 && (
        <>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
              <LinearProgress variant="determinate" value={uploaded} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
              <span>{`${uploaded}%`}</span>
            </Box>
          </Box>
        </>
      )}
      <Button type="submit" variant="contained" size="large" sx={{ mt: 2 }}>
        Submit
      </Button>
    </Box>
    </>
  )
}

export default UploadFile
