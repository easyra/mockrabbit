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
} from "@material-ui/core/colors";

const darkSettings = {
  tier1: {
    background: lightBlue["A100"],
    color: "#000",
  },
  tier2: {
    background: indigo["A100"],
    color: "#000",
  },
  tier3: {
    background: yellow["A100"],
    color: "#000",
  },
  tier4: {
    background: orange["A200"],
    color: "#000",
  },
  tier5: {
    backgroundColor: pink["A100"],
    color: "#000",
  },
  admin: {
    background: `linear-gradient(315deg, ${yellow["A700"]} 0%, ${yellow["A200"]} 74%)`,

    color: "#000",
  },
  moderator: {
    backgroundColor: "#b8c6db",
    backgroundImage: `linear-gradient(315deg, ${lightGreen["A700"]} 0%, ${lightGreen["A200"]} 74%)`,
    color: "#000",
  },
  notable: {
    background: `linear-gradient(315deg, ${cyan["A700"]} 0%, ${cyan["A200"]} 74%)`,

    color: "#000",
  },
  background: {
    background: grey[900],
  },
  card: {
    background: grey[800],
    color: "#fff",
  },

  highlight: {
    color: purple["A700"],
    background: purple["50"],
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
  tier1: {
    background: lightBlue["A200"],
    color: "#000",
  },
  tier2: {
    background: cyan["A400"],
    color: "#000",
  },
  tier3: {
    background: green["A400"],
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
  background: {
    background: grey[50],
  },
  highlight: {
    color: purple["A700"],
    background: purple["50"],
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
export const lightTheme = createMuiTheme({
  ...lightSettings,
  palette: {
    primary: { main: grey["900"] },
    secondary: { main: purple["A700"] },
    info: { main: orange["A400"] },
  },
  background: {
    background: grey[50],
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

export const transTheme = createMuiTheme({
  palette: {
    primary: { main: lightBlue["A100"] },
    secondary: { main: pink["50"] },
    info: { main: orange["A400"] },
  },
  ...lightSettings,
  background: {
    background: grey[50],
  },
});
export default { lightTheme, darkTheme, transTheme, omniTheme };
