import { Stack, Typography } from '@mui/material'
import React from 'react'
import VerifyForm from '../component/VerifyForm'
import { useSelector } from 'react-redux'

const Verify = () => {
  const { new_otp } = useSelector((state) => state.auth)
  return (
    <>
      <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
        <Typography variant='h4'>Please Verify OTP</Typography>
        <Stack direction={'row'} spacing={0.5}>
          <Typography variant='body2'>Your OTP : {new_otp}</Typography>
        </Stack>
      </Stack>
      <VerifyForm />
    </>
  )
}

export default Verify