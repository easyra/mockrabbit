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
  indigo
} from "@material-ui/core/colors";
import FirebaseWrapper from "./components/FirebaseWrapper";
import { SnackbarProvider } from "notistack";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: grey[900]
    },
    secondary: { main: red["A700"] }
  },
  tier1: {
    background: lightBlue["A700"],
    color: "#fff"
  },
  tier2: {
    background: indigo["A700"],
    color: "#fff"
  },
  tier3: {
    background: deepOrange["A400"],
    color: "#fff"
  },
  tier4: {
    background: red["A700"],
    color: "#fff"
  },
  tier5: {
    backgroundColor: purple["A400"],
    backgroundImage: `linear-gradient(315deg, ${purple["A700"]} 0%, ${purple["A200"]} 74%)`,
    color: "#fff"
  },
  admin: {
    background: grey["900"],

    color: "#fff"
  },
  moderator: {
    backgroundColor: "#b8c6db",
    backgroundImage: "linear-gradient(315deg, #b8c6db 0%, #f5f7fa 74%)",
    color: "#000"
  }
});

const renderApp = () => {
  return (
    <BrowserRouter>
      <SnackbarProvider>
        <ThemeProvider theme={theme}>
          <FirebaseWrapper>
            <App />
          </FirebaseWrapper>
        </ThemeProvider>
      </SnackbarProvider>
    </BrowserRouter>
  );
};

ReactDOM.render(renderApp(), document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
