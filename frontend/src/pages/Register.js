import { Typography, Stack, Link } from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import RegisterForm from "../component/RegisterForm";

const Register = () => {
  return (
    <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
      <Typography variant="h4">Register</Typography>
      <Stack direction={"row"} spacing={0.5}>
        <Typography variant="body2">Already have an account.?</Typography>
        <Link component={RouterLink} to="/auth/login" variant="subtitle2">
          Sign in
        </Link>
      </Stack>


      <RegisterForm />
    </Stack>
  );
};

export default Register;