import firebase, { firestore, database } from "./firebase";
import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import generateRandomAnimalName from "random-animal-name-generator";
import { withSnackbar } from "notistack";
import { red } from "@material-ui/core/colors";
import { Button, ThemeProvider } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import themes, { lightTheme } from "../themes";

export const SiteContext = React.createContext({});
export const SiteConsumer = SiteContext.Consumer;
export const SiteProvider = SiteContext.Provider;

const SiteWrapper = ({ children }) => {
  const [activeTheme, setActiveTheme] = useState(
    localStorage.getItem("theme") || "lightTheme"
  );
  const themeOptions = [
    { theme: "lightTheme", name: "Light Theme" },
    { theme: "darkTheme", name: "Dark Theme" },
    { theme: "transTheme", name: "Trans Right Theme" }
  ];

  const changeTheme = theme => {
    localStorage.setItem("theme", theme);
    setActiveTheme(theme);
  };

  return (
    <SiteProvider value={{ themeOptions, changeTheme }}>
      <ThemeProvider theme={themes[activeTheme]}>{children}</ThemeProvider>
    </SiteProvider>
  );
};

export default SiteWrapper;
