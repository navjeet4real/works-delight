import React from "react";
import { Typography, Link } from "@mui/material";
import { Stack } from "@mui/system";
import { Link as RouterLink } from "react-router-dom";
import CategoryForm from "../component/CategoryForm"
import DisplayTree from "../component/DisplayTree";

const Category = () => {
  return (
    <>
      <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
        <Typography variant="h4">Create Category</Typography>
        <CategoryForm />

        <DisplayTree />
      </Stack>
    </>
  );
};

export default Category;