import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import {
  Toolbar,
  Typography,
  IconButton,
  Button,
  makeStyles
} from "@material-ui/core";
import { Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import FavoriteIcon from "@material-ui/icons/Favorite";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

const Navbar = ({ location }) => {
  let homeHidden = location.pathname === "/";
  console.log(location.pathname);
  const classes = useStyles();
  return (
    <AppBar
      className={classes.root}
      position='static'
      elevation={4}
      color='primary'
    >
      <Toolbar>
        <IconButton color='inherit'>
          <MenuIcon />
        </IconButton>
        <div className={classes.title}>
          {!homeHidden && (
            <Button component={Link} to='/' color='inherit'>
              Home
            </Button>
          )}
          <Button color='inherit'>YouTube</Button>
          <Button color='inherit'>Facebook</Button>
          <Button color='inherit'>Discord</Button>
          <Button color='inherit'>Twitch</Button>
          <Button color='inherit'>Twitter</Button>
          <Button color='secondary' variant='contained'>
            <FavoriteIcon />
            Support The Stream
          </Button>
        </div>

        <Button color='inherit'>Login</Button>
        <Button component={Link} to='/live' color='inherit'>
          Stream
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
