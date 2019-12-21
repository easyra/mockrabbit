import React from "react";
import {
  Paper,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Icon
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import StarIcon from "@material-ui/icons/Star";

const CTA = () => {
  const renderAppBar = () => {
    return (
      <AppBar position='static' elevation={0}>
        <Toolbar>
          <div style={{ flexGrow: 1 }}>
            <IconButton color='inherit'>
              <HomeIcon />
            </IconButton>
          </div>

          <IconButton color='inherit'>
            <HomeIcon />
          </IconButton>
          <IconButton color='inherit'>
            <HomeIcon />
          </IconButton>
          <IconButton color='inherit'>
            <HomeIcon />
          </IconButton>
          <IconButton color='inherit'>
            <HomeIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    );
  };
  return (
    <Paper elevation={4}>
      {renderAppBar()}
      <div style={{ padding: 15 }}>
        <Typography variant='h6'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
          sollicitudin in ipsum vel feugiat. Proin interdum nisi et sem egestas
          rhoncus.
        </Typography>
        <Button variant='contained' color='primary' style={{ float: "right" }}>
          <Icon>
            <StarIcon />
          </Icon>
          Join the Community
        </Button>
      </div>
    </Paper>
  );
};

export default CTA;
