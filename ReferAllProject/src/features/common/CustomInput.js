import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { FormControl, InputLabel, Input } from "@material-ui/core/";
// @material-ui/icons
import Clear from "@material-ui/icons/Clear";
import Check from "@material-ui/icons/Check";
// core components
import {
  primaryColor,
  dangerColor,
  successColor,
  grayColor,
  defaultFont,
} from "../../common/theme.js";

const styles = {
  disabled: {
    "&:before": {
      backgroundColor: "transparent !important",
    },
  },
  underline: {
    "&:hover:not($disabled):before,&:before": {
      borderColor: grayColor[4] + " !important",
      borderWidth: "1px !important",
    },
    "&:after": {
      borderColor: primaryColor[0],
    },
  },
  underlineError: {
    "&:after": {
      borderColor: dangerColor[0],
    },
  },
  underlineSuccess: {
    "&:after": {
      borderColor: successColor[0],
    },
  },
  labelRoot: {
    ...defaultFont,
    color: grayColor[3] + " !important",
    fontWeight: "400",
    fontSize: "14px",
    lineHeight: "1.42857",
    letterSpacing: "unset",
  },
  labelRootError: {
    color: dangerColor[0],
  },
  labelRootSuccess: {
    color: successColor[0],
  },
  feedback: {
    position: "absolute",
    top: "18px",
    right: "0",
    zIndex: "2",
    display: "block",
    width: "24px",
    height: "24px",
    textAlign: "center",
    pointerEvents: "none",
  },
  marginTop: {
    marginTop: "16px",
  },
  formControl: {
    paddingBottom: "10px",
    margin: "0 0 0 0",
    // margin: "27px 0 0 0", JARLOU
    position: "relative",
    verticalAlign: "unset",
  },
  labelRTL: {
    right: 0,
    transition: "all 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms",
    "&.MuiInputLabel-shrink": {
      transform: "translate(0, 1.5px)",
    },
  },
};

const useStyles = makeStyles(styles);

export default function CustomInput(props) {
  const classes = useStyles();
  const {
    formControlProps,
    labelText,
    id,
    type,
    labelProps,
    inputProps,
    error,
    success,
    rtlActive,
    onBlur,
    onChange,
    value,
    isRequired
  } = props;

  const labelClasses = classNames({
    [" " + classes.labelRootError]: error,
    [" " + classes.labelRootSuccess]: success && !error,
    [" " + classes.labelRTL]: rtlActive,
  });
  const underlineClasses = classNames({
    [classes.underlineError]: error,
    [classes.underlineSuccess]: success && !error,
    [classes.underline]: true,
  });
  const marginTop = classNames({
    [classes.marginTop]: labelText === undefined,
  });
  let newInputProps = {
    maxLength:
      inputProps && inputProps.maxLength ? inputProps.maxLength : undefined,
    minLength:
      inputProps && inputProps.minLength ? inputProps.minLength : undefined,
    step: inputProps && inputProps.step ? inputProps.step : undefined,
  };
  return (
    <FormControl
      {...formControlProps}
      className={formControlProps.className + " " + classes.formControl}
    >
      {labelText !== undefined ? (
        <InputLabel
          className={classes.labelRoot + labelClasses}
          htmlFor={id}
          {...labelProps}
        >
          {labelText}
        </InputLabel>
      ) : null}
      <Input
        classes={{
          root: marginTop,
          disabled: classes.disabled,
          underline: underlineClasses,
        }}
        id={id}
        type={type}
        {...inputProps}
        onBlur={onBlur}
        onChange={onChange}
        inputProps={newInputProps}
        required={isRequired}
        value={value}
      />
      {error ? (
        <Clear className={classes.feedback + " " + classes.labelRootError} />
      ) : success ? (
        <Check className={classes.feedback + " " + classes.labelRootSuccess} />
      ) : null}
    </FormControl>
  );
}

CustomInput.propTypes = {
  labelText: PropTypes.node,
  labelProps: PropTypes.object,
  id: PropTypes.string,
  type: PropTypes.string,
  inputProps: PropTypes.object,
  formControlProps: PropTypes.object,
  error: PropTypes.bool,
  success: PropTypes.bool,
  rtlActive: PropTypes.bool,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  value:PropTypes.string,
  isRequired:PropTypes.bool
};