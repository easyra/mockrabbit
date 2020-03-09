import React, { useContext } from "react";
import Navbar from "./components/navbar.jsx";
import Home from "./components/home/Home.jsx";
import { Route, Switch, withRouter } from "react-router-dom";
import Live from "./components/live/Live.jsx";
import { FirebaseContext } from "./components/FirebaseWrapper.js";
import Profile from "./components/profile/Profile.jsx";
import { makeStyles } from "@material-ui/core";

function App({ location }) {
  const classes = useStyles();
  const { userStatus } = useContext(FirebaseContext);
  const loaded = userStatus !== null;
  let backgroundColor = location.pathname !== "/live" ? "#eeeeee" : "#424242";
  return (
    <>
      {loaded && (
        <div className='App'>
          <div className={classes.bg} style={{}}></div>
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

export default withRouter(App);

const useStyles = makeStyles(theme => ({
  bg: {
    background: "#fff" || theme.palette.primary.light,
    position: "fixed",
    width: "100%",
    height: "100%",

    zIndex: "-10",
    transition: "all 1s ",
    transitionTimingFunction: "ease-in"
  }
}));
