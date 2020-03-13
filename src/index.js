import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";

import FirebaseWrapper from "./components/FirebaseWrapper";
import { SnackbarProvider } from "notistack";
import SiteWrapper from "./components/SiteWrapper";

const renderApp = () => {
  return (
    <BrowserRouter>
      <SnackbarProvider
        hideIconVariant
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
      >
        <FirebaseWrapper>
          <SiteWrapper>
            <App />
          </SiteWrapper>
        </FirebaseWrapper>
      </SnackbarProvider>
    </BrowserRouter>
  );
};

ReactDOM.render(renderApp(), document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
