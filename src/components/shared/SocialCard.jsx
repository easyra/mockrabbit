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
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import YouTubeIcon from "@material-ui/icons/YouTube";

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

  const icons = {
    facebook: <FacebookIcon />,
    youtube: <YouTubeIcon />,
    twitter: <TwitterIcon />,
  };
  return (
    <>
      <Paper elevation={elevation} className={classes.paper}>
        <AppBar elevation={0} position='static' color='primary'>
          <Toolbar style={{ justifyContent: "flex-end" }}>
            {subscriberFeed ? (
              <Button
                href={socialLinks[type]}
                target='_blank'
                // className={classes.ctaText}
                color='secondary'
                size=''
                variant='outlined'
                startIcon={icons[type]}
              >
                {names[type]}
              </Button>
            ) : (
              <SubscribeButton variant='outlined' justify='flex-end' />
            )}
          </Toolbar>
        </AppBar>
        <List className={classes.list}>
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
  list: {
    // background: theme.palette.secondary.light,
  },
}));
