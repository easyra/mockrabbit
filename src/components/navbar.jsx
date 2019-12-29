import React, { useState, useContext } from "react";
import AppBar from "@material-ui/core/AppBar";
import {
  Toolbar,
  Typography,
  IconButton,
  Button,
  makeStyles,
  MenuItem,
  Menu
} from "@material-ui/core";
import { Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { FirebaseContext } from "./FirebaseWrapper";

const Navbar = ({ location }) => {
  const classes = useStyles();
  let homeButtonHidden = location.pathname === "/";
  const [loginNode, setLoginNode] = useState(null);
  const { googleSignin } = useContext(FirebaseContext);

  return (
    <>
      <Menu
        anchorEl={loginNode}
        open={Boolean(loginNode)}
        onClose={() => setLoginNode(null)}
      >
        <MenuItem onClick={googleSignin}>Google</MenuItem>
      </Menu>
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
            {!homeButtonHidden && (
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

          <Button
            onClick={({ currentTarget }) => setLoginNode(currentTarget)}
            color='inherit'
          >
            Login
          </Button>
          <Button component={Link} to='/live' color='inherit'>
            Stream
          </Button>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;

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
