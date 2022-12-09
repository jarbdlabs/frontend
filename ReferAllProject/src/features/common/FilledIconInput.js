import React, {useState} from 'react';
import {
    FormControl,
    FormHelperText,
    FilledInput ,
    InputAdornment,
    IconButton
} from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

import {
    dangerColor,
  } from "../../common/theme.js";
  

export default function FilledIconInput({
    id,
    name,
    autoComplete,
    placeholder,
    icon,
    type='text',
    required,
    fullWidth,
    autoFocus,
    value,
    onChange,
    label,
    margin='normal',
    onBlur,
    error,
    helperText,
    inputProps={},
}) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
  };

  return (
    <FormControl className="common-filled-icon-input"
                 margin={margin}
                 error={error}
                 fullWidth={fullWidth}>
        <FilledInput
            id={id}
            name={name}
            type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
            value={value}
            onBlur={onBlur}
            onChange={onChange}
            disableUnderline={true}
            placeholder={placeholder}
            autoComplete={autoComplete}
            required={required}
            error={error}
            autoFocus={autoFocus}
            label={label}
            inputProps={{...inputProps}}
            startAdornment={
                <InputAdornment position="start">
                    {
                        error
                        ? icon('error')
                        : icon()
                    }
                </InputAdornment>
            }
            endAdornment={
                type === 'password'
                ?   <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={togglePasswordVisibility}
                            edge="end"
                            tabIndex="-1"
                        >
                            {showPassword ? <VisibilityIcon color={error ? 'error' : 'action'} /> : <VisibilityOffIcon color={error ? 'error' : 'action'} />}
                        </IconButton>
                    </InputAdornment>
                : null
            }
            style={
                error
                ? {border: `1px solid ${dangerColor}`}
                : {}
            }
        />
        <div style={{paddingTop: '2px'}}>
        {
            (helperText && !Array.isArray(helperText)) &&
            <FormHelperText error>{helperText}</FormHelperText>
        }
        {

            (helperText && Array.isArray(helperText) && helperText.length === 1) &&
            <FormHelperText error>{helperText[0]}</FormHelperText>
        }
        {
            (helperText && Array.isArray(helperText) && helperText.length > 1) &&
            helperText.map((txt,index) => (
                <FormHelperText error key={index}><li>{txt}</li></FormHelperText>
            ))
        }
        </div>
    </FormControl>
  );
};
