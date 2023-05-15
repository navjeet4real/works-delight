import React from "react";
import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import CategoryForm from "../component/CategoryForm"
import DisplayTree from "../component/DisplayTree";

const Category = () => {
  return (
    <>
      <Stack spacing={2} sx={{ mb: 5 }}>
        <Typography variant="h4">Create Category</Typography>
        <Stack direction={'row'} spacing={2}>
          <CategoryForm />
          <DisplayTree />
        </Stack>
      </Stack>
    </>
  );
};

export default Category;