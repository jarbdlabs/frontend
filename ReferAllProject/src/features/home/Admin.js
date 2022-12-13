import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import {useHistory} from 'react-router-dom';
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import {LOGIN_PAGE, ADMIN_PAGE} from './redux/constants';
// core components
// import Navbar from "components/Navbars/Navbar.js";
// import Footer from "components/Footer/Footer.js";

import { Navbar, Sidebar } from '../common';

import routes from "../../common/routeAdmin";

import bgImage from "../../images/sidebar-1.jpg";
import logo from "../../images/logo.png";

import {
  drawerWidth,
  transition,
  container,
} from "../../common/theme.js";
import AuthService from '../authentication/services/AuthService';

const styles = (theme) => ({
  wrapper: {
    position: "relative",
    top: "0",
    height: "100vh",
  },
  mainPanel: {
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
    overflow: "auto",
    position: "relative",
    float: "right",
    ...transition,
    maxHeight: "100%",
    width: "100%",
    overflowScrolling: "touch",
  },
  content: {
    marginTop: "50px",
    padding: "15px 15px",
    minHeight: "calc(100vh - 123px)",
  },
  container,
  map: {
    marginTop: "50px",
  },
});

const useStyles = makeStyles(styles);

export default function Admin({ ...children }) {
  const history = useHistory();

  const switchRoutes = (
    <Switch>
      {routes[AuthService.getSessionData().user === null ? "Dashboard":AuthService.getSessionData().user.role].map((prop, key) => {
        if (prop.layout === "/admin") {
          return (
            <Route
              path={prop.layout + prop.path}
              component={prop.component}
              key={key}
            />
          );
        }
        return null;
      })}
      <Redirect from="/admin" to={"/admin" + routes[AuthService.getSessionData().user === null ? 'Dashboard':AuthService.getSessionData().user.role][0].path } />
    </Switch>
  );
  // styles
  const classes = useStyles();
  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = React.createRef();
  // states and functions
  const [image] = React.useState(bgImage);
  const [color] = React.useState("blue");
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };
  // initialize and destroy the PerfectScrollbar plugin
  React.useEffect(() => {
    var ps;
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", resizeFunction);
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
      window.removeEventListener("resize", resizeFunction);
    };
  }, [history, mainPanel]);
  return (
    <div className={classes.wrapper}>
      <Sidebar
        routes={routes[AuthService.getSessionData().user === null ? 'Dashboard':AuthService.getSessionData().user.role]}
        logoText={"REFER ALL"}
        logo={logo}
        image={image}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color={color}
        {...children}
      />
      <div className={classes.mainPanel} ref={mainPanel}>
        <Navbar
          routes={routes[AuthService.getSessionData().user === null ? 'Dashboard':AuthService.getSessionData().user.role]}
          handleDrawerToggle={handleDrawerToggle}
          {...children}
        />
        <div className={classes.content}>
          <div className={classes.container}>{switchRoutes}</div>
        </div>
      </div>
    </div>
  );
};

Admin.propTypes = {};
Admin.defaultProps = {};
