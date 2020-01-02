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
    background: deepPurple["A700"],
    color: "#fff"
  },
  tier4: {
    background: deepOrange["A400"],
    color: "#fff"
  },
  tier5: {
    background: red["A700"],
    color: "#fff"
  },
  admin: {
    background: grey["900"],
    color: "#fff"
  }
});

const renderApp = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <FirebaseWrapper>
          <App />
        </FirebaseWrapper>
      </ThemeProvider>
    </BrowserRouter>
  );
};

ReactDOM.render(renderApp(), document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
