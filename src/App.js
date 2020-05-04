import React, { useContext, useEffect, useState } from "react";
import Navbar from "./components/navbar.jsx";
import Home from "./components/home/Home.jsx";
import { Route, Switch, withRouter } from "react-router-dom";
import Live from "./components/live/Live.jsx";
import { FirebaseContext } from "./components/FirebaseWrapper.js";
import Profile from "./components/profile/Profile.jsx";
import { makeStyles, Chip, Button } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import { ThemeProvider, createMuiTheme } from "@material-ui/core";
import themes from "./themes/index.js";
import SiteWrapper, { SiteContext } from "./components/SiteWrapper.js";
import { withSnackbar } from "notistack";

function App({ location, enqueueSnackbar }) {
  const { userStatus } = useContext(FirebaseContext);
  const { socialLinks } = useContext(SiteContext);
  const classes = {
    action: {
      background: "#ffea00",
      color: "#000",
      border: "none",
      borderRadius: "4px",
      padding: " 5px 15px",
      fontSize: "0.875rem",
      minWidth: "64px",
      fontWeight: "700",
      boxSizing: "border-box",
      letterSpacing: "0.02857em",
      textTransform: "uppercase",
      lineHeight: 1.75,
      margin: 0,
      display: "block",
      textAlign: "center",
      textDecoration: "none",
    },
  };
  const loaded = userStatus !== null;
  const links = [];
  const messageArr = [
    {
      text: socialLinks.twitch,
      action: (
        <a target='_blank' href={socialLinks.twitch} style={classes.action}>
          GO
        </a>
      ),
    },
    {
      text: "Join the Discord",
      action: (
        <a target='_blank' href={socialLinks.discord} style={classes.action}>
          GO
        </a>
      ),
    },
    {
      text: socialLinks.youtube,
      action: (
        <a
          target='_blank'
          style={{ color: "red" }}
          href={socialLinks.youtube}
          style={classes.action}
        >
          GO
        </a>
      ),
    },
    {
      text: socialLinks.facebook,
      action: (
        <a target='_blank' href={socialLinks.facebook} style={classes.action}>
          GO
        </a>
      ),
    },
    {
      text: "Support the Stream",
      action: (
        <a target='_blank' style={classes.action}>
          GO
        </a>
      ),
    },
    {
      text: "Support the Stream",
      action: (
        <a target='_blank' style={classes.action}>
          GO
        </a>
      ),
    },
  ];
  useEffect(() => {
    setInterval(() => {
      const { text, action } = messageArr[
        Math.floor(Math.random() * messageArr.length)
      ];
      enqueueSnackbar(text, { action });
    }, 900000);
  }, []);
  return (
    <>
      {loaded && (
        <div className='App'>
          <Route component={Navbar} path='/' />
          <Switch>
            <Route exact strict path='/' component={Home} />
            <Route exact strict path='/live' component={Live} />
            <Route exact strict path='/profile' component={Profile} />
          </Switch>
        </div>
      )}
    </>
  );
}

export default withRouter(withSnackbar(App));
