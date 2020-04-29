import React, { useState } from "react";
import { Paper, Grid, Button, makeStyles, Typography } from "@material-ui/core";

const VideoCard = () => {
  const classes = useStyles();
  const [active, setActive] = useState(false);
  return (
    <Grid
      item
      md={2}
      sm={6}
      xs={12}
      container
      justify='center'
      onMouseOver={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      <Paper elevation={4} className={classes.paper}>
        <div className={classes.card}>
          <Typography
            variant='subtile1'
            className={`${classes.title} ${active ? classes.active : null}`}
          >
            Coming Soon...
          </Typography>

          <img
            className={classes.img}
            src='https://www.coderepublics.com/tools/Images/youtube-thumbnail-size.png'
            alt=''
          />
        </div>
      </Paper>
    </Grid>
  );
};

export default VideoCard;

const useStyles = makeStyles((theme) => ({
  card: {
    position: "relative",
    height: "100%",
    cursor: "pointer",
  },
  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  title: {
    display: "flex",
    boxSizing: "border-box",
    background: "#000",
    color: "#fff",
    position: "absolute",
    bottom: 0,
    padding: 5,
    width: "100%",
    opacity: 0,
    transition: "0.2s opacity",
  },
  active: {
    opacity: 0.8,
  },
  paper: {
    background: theme.cta.ctaText,
    padding: 8,
    margin: 15,
  },
}));
