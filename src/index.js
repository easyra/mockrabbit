import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { ThemeProvider, createMuiTheme } from "@material-ui/core";
import { BrowserRouter } from "react-router-dom";
import { blue, red } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    // primary: blue,
    // secondary: red
  }
});

const renderApp = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  );
};

ReactDOM.render(renderApp(), document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
