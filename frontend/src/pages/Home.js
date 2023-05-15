import React from "react";
import { Stack } from "@mui/system";
import Category from "./Category";

const Home = () => {
  return (
    <>
      <Stack spacing={2} >
        <Category />
      </Stack>
    </>
  );
};

export default Home;