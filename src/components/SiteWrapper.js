import React, { useState, useEffect } from "react";
import { ThemeProvider, Button } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";

import themes from "../themes";
import { withSnackbar } from "notistack";

export const SiteContext = React.createContext({});
export const SiteConsumer = SiteContext.Consumer;
export const SiteProvider = SiteContext.Provider;

const SiteWrapper = ({ children, enqueueSnackbar }) => {
  const [activeTheme, setActiveTheme] = useState("lightTheme");
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setActiveTheme(savedTheme);
    }
  }, []);
  const themeOptions = [
    { theme: "lightTheme", name: "Light Theme" },
    { theme: "darkTheme", name: "Dark Theme" },
    { theme: "transTheme", name: "Trans Right Theme" }
  ];

  const changeTheme = theme => {
    localStorage.setItem("theme", theme);
    setActiveTheme(theme);
  };
  const socials = {
    twitchID: "mockrabbit",
    youtubeID: "mockrabbit",
    facebookID: "mockrabbit",
    discordID: "",
    twitterID: "mockrabbit",
    name: "MockRabbit"
  };
  useEffect(() => {
    // setDummyMessages();

    setInterval(() => {
      const { text, action } = messageArr[
        Math.floor(Math.random() * messageArr.length)
      ];
      enqueueSnackbar(text, { action });
    }, 900000);
  }, []);

  const messageArr = [
    {
      text: "twitter.com/" + socials.twitterID,
      action: (
        <Button
          target='__blank'
          href={"https://www.twitter.com/" + socials.twitterID}
          variant='contained'
          color='primary'
        >
          Follow Me
        </Button>
      )
    },
    {
      text: "Join the Discord",
      action: (
        <Button
          target='__blank'
          href={"https://www.discord.com/" + socials.discordID}
          variant='contained'
          color='primary'
        >
          Join Here
        </Button>
      )
    },
    {
      text: "twitch.tv/" + socials.twitchID,
      action: (
        <Button
          target='__blank'
          href={"https://www.twitch.tv/" + socials.twitchID}
          variant='contained'
          color='primary'
        >
          Follow Me
        </Button>
      )
    },
    {
      text: "facebook.com/" + socials.facebookID,
      action: (
        <Button
          target='__blank'
          href={"https://www.facebook.com/" + socials.facebookID}
          variant='contained'
          color='primary'
        >
          Follow Me
        </Button>
      )
    },
    {
      text: "Support the Stream",
      action: (
        <Button
          variant='contained'
          startIcon={<FavoriteIcon />}
          color='primary'
        >
          Subscribe
        </Button>
      )
    },
    {
      text: "Support the Stream",
      action: (
        <Button
          variant='contained'
          startIcon={<FavoriteIcon />}
          color='primary'
        >
          Donate
        </Button>
      )
    }
  ];

  return (
    <ThemeProvider theme={themes[activeTheme]}>
      <SiteProvider value={{ themeOptions, changeTheme, socials }}>
        {children}
      </SiteProvider>
    </ThemeProvider>
  );
};

export default withSnackbar(SiteWrapper);
