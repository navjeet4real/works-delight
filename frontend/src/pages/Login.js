import React from "react";
import { Typography, Link } from "@mui/material";
import { Stack } from "@mui/system";
import { Link as RouterLink } from "react-router-dom";
import LoginForm from "../component/LoginForm";

const Login = () => {
  return (
    <>
      <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
        <Typography variant="h4">Login</Typography>
        <Stack direction={"row"} spacing={0.5}>
          <Typography variant={"body2"}>New User..?</Typography>
          <Link
            to="/auth/register"
            component={RouterLink}
            variant={"subtitle2"}
          >
            Create an account
          </Link>
        </Stack>
        <LoginForm />
      </Stack>
    </>
  );
};

export default Login;