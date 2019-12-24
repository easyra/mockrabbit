import React from "react";
import Navbar from "./components/navbar.jsx";
import Home from "./components/home/Home.jsx";
import { Route } from "react-router-dom";

function App() {
  return (
    <div className='App'>
      <Route component={Navbar} path='/' />
      <Route exact strict path='/' component={Home} />
    </div>
  );
}

export default App;
