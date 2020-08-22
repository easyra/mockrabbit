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
    background: cyan["A400"],
    color: "#000",
  },
  tier2: {
    background: teal["A400"],
    color: "#000",
  },
  tier3: {
    background: green["A400"],
    color: "#000",
    fontWeight: "500",
  },
  tier4: {
    background: purple["A400"],
    color: "#fff",
    fontWeight: "500",
  },
  tier5: {
    backgroundColor: deepPurple["A400"],
    color: "#fff",
    fontWeight: "500",
  },
  admin: {
    background: amber["A700"],
    fontWeight: "500",
    color: "#000",
  },
  moderator: {
    backgroundColor: amber["A200"],
    fontWeight: "500",
    color: "#000",
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
  system: {
    color: "#fff",
    background: teal[500],
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
    secondary: { main: '#5fc4c7' },
  },
  cta: {
    background: '#fff560',
    color: "#000",
    transition: "opacity 0.3s",
    margin: "7.5px 0",
    "&:hover": { background: '#fff560', opacity: 0.8 },
    ctaText:'#fff560',
  },

  background: {
    background: '#473C5B',
  },
  card: {
    background: grey['900'],
    color: "#fff",
  },
});

export const theme3 = createMuiTheme({
  ...lightSettings,
  palette: {
    primary: { main: grey["900"] },
    secondary: { main: deepPurple["A400"] },
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
    backgroundColor: yellow["A700"],
    background:
      "url(https://images.pexels.com/photos/2964916/pexels-photo-2964916.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940)",
  },
  card: {
    background: grey[50],
    color: "#000",
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
  cta: {
    background: red["A700"],
    color: "#fff",
    transition: "opacity 0.3s",
    margin: "7.5px 0",
    "&:hover": { background: red["A700"], opacity: 0.8 },
    ctaText: "#4EA0DC",
  },
  background: {
    background: grey[800],
  },
  card: {
    background: grey[900],
    color: "#fff",
  },
});

export const darkTheme = createMuiTheme({
  palette: {
    primary: { main: yellow["A400"] },
    secondary: { main: orange["A400"] },
    info: { main: orange["A700"] },
  },
  ...darkSettings,
});

export const ezraccoon = createMuiTheme({
  ...lightSettings,
  palette: {
    primary: { main: grey["900"] },
    secondary: { main: green["A400"] },
  },
  cta: {
    background: cyan["A400"],
    color: "#000",
    transition: "opacity 0.3s",
    margin: "7.5px 0",
    "&:hover": { background: cyan["A700"], opacity: 0.8 },
    ctaText: cyan["A400"],
  },

  background: {
    background: brown["700"],
  },
  card: {
    background: grey[900],
    color: "#fff",
  },
});

export default {
  defaultTheme,
  darkTheme,
  transTheme,
  theme2,
  theme3,
  omniTheme,
  ezraccoon,
};
