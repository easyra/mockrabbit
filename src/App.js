import React from "react";
import Navbar from "./components/navbar.jsx";
import { Paper, Grid } from "@material-ui/core";
import ResponsiveEmbed from "react-responsive-embed";
import CTA from "./components/home/CTA.jsx";

function App() {
  return (
    <div className='App'>
      <Navbar />
      <Grid
        container
        justify='space-around'
        // alignItems='center'
        style={{ margin: "75px 0" }}
      >
        <Grid item md={6}>
          <CTA />
        </Grid>
        <Grid item md={4}>
          <Paper>
            <ResponsiveEmbed src='https://www.youtube.com/embed/x5-JVvCrGC8' />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
