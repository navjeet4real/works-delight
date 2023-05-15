import PropTypes from "prop-types";
import { useFormContext, Controller } from "react-hook-form";

import { TextField } from "@mui/material";

RHFTextField.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    helpertext: PropTypes.node
}


export default function RHFTextField({ name, helpertext, ...other }) {
  const { control } = useFormContext();

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            fullWidth
            error={!!error}
            helpertext={error ? error.message : helpertext}
            {...other}
          />
        )}
      />
    </>
  );
}