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
  Hidden,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemIcon,
  Icon,
  Modal
} from "@material-ui/core";
import FacebookIcon from "@material-ui/icons/Facebook";
import CloseIcon from "@material-ui/icons/Close";
import { Link } from "react-router-dom";
import TwitterIcon from "@material-ui/icons/Twitter";
import MenuIcon from "@material-ui/icons/Menu";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LiveTvIcon from "@material-ui/icons/LiveTv";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import HomeIcon from "@material-ui/icons/Home";
import YouTubeIcon from "@material-ui/icons/YouTube";
import { FirebaseContext } from "./FirebaseWrapper";
import { auth } from "./firebase";
import { withSnackbar } from "notistack";
import LoginPage from "./profile/LoginPage";

const Navbar = ({ location, history, enqueueSnackbar }) => {
  const classes = useStyles();
  let homeButtonHidden = location.pathname === "/";
  const [loginModalOpen, setLoginModal] = useState(false);
  const [accountNode, setAccountNode] = useState(null);
  const [sideBarOn, setSideBarOn] = useState(false);
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
    setLoginModal(false);
  };

  return (
    <>
      {/* SideBar */}
      <Hidden mdUp>
        <Drawer
          variant='persistent'
          anchor='left'
          open={sideBarOn}
          PaperProps={{
            style: { maxWidth: "250px", width: "100%" }
          }}
        >
          <IconButton onClick={() => setSideBarOn(false)}>
            <CloseIcon></CloseIcon>
          </IconButton>
          <List onClick={() => setSideBarOn(false)}>
            <ListItem button component={Link} to='/'>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary={"Home"} />
            </ListItem>

            <ListItem button>
              <ListItemIcon>
                <YouTubeIcon />
              </ListItemIcon>
              <ListItemText primary={"YouTube"} />
            </ListItem>

            <ListItem button>
              <ListItemIcon>
                <FacebookIcon />
              </ListItemIcon>
              <ListItemText primary={"FaceBook"} />
            </ListItem>

            <ListItem button>
              <ListItemIcon>
                <Icon className='fab fa-discord' />
              </ListItemIcon>
              <ListItemText primary={"Discord"} />
            </ListItem>

            <ListItem button>
              <ListItemIcon>
                <Icon className='fab fa-twitch' />
              </ListItemIcon>
              <ListItemText primary={"Twitch"} />
            </ListItem>

            <ListItem button>
              <ListItemIcon>
                <TwitterIcon />
              </ListItemIcon>
              <ListItemText primary={"Twitter"} />
            </ListItem>

            <Divider />

            <ListItem button component={Link} to='/live'>
              <ListItemIcon>
                <LiveTvIcon />
              </ListItemIcon>
              <ListItemText primary={"Stream"} />
            </ListItem>

            <ListItem button component={Link} to='/profile'>
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary={"Account"} />
            </ListItem>
          </List>
        </Drawer>
      </Hidden>
      {/* Modals*/}
      <Modal
        open={loginModalOpen}
        onClose={() => setLoginModal(false)}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "baseline"
        }}
      >
        <LoginPage handleClose={() => setLoginModal(false)} />
      </Modal>

      {/* AppBar */}
      <AppBar
        className={classes.root}
        position='static'
        elevation={4}
        color='primary'
      >
        <Toolbar>
          <Hidden mdUp>
            <IconButton color='inherit' onClick={() => setSideBarOn(true)}>
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
            <Hidden xsDown>
              <Button
                color='secondary'
                variant='contained'
                startIcon={<FavoriteIcon />}
              >
                Support The Stream
              </Button>
            </Hidden>
          </div>
          <Button
            component={Link}
            to='/live'
            color='inherit'
            startIcon={<LiveTvIcon />}
          >
            Stream
          </Button>
          {userStatus ? (
            <Button color='inherit' component={Link} to='/profile'>
              Account
            </Button>
          ) : (
            <Button onClick={() => setLoginModal(true)} color='inherit'>
              Login
            </Button>
          )}
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
