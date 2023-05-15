import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { GetCategory } from '../redux/slices/app';
import { Stack } from '@mui/material';



const DisplayTree = () => {
  const dispatch = useDispatch();
  const { display } = useSelector((state) => state.app);
  console.log(display, "hhhhhhhhhhhhhhh")
  const [name, setName] = useState();

  const handleClick = () => {
    dispatch(GetCategory({ name }));
  }
  return (
    <>
      <Stack sx={{ maxWidth: 400 }}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <button onClick={handleClick}>Get</button>
      </Stack>
      {/* {
      display && display
    } */}
    </>
  )
}

export default DisplayTree
