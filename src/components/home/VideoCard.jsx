import React, { useState } from "react";
import { Paper, Grid, Button, makeStyles, Typography } from "@material-ui/core";

const VideoCard = () => {
  const classes = useStyles();
  const [active, setActive] = useState(false);
  return (
    <Grid
      item
      md={2}
      sm={7}
      xs={12}
      onMouseOver={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      <Paper elevation={4}>
        {/* <AppBar position='static' color='primary' elevation={4}>
      <Typography style={{ padding: 5 }} variant='body1'>
        Title
      </Typography>
    </AppBar> */}
        <div className={classes.root}>
          <Typography
            variant='subtile1'
            className={`${classes.title} ${active ? classes.active : null}`}
          >
            Title
          </Typography>

          <img
            style={{ width: "100%" }}
            src='https://images.pexels.com/photos/1191639/pexels-photo-1191639.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
            alt=''
          />
        </div>

        <Button fullWidth color='primary'>
          Watch More
        </Button>
      </Paper>
    </Grid>
  );
};

export default VideoCard;

const useStyles = makeStyles({
  root: {
    position: "relative",
    width: "100%",
    cursor: "pointer"
  },
  title: {
    boxSizing: "border-box",
    background: "#000",
    color: "#fff",
    position: "absolute",
    bottom: 0,
    padding: 5,
    width: "100%",
    opacity: 0,
    transition: "0.2s opacity"
  },
  active: {
    opacity: 0.8
  }
});
