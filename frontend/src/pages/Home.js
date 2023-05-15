import React from "react";
import { Typography, Link } from "@mui/material";
import { Stack } from "@mui/system";
import { Link as RouterLink } from "react-router-dom";
import Category from "./Category";

const Home = () => {
  return (
    <>
      <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
        {/* <Typography variant="h4">Home</Typography> */}
        <Category />
       
      </Stack>
    </>
  );
};

export default Home;