import React, {useState} from 'react';

import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
// core components
import { Button } from '../common';
import { ClickAwayListener, MenuItem, MenuList, Grow, Paper } from "@material-ui/core";
import Poppers from "@material-ui/core/Popper";

import {
  primaryColor,
  whiteColor,
  primaryBoxShadow,
  defaultFont,
  blackColor,
  grayColor,
  hexToRgb,
  dangerColor,
} from "../../common/theme.js";

const dropdownStyle = (theme) => ({
  buttonLink: {
    [theme.breakpoints.down("md")]: {
      display: "flex",
      marginLeft: "30px",
      width: "100%",
    },
  },
  links: {
    width: "20px",
    height: "20px",
    zIndex: "4",
    [theme.breakpoints.down("md")]: {
      display: "block",
      width: "30px",
      height: "30px",
      color: grayColor[9],
      marginRight: "15px",
    },
  },
  linkText: {
    zIndex: "4",
    ...defaultFont,
    fontSize: "14px",
  },
  popperClose: {
    pointerEvents: "none",
  },
  popperResponsive: {
    [theme.breakpoints.down("md")]: {
      zIndex: "1640",
      position: "static",
      float: "none",
      width: "auto",
      marginTop: "0",
      backgroundColor: "transparent",
      border: "0",
      WebkitBoxShadow: "none",
      boxShadow: "none",
      color: "black",
    },
  },
  popperNav: {
    [theme.breakpoints.down("sm")]: {
      position: "static !important",
      left: "unset !important",
      top: "unset !important",
      transform: "none !important",
      willChange: "unset !important",
      "& > div": {
        boxShadow: "none !important",
        marginLeft: "0rem",
        marginRight: "0rem",
        transition: "none !important",
        marginTop: "0px !important",
        marginBottom: "0px !important",
        padding: "0px !important",
        backgroundColor: "transparent !important",
        "& ul li": {
          color: blackColor + " !important",
          margin: "10px 15px 0!important",
          padding: "10px 15px !important",
          "&:hover": {
            backgroundColor: "hsla(0,0%,78%,.2)",
            boxShadow: "none",
          },
        },
      },
    },
  },
  dropdown: {
    borderRadius: "3px",
    border: "0",
    boxShadow: "0 2px 5px 0 rgba(" + hexToRgb(blackColor) + ", 0.26)",
    top: "100%",
    zIndex: "1000",
    minWidth: "160px",
    padding: "5px 0",
    margin: "2px 0 0",
    fontSize: "14px",
    textAlign: "left",
    listStyle: "none",
    backgroundColor: whiteColor,
    WebkitBackgroundClip: "padding-box",
    backgroundClip: "padding-box",
  },
  dropdownItem: {
    ...defaultFont,
    fontSize: "13px",
    padding: "10px 20px",
    margin: "0 5px",
    borderRadius: "2px",
    WebkitTransition: "all 150ms linear",
    MozTransition: "all 150ms linear",
    OTransition: "all 150ms linear",
    MsTransition: "all 150ms linear",
    transition: "all 150ms linear",
    display: "block",
    clear: "both",
    fontWeight: "400",
    lineHeight: "1.42857143",
    color: grayColor[8],
    whiteSpace: "nowrap",
    height: "unset",
    minHeight: "unset",
    "&:hover": {
      backgroundColor: primaryColor[0],
      color: whiteColor,
      ...primaryBoxShadow,
    },
  },
});

const styles = (theme) => ({
  ...dropdownStyle(theme),
  search: {
    "& > div": {
      marginTop: "0",
    },
    [theme.breakpoints.down("sm")]: {
      margin: "10px 15px !important",
      float: "none !important",
      paddingTop: "1px",
      paddingBottom: "1px",
      padding: "0!important",
      width: "60%",
      marginTop: "40px",
      "& input": {
        color: blackColor,
      },
    },
  },
  linkText: {
    zIndex: "4",
    ...defaultFont,
    fontSize: "14px",
    margin: "0px",
    color: blackColor
  },
  buttonLink: {
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      margin: "10px 15px 0",
      width: "100%",
      "& svg": {
        width: "24px",
        height: "30px",
        marginRight: "15px",
        marginLeft: "-15px",
      },
      "& .fab,& .fas,& .far,& .fal,& .material-icons": {
        fontSize: "24px",
        lineHeight: "30px",
        width: "24px",
        height: "30px",
        marginRight: "15px",
        marginLeft: "-15px",
      },
      "& > span": {
        justifyContent: "flex-start",
        width: "100%",
      },
    },
  },
  searchButton: {
    [theme.breakpoints.down("sm")]: {
      top: "-50px !important",
      marginRight: "22px",
      float: "right",
    },
  },
  margin: {
    zIndex: "4",
    margin: "0",
  },
  searchIcon: {
    width: "17px",
    zIndex: "4",
  },
  notifications: {
    zIndex: "4",
    [theme.breakpoints.up("md")]: {
      position: "absolute",
      top: "2px",
      border: "1px solid " + dangerColor,
      right: "4px",
      fontSize: "9px",
      background: dangerColor[0],
      color: blackColor,
      minWidth: "16px",
      height: "16px",
      borderRadius: "10px",
      textAlign: "center",
      lineHeight: "16px",
      verticalAlign: "middle",
      display: "block",
    },
    [theme.breakpoints.down("sm")]: {
      ...defaultFont,
      fontSize: "14px",
      marginRight: "8px",
    },
  },
  manager: {
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    display: "inline-block",
  },
});

const useStyles = makeStyles(styles);

export default function DropdownList({ labelText, id }) {
  const classes = useStyles();
  const [openRole, setOpenRole] = useState(null);
  const handleClickRole = (event) => {
    if (openRole && openRole.contains(event.target)) {
      setOpenRole(null);
    } else {
      setOpenRole(event.currentTarget);
    }
  };
  const handleCloseRole = () => {
    setOpenRole(null);
  };
  
  return (
    <div>
      <Button
        color="white"
        style={{width:'100%'}}
        aria-owns={openRole ? "profile-menu-list-grow" : null}
        aria-haspopup="true"
        onClick={handleClickRole}
        className={classes.buttonLink}
      >
        Select Role
      </Button>
      <Poppers
        open={Boolean(openRole)}
        anchorEl={openRole}
        transition
        disablePortal
        className={
          classNames({ [classes.popperClose]: !openRole }) +
          " " +
          classes.popperNav
        }
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            id="profile-menu-list-grow"
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper 
            style={{width:'100%'}}>
              <ClickAwayListener onClickAway={handleCloseRole}>
                <MenuList role="menu" 
                   style={{width:'100%'}}>
                  <MenuItem
                    style={{width:'100%'}}
                    onClick={handleCloseRole}
                    className={classes.dropdownItem}>
                    Profile
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Poppers>
    </div>
  );
};