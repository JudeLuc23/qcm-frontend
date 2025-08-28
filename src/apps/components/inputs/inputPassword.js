import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl, { useFormControl } from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


function FormErrorText({textError}) {
    const { error } = useFormControl() || {};
  
    const helperText = React.useMemo(() => {
      if (error) {
        return textError;
      }
  
      return '';
    }, [error, textError]);
  
    return <FormHelperText>{helperText}</FormHelperText>;
  }


export default function InputPassword({
    label,
    name,
    value,
    onChange,
    errorText,
    error= false
}) {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        <div>
            <FormControl sx={{ m: 1, width: '35ch' }} variant="standard">
            <InputLabel error={error} htmlFor="standard-adornment-password">{label}</InputLabel>
            <Input
                id="standard-adornment-password"
                type={showPassword ? 'text' : 'password'}
                name={name}
                value={value}
                onChange={onChange}
                error={error}
                
                endAdornment={
                <InputAdornment position="end">
                    <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </InputAdornment>
                }
            />
            <FormErrorText textError={errorText}/></FormControl>
        </div>
        </Box>
    );
}
