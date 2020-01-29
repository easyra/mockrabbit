import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Paper, Grid, Typography, AppBar, Button } from "@material-ui/core";
import ResponsiveEmbed from "react-responsive-embed";
import CTA from "./CTA.jsx";
import VideoCard from "./VideoCard.jsx";

const Home = ({ history }) => {
  const renderVideoCard = () => {
    return <VideoCard />;
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
          <Paper elevation={4}>
            <ResponsiveEmbed src='https://www.youtube.com/embed/x5-JVvCrGC8' />
          </Paper>
        </Grid>
      </Grid>
      {renderVideoCards()}
    </>
  );
};

export default Home;
