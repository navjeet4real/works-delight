import React from 'react'
import { useState } from "react";
import FormProvider from "../component/hook-form/FormProvider";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Alert,
  InputAdornment,
  Stack,
  IconButton,
  Link,
  Button,
} from "@mui/material";
import { RHFTextField } from "../component/hook-form";
import { Link as RouterLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { CreateCategory } from '../redux/slices/app';

const CategoryForm = () => {
  const dispatch = useDispatch();
  const CategorySchema = Yup.object().shape({
    name: Yup.string(),
    parent: Yup.string(),
  });
  const defaultValues = {
    name: "",
    parent: "",
  };
  const methods = useForm({
    resolver: yupResolver(CategorySchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (data) => {
    try {

      dispatch(CreateCategory(data))

    } catch (error) {
      console.error(error);
      reset();
      setError("afterSubmit", {
        ...error,
        message: error.message,
      });
    }
  };
  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <RHFTextField name="name" label="Category Name" />
          <RHFTextField
            name="parent"
            label="Parent Id"
          />
        </Stack>
        <Button
          fullWidth
          color="inherit"
          size="large"
          type="submit"
          variant="contained"

        >
          Create
        </Button>
      </FormProvider>
    </>
  )
}

export default CategoryForm
