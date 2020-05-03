import { createMuiTheme } from "@material-ui/core";
import {
  red,
  grey,
  purple,
  pink,
  deepOrange,
  deepPurple,
  lightBlue,
  blue,
  green,
  teal,
  indigo,
  blueGrey,
  amber,
  lightGreen,
  cyan,
  yellow,
  orange,
  brown,
} from "@material-ui/core/colors";

const subColors = {
  tier1: {
    background: lightBlue["A200"],
    color: "#000",
  },
  tier2: {
    background: lightBlue["A400"],
    color: "#000",
  },
  tier3: {
    background: orange["A400"],
    color: "#000",
  },
  tier4: {
    background: yellow["A400"],
    color: "#000",
  },
  tier5: {
    backgroundColor: pink["A400"],
    color: "#fff",
    fontWeight: "500",
  },
  admin: {
    background: grey["900"],
    fontWeight: "500",
    color: "#fff",
  },
  moderator: {
    backgroundColor: purple["A400"],
    fontWeight: "500",
    color: "#fff",
  },
  notable: {
    background: amber["A400"],

    color: "#000",
  },
};

const darkSettings = {
  ...subColors,
  background: {
    background: grey[900],
  },
  card: {
    background: grey[800],
    color: "#fff",
  },

  highlight: {
    color: purple["A700"],
    background: blueGrey["900"],
  },
  cta: {
    background: green["A700"],
    color: "#fff",
    transition: "opacity 0.3s",
    margin: "7.5px 0",
    "&:hover": { background: green["A700"], opacity: 0.8 },
    ctaText: green["A700"],
  },
};

const lightSettings = {
  ...subColors,

  background: {
    background: grey[50],
  },
  highlight: {
    color: green["A700"],
    background: blueGrey["900"],
  },
  cta: {
    background: yellow["A400"],
    color: "#000",
    transition: "opacity 0.3s",
    margin: "7.5px 0",
    "&:hover": { background: yellow["A400"], opacity: 0.8 },
    ctaText: yellow["A700"],
  },
};
export const theme2 = createMuiTheme({
  ...lightSettings,
  palette: {
    primary: { main: deepPurple["900"] },
    secondary: { main: cyan["A400"] },
    info: { main: orange["A400"] },
  },
  background: {
    background: deepPurple[50],
  },
  card: {
    background: deepPurple[900],
    color: "#fff",
  },
});

export const defaultTheme = createMuiTheme({
  ...lightSettings,
  palette: {
    primary: { main: grey["900"] },
    secondary: { main: cyan["A400"] },
  },
  cta: {
    background: yellow["A400"],
    color: "#000",
    transition: "opacity 0.3s",
    margin: "7.5px 0",
    "&:hover": { background: yellow["A700"], opacity: 0.8 },
    ctaText: yellow["A400"],
  },

  background: {
    background: grey["200"],
  },
  card: {
    background: grey[900],
    color: "#fff",
  },
});

export const transTheme = createMuiTheme({
  palette: {
    primary: { main: lightBlue["A100"] },
    secondary: { main: pink["50"] },
    info: { main: orange["A400"] },
  },
  ...lightSettings,
  background: {
    background: pink[50],
  },
  cta: {
    background: grey["50"],
    color: "#000",
    transition: "opacity 0.3s",
    margin: "7.5px 0",
    "&:hover": { background: orange["50"], opacity: 0.8 },
    ctaText: orange["50"],
  },
});

export const omniTheme = createMuiTheme({
  palette: {
    primary: { main: grey["900"] },
    secondary: { main: "#4EA0DC" },
    info: { main: orange["A400"] },
  },
  ...lightSettings,
});

export const darkTheme = createMuiTheme({
  palette: {
    primary: { main: yellow["A400"] },
    secondary: { main: orange["A400"] },
    info: { main: orange["A700"] },
  },
  ...darkSettings,
});
export default { defaultTheme, darkTheme, transTheme, theme2 };
