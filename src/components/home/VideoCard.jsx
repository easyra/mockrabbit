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
        {/* <AppBar position='static' color='primary' elevation={4}>
      <Typography style={{ padding: 5 }} variant='body1'>
        Title
      </Typography>
    </AppBar> */}
        <div className={classes.card}>
          <Typography
            variant='subtile1'
            className={`${classes.title} ${active ? classes.active : null}`}
          >
            Coming Soon...
          </Typography>

          <img
            className={classes.img}
            src='https://images.pexels.com/photos/3789885/pexels-photo-3789885.jpeg?cs=srgb&dl=stainless-steel-spoon-on-black-ceramic-bowl-3789885.jpg&fm=jpg'
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
    width: "225px",
    height: "225px",
  },
}));
