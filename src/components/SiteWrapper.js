import React, { useState, useEffect } from "react";
import { ThemeProvider, Button, Chip } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";

import themes from "../themes";
import { withSnackbar } from "notistack";

export const SiteContext = React.createContext({});
export const SiteConsumer = SiteContext.Consumer;
export const SiteProvider = SiteContext.Provider;

const SiteWrapper = ({ children, enqueueSnackbar }) => {
  const [activeTheme, setActiveTheme] = useState("defaultTheme");
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setActiveTheme(savedTheme);
    }
  }, []);
  const themeOptions = [
    { theme: "defaultTheme", name: "Default Theme" },
    { theme: "transTheme", name: "BubbbleGum Theme" },
  ];

  const changeTheme = (theme) => {
    localStorage.setItem("theme", theme);
    setActiveTheme(theme);
  };
  const socials = {
    twitchID: "mockrabbit",
    youtubeID: "mockrabbit",
    facebookID: "mockrabbit",
    discordID: "",
    twitterID: "mockrabbit",
    name: "MockRabbit",
  };

  const socialLinks = {
    twitch: "https://www.twitch.tv/" + socials.twitchID,
    youtube: "https://www.youtube.com/" + socials.youtubeID,
    facebook: "https://www.facebook.com/" + socials.facebookID,
    discord: "https://www.discord.com/" + socials.discordID,
    twitter: "https://www.twitter.com/" + socials.twitterID,
  };

  return (
    <ThemeProvider theme={themes[activeTheme] || themes["defaultTheme"]}>
      <SiteProvider
        value={{ themeOptions, changeTheme, socials, socialLinks, activeTheme }}
      >
        {children}
      </SiteProvider>
    </ThemeProvider>
  );
};

export default withSnackbar(SiteWrapper);
