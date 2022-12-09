import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { FormControl, InputLabel, Input } from "@material-ui/core/";

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function DatePickers({id, label, value, onChange}) {
  const classes = useStyles();

  return (
    <FormControl className={classes.container} noValidate>
      <TextField
        id={id}
        label={label}
        type="date"
        value={value}
        onChange={onChange}
        // defaultValue="1990-01-01"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </FormControl>
  );
}