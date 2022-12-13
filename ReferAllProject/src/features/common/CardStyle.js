import {
  primaryColor,
  blackColor,
  hexToRgb,
} from "../../common/theme.js";

const cardStyles  = (theme) => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "18px",
    marginTop: "0",
    marginBottom: "0",
    textAlign: 'center'
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    fontSize: "24px",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    textAlign: 'center'
  },
  tableCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(80,80,80,1.0)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  tableTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontSize: "20px",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "0px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
  tableTitleBlack: {
    color: "rgba(50,50,50,.80)",
    marginTop: "10px",
    minHeight: "auto",
    fontSize: "20px",
    fontWeight: "500",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "10px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },

  tableSubTitleBlack: {
    color: "rgba(50,50,50,.70)",
    marginTop: "0px",
    minHeight: "auto",
    fontSize: "16px",
    fontWeight: "400",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "0px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
  tableContentBlack: {
    color: "rgba(50,50,50,.90)",
    marginTop: "15px",
    minHeight: "auto",
    fontSize: "14px",
    fontWeight: "400",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "0px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
  tableContentBlackBold: {
    color: "rgba(50,50,50,.90)",
    marginTop: "15px",
    minHeight: "auto",
    fontSize: "14px",
    fontWeight: "600",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "0px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
  
  searchWrapper: {
    [theme.breakpoints.down("sm")]: {
      width: "-webkit-fill-available",
      margin: "10px 15px 0",
    },
    display: "inline-block",
    position: "relative",
    padding: "15px 15px",
    zIndex: "4",
    width: "100%",
  },
  blue: {
    backgroundColor: primaryColor[2],
    boxShadow:
      "0 12px 20px -10px rgba(" +
      hexToRgb(primaryColor[2]) +
      ",.28), 0 4px 20px 0 rgba(" +
      hexToRgb(blackColor) +
      ",.12), 0 7px 8px -5px rgba(" +
      hexToRgb(primaryColor[2]) +
      ",.2)",
    "&:hover,&:focus": {
      backgroundColor: primaryColor[2],
      boxShadow:
        "0 12px 20px -10px rgba(" +
        hexToRgb(primaryColor[2]) +
        ",.28), 0 4px 20px 0 rgba(" +
        hexToRgb(blackColor) +
        ",.12), 0 7px 8px -5px rgba(" +
        hexToRgb(primaryColor[2]) +
        ",.2)",
    },
  },
});

export default cardStyles;
