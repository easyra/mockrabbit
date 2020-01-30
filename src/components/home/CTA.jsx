import React, { useState } from "react";
import {
  Paper,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Icon,
  makeStyles,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListSubheader
} from "@material-ui/core";
import { Link } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import StarIcon from "@material-ui/icons/Star";
import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";
import YouTubeIcon from "@material-ui/icons/YouTube";

const CTA = () => {
  const [activePage, setActivePage] = useState(0);
  const classes = useStyles();

  const renderAppBar = () => {
    return (
      <AppBar position='static' elevation={0}>
        <Toolbar>
          <div style={{ flexGrow: 1 }}>
            <IconButton
              color='inherit'
              className={activePage === 0 ? classes.active : classes.inactive}
              onClick={() => setActivePage(0)}
            >
              <HomeIcon />
            </IconButton>
          </div>

          <IconButton
            color='inherit'
            className={activePage === 1 ? classes.active : classes.inactive}
            onClick={() => setActivePage(1)}
          >
            <FacebookIcon />
          </IconButton>
          <IconButton
            color='inherit'
            className={activePage === 2 ? classes.active : classes.inactive}
            onClick={() => setActivePage(2)}
          >
            <TwitterIcon />
          </IconButton>
          <IconButton
            color='inherit'
            className={activePage === 3 ? classes.active : classes.inactive}
            onClick={() => setActivePage(3)}
          >
            <YouTubeIcon />
          </IconButton>
          <IconButton
            color='inherit'
            className={activePage === 4 ? classes.active : classes.inactive}
            onClick={() => setActivePage(4)}
          >
            <StarIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    );
  };

  const renderSignUpPage = () => {
    return (
      <div style={{ padding: 15 }}>
        <Typography variant='h6'>
          MockRabbit is a Twitch Streamer that provides{" "}
          <span className={classes.highlight}>AWESOME GAMING CONTENT </span>
          every single day at{" "}
          <span className={classes.highlight}>twitch.tv/mockrabbit</span>. Join
          the MockRabbit Community right now!
        </Typography>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant='contained'
            color='secondary'
            component={Link}
            startIcon={<StarIcon />}
            to='/profile'
          >
            Join the Community
          </Button>
        </div>
      </div>
    );
  };

  const renderSocialCards = name => {
    return (
      <List subheader={<ListSubheader>{name}</ListSubheader>}>
        <ListItem button>
          <ListItemText primary='coming soon...' />
        </ListItem>
        <ListItem button>
          <ListItemText primary='coming soon...' />
        </ListItem>
        <ListItem button>
          <ListItemText primary='coming soon...' />
        </ListItem>
        <ListItem button>
          <ListItemText primary='coming soon...' />
        </ListItem>
      </List>
    );
  };

  const renderCTAPage = activePage => {
    if (activePage === 0) {
      return renderSignUpPage();
    }
    if (activePage === 1) {
      return renderSocialCards("facebook.com/mockRabbit");
    }
    if (activePage === 2) {
      return renderSocialCards("twitter.com/mockRabbit");
    }
    if (activePage === 3) {
      return renderSocialCards("youtube.com/mockRabbit");
    }
    if (activePage === 4) {
      return renderSocialCards("subscriber feed");
    }
  };

  return (
    <Paper elevation={4}>
      {renderAppBar()}
      {renderCTAPage(activePage)}
    </Paper>
  );
};

export default CTA;

const useStyles = makeStyles(theme => ({
  active: {
    opacity: 1,
    transition: "opacity 0.4s"
  },
  inactive: {
    opacity: "0.4",
    transition: "opacity 0.4s"
  },
  highlight: {
    color: theme.palette.secondary.light
  }
}));
