import React, { useState, useContext } from "react";
import AppBar from "@material-ui/core/AppBar";
import {
  Toolbar,
  Typography,
  IconButton,
  Button,
  makeStyles,
  MenuItem,
  Menu,
  Hidden
} from "@material-ui/core";
import { Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { FirebaseContext } from "./FirebaseWrapper";
import { auth } from "./firebase";
import { withSnackbar } from "notistack";

const Navbar = ({ location, history, enqueueSnackbar }) => {
  const classes = useStyles();
  let homeButtonHidden = location.pathname === "/";
  const [loginNode, setLoginNode] = useState(null);
  const [accountNode, setAccountNode] = useState(null);
  const { googleSignin, userStatus, signOut, getUserInfo } = useContext(
    FirebaseContext
  );
  const handleGoogleSignIn = () => {
    if (auth.currentUser) {
      getUserInfo();
    } else {
      googleSignin().then(() => {
        enqueueSnackbar("Login Successful");
      });
    }
    setLoginNode(null);
  };

  return (
    <>
      <Menu
        anchorEl={loginNode}
        open={Boolean(loginNode)}
        onClose={() => setLoginNode(null)}
      >
        <MenuItem onClick={handleGoogleSignIn}>Google</MenuItem>
      </Menu>
      <AppBar
        className={classes.root}
        position='static'
        elevation={4}
        color='primary'
      >
        <Toolbar>
          <Hidden mdUp>
            <IconButton color='inherit'>
              <MenuIcon />
            </IconButton>
          </Hidden>

          <div className={classes.title}>
            <Hidden smDown>
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
            </Hidden>

            <Button
              color='secondary'
              variant='contained'
              startIcon={<FavoriteIcon />}
            >
              Support The Stream
            </Button>
          </div>

          {userStatus ? (
            <Button color='inherit' component={Link} to='/profile'>
              Account
            </Button>
          ) : (
            <Button
              onClick={({ currentTarget }) => setLoginNode(currentTarget)}
              color='inherit'
            >
              Login
            </Button>
          )}
          <Button component={Link} to='/live' color='inherit'>
            Stream
          </Button>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default withSnackbar(Navbar);

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
