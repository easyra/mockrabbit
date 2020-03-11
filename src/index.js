import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { ThemeProvider, createMuiTheme } from "@material-ui/core";
import { BrowserRouter } from "react-router-dom";
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
import FirebaseWrapper from "./components/FirebaseWrapper";
import { SnackbarProvider } from "notistack";

const theme = createMuiTheme({
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
    backgroundColor: green["A400"],
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
  }
});

const renderApp = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <SnackbarProvider
          hideIconVariant
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center"
          }}
        >
          <FirebaseWrapper>
            <App />
          </FirebaseWrapper>
        </SnackbarProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

ReactDOM.render(renderApp(), document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
