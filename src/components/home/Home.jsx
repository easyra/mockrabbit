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
        <Typography
          color='secondary'
          style={{ margin: "0 25px", position: "relative", zIndex: 20 }}
          variant={"h4"}
          align='right'
        >
          VIDEOS
        </Typography>
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
        <Typography
          color='primary'
          style={{ margin: "0 25px", position: "relative", zIndex: 20 }}
          variant={"h4"}
          align='right'
          gutterBottom
        >
          MY MEDIA
        </Typography>
        <Grid container justify={"center"}>
          <Grid className={classes.socialCard} item md={5} xs={12} sm={12}>
            <SocialCard name={"Facebook"} />
          </Grid>
          <Grid className={classes.socialCard} item md={5} xs={12} sm={12}>
            <SocialCard name={"Facebook"} />
          </Grid>
          <Grid className={classes.socialCard} item md={5} xs={12} sm={12}>
            <SocialCard name={"Facebook"} />
          </Grid>
          <Grid className={classes.socialCard} item md={5} xs={12} sm={12}>
            <SocialCard name={"Facebook"} />
          </Grid>
        </Grid>
      </div>
    );
  };

  const renderFooter = () => {
    return <footer className={classes.footer}></footer>;
  };
  return (
    <>
      <Helmet>
        <title>MockRabbit TV</title>
      </Helmet>
      <Grid
        container
        justify='space-around'
        // alignItems='center'
        style={{ margin: "calc(4% + 64px) 0 11%" }}
      >
        <Grid item md={6} sm={8} xs={12}>
          <CTA />
        </Grid>
        <Grid item md={4} sm={8} xs={12}>
          {renderLeaderboard()}
        </Grid>
      </Grid>
      {renderVideoCards()}
      {renderSocialCard()}
      <Footer />
    </>
  );
};

export default Home;

const useStyles = makeStyles((theme) => ({
  videoCard: {
    background: theme.palette.primary.main,
    padding: "50px 0",
  },
  cta: {
    ...theme.cta,
    "&:hover": { opacity: `1` },
  },
  socialCards: {
    background: theme.palette.secondary.main,
    padding: "50px 0",
  },
  socialCard: {
    margin: 15,
  },
  footer: {
    background: theme.palette.primary.main,
    padding: 100,
  },
}));
