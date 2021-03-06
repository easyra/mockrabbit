import React, { useState } from "react";
import { Helmet } from "react-helmet";
import {
  Paper,
  Grid,
  Typography,
  AppBar,
  Button,
  makeStyles,
  Toolbar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  Hidden,
} from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";

import ResponsiveEmbed from "react-responsive-embed";
import CTA from "./CTA.jsx";
import VideoCard from "./VideoCard.jsx";
import SubLeaderboard from "../shared/SubLeaderboard.jsx";
import SocialCard from "../shared/SocialCard.jsx";
import Footer from "../shared/Footer.jsx";

const Home = ({ history }) => {
  const classes = useStyles();
  const renderVideoCard = () => {
    return <VideoCard />;
  };
  const renderIntroVideo = () => {
    return (
      <Paper elevation={4}>
        <ResponsiveEmbed src='https://www.youtube.com/embed/x5-JVvCrGC8' />
      </Paper>
    );
  };
  const renderLeaderboard = () => {
    return <SubLeaderboard />;
  };
  const renderVideoCards = () => {
    return (
      <div className={classes.videoCard}>
        {/* <Typography
          // color=''
          style={{ margin: "0 25px", position: "relative", zIndex: 20 }}
          variant={"h4"}
          align='right'
        >
          MY VIDEOS
        </Typography> */}
        <Grid container justify={"space-around"}>
          {renderVideoCard()}
          {renderVideoCard()}
          {renderVideoCard()}
          {renderVideoCard()}
          {renderVideoCard()}
        </Grid>
      </div>
    );
  };

  const renderSocialCard = () => {
    return (
      <div className={classes.socialCards}>
        {/* <Typography
          // color='primary'
          style={{ margin: "0 25px", position: "relative", zIndex: 20 }}
          variant={"h4"}
          align='right'
          gutterBottom
        >
          MY SOCIAL MEDIA
        </Typography> */}
        <Grid container justify={"center"}>
          <Grid className={classes.socialCard} item md xs={12} sm={12}>
            <SocialCard type={"facebook"} />
          </Grid>

          <Grid className={classes.socialCard} item md xs={12} sm={12}>
            <SocialCard type={"twitter"} />
          </Grid>
          <Grid className={classes.socialCard} item md xs={12} sm={12}>
            <SocialCard type={"youtube"} />
          </Grid>
          <Grid className={classes.socialCard} item md xs={12} sm={12}>
            <SocialCard type={"subscribe"} />
          </Grid>
        </Grid>
      </div>
    );
  };
  return (
    <>
      <Helmet>
        <title>MockRabbit TV</title>
      </Helmet>
      <Grid
        container
        justify='space-around'
        alignItems='center'
        className={classes.homeContainer}
      >
        <Grid item md={6} sm={12} xs={12}>
          <CTA />
        </Grid>
        <Grid item md={4} sm={12} xs={12}>
          {renderLeaderboard()}
        </Grid>
      </Grid>

      {renderSocialCard()}
      {renderVideoCards()}
      <Footer />
    </>
  );
};

export default Home;

const useStyles = makeStyles((theme) => ({
  videoCard: {
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    padding: "50px 0",
  },
  cta: {
    ...theme.cta,
    "&:hover": { opacity: `1` },
  },
  socialCards: {
    ...theme.background,
    color: theme.palette.primary.contrastText,
    padding: "50px 0",
  },
  socialCard: {
    margin: 15,
  },
  footer: {
    background: theme.palette.primary.main,
    padding: 100,
  },
  homeContainer: {
    margin: "calc(4% + 64px) 0 5%",
    [theme.breakpoints.down("sm")]: {
      margin: "56px 0 0%",
    },
  },
}));
