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
  ListItemSecondaryAction
} from "@material-ui/core";
import ResponsiveEmbed from "react-responsive-embed";
import CTA from "./CTA.jsx";
import VideoCard from "./VideoCard.jsx";
import SubLeaderboard from "../shared/SubLeaderboard.jsx";

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
      <Grid container justify='space-around'>
        {renderVideoCard()}
        {renderVideoCard()}
        {renderVideoCard()}
        {renderVideoCard()}
        {renderVideoCard()}
      </Grid>
    );
  };

  const renderFooter = () => {
    return <footer style={{ margin: 100 }}></footer>;
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
        style={{ margin: "75px 0" }}
      >
        <Grid item md={6} sm={8} xs={10}>
          <CTA />
        </Grid>
        <Grid item md={4} sm={8} xs={10}>
          {renderLeaderboard()}
          {/* {renderIntroVideo()} */}
        </Grid>
      </Grid>
      {renderVideoCards()}
    </>
  );
};

export default Home;

const useStyles = makeStyles(theme => ({
  bg: { background: theme.palette.secondary.light }
}));
