import React from "react";
import Navbar from "./components/navbar.jsx";
import Home from "./components/home/Home.jsx";
import { Route, Switch } from "react-router-dom";
import Live from "./components/live/Live.jsx";

function App() {
  return (
    <div className='App'>
      <Route component={Navbar} path='/' />
      <Switch>
        <Route exact strict path='/' component={Home} />
        <Route exact strict path='/live' component={Live} />
      </Switch>
    </div>
  );
}

export default App;
