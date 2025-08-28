import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function InputTextOutLineNumber({
  name,
  value,
  onChange,
  label,
  min,
  max,
  step,
  id,
  error = false,
  required = false,
  width= '25ch'
}) {
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: width },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        // id="outlined-number"
        id={id}
        name={name}
        label={label}
        value={value}
        onChange={onChange}
        type="number"
        required={required}
        // disabled={false}
        error={error}
        InputLabelProps={{
          // shrink: true,
        }}
        inputProps={{
          min: min,
          max: max,
          step: step,
        }}
      />
      {/* <TextField id="outlined-basic" label="Outlined" variant="outlined" /> */}
      {/* <TextField id="filled-basic" label="Filled" variant="filled" />
      <TextField id="standard-basic" label="Standard" variant="standard" /> */}
    </Box>
  );
}
