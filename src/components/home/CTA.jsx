import React, { useState, useContext } from "react";
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
  ListSubheader,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import StarIcon from "@material-ui/icons/Star";
import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";
import YouTubeIcon from "@material-ui/icons/YouTube";
import { SiteContext } from "../SiteWrapper";
import ResponsiveEmbed from "react-responsive-embed";

const CTA = () => {
  const [activePage, setActivePage] = useState(0);
  const { socials } = useContext(SiteContext);

  const classes = useStyles();

  const renderAppBar = () => {
    return (
      <>
        <AppBar position='static' elevation={0} color='primary'>
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
      </>
    );
  };

  const renderSignUpPage = () => {
    return (
      <div style={{ padding: 15 }}>
        <Typography variant='h6'>
          MockRabbit is a Twitch Streamer that provides{" "}
          <span className={classes.highlight}>AWESOME GAMING CONTENT</span>{" "}
          every single day at{" "}
          <span className={classes.highlight}>twitch.tv/mockrabbit</span>. Join
          the MockRabbit Community right now!
        </Typography>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant='outlined'
            // className={classes.cta}
            color='default'
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

  const renderVideoCTA = () => {
    return (
      <Grid container className={classes.card}>
        <Grid item xs={12} md={8}>
          <ResponsiveEmbed
            src={`https://player.twitch.tv/?channel=${socials.twitterID}`}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          container
          alignItems='center'
          direction='column'
        >
          <Typography align='center' variant='h6' style={{ marginTop: 5 }}>
            {socials.name} Live Soon!
          </Typography>
          <Typography align='center' variant='overline'>
            Mon-Fri
          </Typography>
          <Typography align='center' variant='overline' gutterBottom>
            10AM-12AM
          </Typography>
          <Button
            style={{ marginBottom: 15 }}
            className={classes.cta}
            component={Link}
            to='/live'
            variant='contained'
          >
            Watch Now
          </Button>
        </Grid>
      </Grid>
    );
  };

  const renderSocialCards = (name) => {
    return (
      <List
        subheader={
          <ListSubheader className={classes.subheader}>{name}</ListSubheader>
        }
      >
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
        <ListItem button>
          <ListItemText primary='coming soon...' />
        </ListItem>
      </List>
    );
  };

  const renderCTAPage = (activePage) => {
    if (activePage === 0) {
      return renderVideoCTA();
    }
    if (activePage === 1) {
      return renderSocialCards(`facebook.com/${socials.facebookID}`);
    }
    if (activePage === 2) {
      return renderSocialCards(`twitter.com/${socials.twitterID}`);
    }
    if (activePage === 3) {
      return renderSocialCards(`youtube.com/${socials.youtubeID}`);
    }
    if (activePage === 4) {
      return renderSocialCards("subscriber feed");
    }
  };

  return (
    <>
      <Paper
        className={classes.paper}
        style={{ marginBottom: 0 }}
        elevation={4}
      >
        {renderAppBar()}
        {renderCTAPage(activePage)}
      </Paper>
    </>
  );
};

export default CTA;

const useStyles = makeStyles((theme) => ({
  card: {
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  paper: { ...theme.card, margin: 15 },
  cta: {
    ...theme.cta,
    boxSizing: "border-box",
  },
  active: {
    opacity: 1,
    transition: "opacity 0.4s",
  },
  subheader: {
    ...theme.card,
    // color: theme.cta.ctaText,
  },
  inactive: {
    opacity: "0.4",
    transition: "opacity 0.4s",
  },
  highlight: {},
  bg: {
    background: theme.palette.secondary.light,
  },
  paper: {
    width: "100%",
  },
}));
