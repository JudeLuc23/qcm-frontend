import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';



export default function InputTest({
  label,
  id,
  name,
  value,
  onChange,
  errorText,
  required,
  width,
  error= false
}) {
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: width ? width : '35ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          error={error}
          id={id}
          // id="standard-error-helper-text"
          label={label}
          helperText={errorText ? errorText : ''}
          variant="standard"
          name={name}
          required={required}
          value={value}
          onChange={onChange}
        />
      </div>
    </Box>
  );
}
