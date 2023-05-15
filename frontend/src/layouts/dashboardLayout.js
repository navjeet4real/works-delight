import React from "react";
import { Stack } from "@mui/material";
import { Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "../component/Header";
import Category from "../pages/Category";

const DashboardLayout = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  if (!isLoggedIn) {
    return <Navigate to="/auth/login" />;
  }
  return (
    <>
      <Stack>
        <Header />
        <Outlet />
      </Stack>
    </>
  );
};

export default DashboardLayout;