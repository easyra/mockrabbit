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
  indigo,
  blueGrey,
  amber,
  lightGreen,
  cyan,
  yellow,
  orange
} from "@material-ui/core/colors";

export const lightTheme = createMuiTheme({
  palette: {
    primary: { main: yellow["400"] },
    secondary: { main: orange["A200"] },
    info: { main: orange["A400"] }
  },
  tier1: {
    background: lightBlue["A100"],
    color: "#000"
  },
  tier2: {
    background: indigo["A100"],
    color: "#000"
  },
  tier3: {
    background: yellow["A100"],
    color: "#000"
  },
  tier4: {
    background: orange["A200"],
    color: "#000"
  },
  tier5: {
    backgroundColor: pink["A100"],
    color: "#000"
  },
  admin: {
    background: `linear-gradient(315deg, ${yellow["A700"]} 0%, ${yellow["A200"]} 74%)`,

    color: "#000"
  },
  moderator: {
    backgroundColor: "#b8c6db",
    backgroundImage: `linear-gradient(315deg, ${lightGreen["A700"]} 0%, ${lightGreen["A200"]} 74%)`,
    color: "#000"
  },
  notable: {
    background: `linear-gradient(315deg, ${cyan["A700"]} 0%, ${cyan["A200"]} 74%)`,

    color: "#000"
  },
  background: {
    background: grey[50]
  }
});

export const darkTheme = createMuiTheme({
  palette: {
    primary: { main: yellow["A400"] },
    secondary: { main: orange["A400"] },
    info: { main: orange["A700"] }
  },
  tier1: {
    background: lightBlue["A100"],
    color: "#000"
  },
  tier2: {
    background: indigo["A100"],
    color: "#000"
  },
  tier3: {
    background: yellow["A100"],
    color: "#000"
  },
  tier4: {
    background: orange["A200"],
    color: "#000"
  },
  tier5: {
    backgroundColor: pink["A100"],
    color: "#000"
  },
  admin: {
    background: `linear-gradient(315deg, ${yellow["A700"]} 0%, ${yellow["A200"]} 74%)`,

    color: "#000"
  },
  moderator: {
    backgroundColor: "#b8c6db",
    backgroundImage: `linear-gradient(315deg, ${lightGreen["A700"]} 0%, ${lightGreen["A200"]} 74%)`,
    color: "#000"
  },
  notable: {
    background: `linear-gradient(315deg, ${cyan["A700"]} 0%, ${cyan["A200"]} 74%)`,

    color: "#000"
  },
  background: {
    background: grey[900]
  },
  card: {
    background: grey[800],
    color: "#fff"
  }
});

export const transTheme = createMuiTheme({
  palette: {
    primary: { main: pink["50"] },
    secondary: { main: lightBlue["A100"] },
    info: { main: orange["A400"] }
  },
  tier1: {
    background: lightBlue["A100"],
    color: "#000"
  },
  tier2: {
    background: indigo["A100"],
    color: "#000"
  },
  tier3: {
    background: yellow["A100"],
    color: "#000"
  },
  tier4: {
    background: orange["A200"],
    color: "#000"
  },
  tier5: {
    backgroundColor: pink["A100"],
    color: "#000"
  },
  admin: {
    background: `linear-gradient(315deg, ${yellow["A700"]} 0%, ${yellow["A200"]} 74%)`,

    color: "#000"
  },
  moderator: {
    backgroundColor: "#b8c6db",
    backgroundImage: `linear-gradient(315deg, ${lightGreen["A700"]} 0%, ${lightGreen["A200"]} 74%)`,
    color: "#000"
  },
  notable: {
    background: `linear-gradient(315deg, ${cyan["A700"]} 0%, ${cyan["A200"]} 74%)`,

    color: "#000"
  },
  background: {
    background: grey[50]
  }
});

export default { lightTheme, darkTheme, transTheme };
