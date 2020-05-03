import React from "react";
import {
  Paper,
  AppBar,
  Toolbar,
  Button,
  makeStyles,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";

const SocialCard = ({ name, elevation = 4 }) => {
  const classes = useStyles();
  return (
    <Paper elevation={elevation} className={classes.paper}>
      <AppBar elevation={0} position='static' color='primary'>
        <Toolbar style={{ justifyContent: "space-between" }}>
          {name}
          <Button
            href=''
            className={classes.cta}
            size='small'
            variant='contained'
          >
            GO
          </Button>
        </Toolbar>
      </AppBar>
      <List>
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
    </Paper>
  );
};

export default SocialCard;

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
