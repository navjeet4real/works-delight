import React from "react";
import { Container, Stack } from "@mui/material";
import { Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { getUser } from "../redux/slices/auth";

const AuthLayout = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  console.log(isLoggedIn, "kkkkkkkkkkkkkkk");
  if (isLoggedIn) {
    // dispatch(getUser());
    return <Navigate to="/home" />;
  }
  return (
    <>
      <Container sx={{ mt: 5 }} maxWidth="sm">
        <Stack spacing={5}>
          <Outlet />
        </Stack>
      </Container>
    </>
  );
};

export default AuthLayout;