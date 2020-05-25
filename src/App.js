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
  const loaded = userStatus !== null;
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
