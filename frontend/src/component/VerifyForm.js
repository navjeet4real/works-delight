import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Stack } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import FormProvider from "../component/hook-form/FormProvider";
import RHFCodes from "../component/hook-form/RHFCodes";
import { VerifyEmail } from "../redux/slices/auth";

const VerifyForm = () => {
  const dispatch = useDispatch();
  const { email } = useSelector((state) => state.auth);
  const VerifyCodeSchema = Yup.object().shape({
    code1: Yup.string().required("Code is required"),
    code2: Yup.string().required("Code is required"),
    code3: Yup.string().required("Code is required"),
    code4: Yup.string().required("Code is required"),
  });

  const defaultValues = {
    code1: "",
    code2: "",
    code3: "",
    code4: "",
  };

  const methods = useForm({
    mode: "onchange",
    resolver: yupResolver(VerifyCodeSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  const onSubmit = async (data) => {
    try {
      dispatch(
        VerifyEmail({
          email,
          otp: `${data.code1}${data.code2}${data.code3}${data.code4}`,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <RHFCodes
            keyName="code"
            inputs={["code1", "code2", "code3", "code4"]}
          />

          <Button
            fullWidth
            color="inherit"
            size="large"
            type="submit"
            variant="contained"
          >
            Verify
          </Button>
        </Stack>
      </FormProvider>
    </>
  );
};

export default VerifyForm;