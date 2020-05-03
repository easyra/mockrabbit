import React from "react";
import { makeStyles, IconButton, Grid, Typography } from "@material-ui/core";
import FacebookIcon from "@material-ui/icons/Facebook";
import YouTubeIcon from "@material-ui/icons/YouTube";
import TwitterIcon from "@material-ui/icons/Twitter";
import { useContext } from "react";
import { SiteContext } from "../SiteWrapper";

const Footer = () => {
  const classes = useStyles();
  const { socials, socialLinks } = useContext(SiteContext);
  return (
    <footer className={classes.footer}>
      <Grid container justify={"center"}>
        <IconButton
          target='_blank'
          href={socialLinks.facebook}
          className={classes.iconButton}
        >
          <FacebookIcon style={{ fontSize: 50 }} size='large' color='inherit' />
        </IconButton>
        <IconButton
          target='_blank'
          href={socialLinks.youtube}
          className={classes.iconButton}
        >
          <YouTubeIcon style={{ fontSize: 50 }} size='large' color='inherit' />
        </IconButton>
        <IconButton
          target='_blank'
          href={socialLinks.twitter}
          className={classes.iconButton}
        >
          <TwitterIcon style={{ fontSize: 50 }} size='large' color='inherit' />
        </IconButton>
      </Grid>
      <Typography className={classes.email} align='center' variant='subtitle1'>
        {socials.email}
      </Typography>
    </footer>
  );
};

const useStyles = makeStyles((theme) => ({
  footer: {
    background: theme.palette.primary.main,
    padding: "4%",
  },
  socialList: {
    display: "flex",
    justifyContent: "center",
  },
  iconButton: {
    margin: 5,
    color: theme.cta.ctaText,
    fontSize: "48px",
  },
  email: {
    color: theme.palette.primary.contrastText,
  },
}));

export default Footer;
