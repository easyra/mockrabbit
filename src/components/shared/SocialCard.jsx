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
  IconButton,
  Modal,
} from "@material-ui/core";
import { useContext } from "react";
import { SiteContext } from "../SiteWrapper";
import { useState } from "react";
import SubscribeButton from "./SubscribeButton";

const SocialCard = ({ type, elevation = 4 }) => {
  const classes = useStyles();
  const { socialLinks } = useContext(SiteContext);
  const [payPigModal, setPayPigModal] = useState(false);
  const subscriberFeed = type !== "subscribe";

  const names = {
    facebook: "Facebook",
    youtube: "YouTube",
    twitter: "Twitter",
    subscribe: "Subscriber Feed",
  };
  return (
    <>
      <Paper elevation={elevation} className={classes.paper}>
        <AppBar elevation={0} position='static' color='primary'>
          <Toolbar style={{ justifyContent: "space-between" }}>
            {names[type]}
            {subscriberFeed ? (
              <Button
                href={socialLinks[type]}
                target='_blank'
                className={classes.ctaText}
                size=''
                variant='outlined'
              >
                MORE
              </Button>
            ) : (
              <SubscribeButton variant='outlined' justify='flex-end' />
            )}
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
    </>
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
  ctaText: {
    color: theme.cta.ctaText,
    borderColor: theme.cta.ctaText,
  },
}));
