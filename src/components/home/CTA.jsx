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
  Hidden,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import StarIcon from "@material-ui/icons/Star";
import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";
import YouTubeIcon from "@material-ui/icons/YouTube";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import { SiteContext } from "../SiteWrapper";
import ResponsiveEmbed from "react-responsive-embed";
import SocialCard from "../shared/SocialCard";
import { FirebaseContext } from "../FirebaseWrapper";
import FavoriteIcon from "@material-ui/icons/Favorite";

const CTA = () => {
  const [activePage, setActivePage] = useState(0);
  const { socials } = useContext(SiteContext);
  const { streamID } = useContext(FirebaseContext);

  const classes = useStyles();

  const renderAppBar = () => {
    return (
      <>
        <AppBar
          position='static'
          elevation={0}
          color='primary'
          className={classes.nav}
        >
          <Toolbar>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                width: "100%",
              }}
            >
              <IconButton
                color='inherit'
                // className={activePage === 0 ? classes.active : classes.inactive}
                onClick={() => setActivePage(0)}
              >
                <FavoriteIcon />
              </IconButton>
            </div>
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

  const renderCTAText = () => (
    <Grid
      item
      xs={12}
      md={4}
      container
      justify='center'
      alignItems='center'
      direction='column'
    >
      <Typography
        align='center'
        variant='h6'
        component='h1'
        style={{ marginTop: 5 }}
      >
        {socials.name}
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
        startIcon={<PlayArrowIcon />}
        to='/live'
        variant='outlined'
      >
        Watch Now
      </Button>
    </Grid>
  );

  const renderVideoCTA = () => {
    return (
      <Grid container className={classes.card}>
        <Hidden smDown>{renderCTAText()}</Hidden>

        <Grid item xs={12} md={8}>
          <ResponsiveEmbed src={streamID} />
        </Grid>
        <Hidden mdUp>{renderCTAText()}</Hidden>
      </Grid>
    );
  };

  const renderCTAPage = (activePage) => {
    if (activePage === 0) {
      return renderVideoCTA();
    }
    if (activePage === 1) {
      return <SocialCard elevation={0} type={`facebook`} />;
    }
    if (activePage === 2) {
      return <SocialCard elevation={0} type={`twitter`} />;
    }
    if (activePage === 3) {
      return <SocialCard elevation={0} type={`youtube`} />;
    }
    if (activePage === 4) {
      return <SocialCard elevation={0} type={"subscribe"} />;
    }
  };

  return (
    <>
      <Paper
        className={classes.paper}
        style={{ marginBottom: 0 }}
        elevation={4}
      >
        {/* {renderAppBar()} */}
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
  paper: {
    ...theme.card,
    marginBottom: 0,
    [theme.breakpoints.down("sm")]: {
      boxShadow: "none",
      // borderBottom: `50px solid ${theme.palette.secondary.main}`,
    },
  },
  cta: {
    color: theme.cta.ctaText,
    borderColor: theme.cta.ctaText,
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
  nav: {
    color: theme.cta.ctaText,
  },
}));
