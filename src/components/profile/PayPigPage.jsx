import React from "react";
import {
  Paper,
  TextField,
  Typography,
  Button,
  InputAdornment,
  makeStyles
} from "@material-ui/core";
import { useContext } from "react";
import { FirebaseContext } from "../FirebaseWrapper";
import { green } from "@material-ui/core/colors";
import { useState } from "react";

const PayPigPage = () => {
  const classes = useStyles();
  const { giveSubscription } = useContext(FirebaseContext);
  const [input, setInput] = useState("");
  return (
    <Paper className={classes.paper} elevation={4}>
      <Typography variant='h6'>subscription</Typography>
      <Typography gutterBottom variant='subtile1'>
        no tier
      </Typography>
      <Button
        onClick={() => giveSubscription(1)}
        disableRipple
        className={classes.tier1}
        variant='contained'
        fullWidth
      >
        Tier 1 $5
      </Button>
      <Button
        onClick={() => giveSubscription(2)}
        className={classes.tier2}
        variant='contained'
        fullWidth
      >
        Tier 2 $10
      </Button>
      <Button
        onClick={() => giveSubscription(3)}
        className={classes.tier3}
        variant='contained'
        fullWidth
      >
        Tier 3 $15
      </Button>
      <Button
        onClick={() => giveSubscription(4)}
        className={classes.tier4}
        variant='contained'
        fullWidth
      >
        Tier 4 $25
      </Button>
      <Button
        onClick={() => giveSubscription(5)}
        className={classes.tier5}
        variant='contained'
        fullWidth
      >
        Tier 5 $50
      </Button>
      <Typography variant='h6'>donate</Typography>
      <TextField
        placeholder='Ex: $15.00'
        fullWidth
        value={input}
        onChange={({ target }) => setInput(target.value)}
        InputProps={{
          startAdornment: <InputAdornment position='start'>$</InputAdornment>
        }}
      />
      <Button
        disabled={!input}
        className={classes.donate}
        variant='contained'
        fullWidth
      >
        Donate
      </Button>
    </Paper>
  );
};

export default PayPigPage;

const useStyles = makeStyles(theme => ({
  paper: { padding: 15, margin: 15, ...theme.card },
  tier1: {
    ...theme.tier1,
    transition: "opacity 0.3s",
    margin: "7.5px 0",
    "&:hover": { ...theme.tier1, opacity: 0.8 }
  },
  tier2: {
    ...theme.tier2,
    transition: "opacity 0.3s",
    margin: "7.5px 0",
    "&:hover": { ...theme.tier2, opacity: 0.8 }
  },
  tier3: {
    ...theme.tier3,
    transition: "opacity 0.3s",
    margin: "7.5px 0",
    "&:hover": { ...theme.tier3, opacity: 0.8 }
  },
  tier4: {
    ...theme.tier4,
    transition: "opacity 0.3s",
    margin: "7.5px 0",
    "&:hover": { ...theme.tier4, opacity: 0.8 }
  },
  tier5: {
    ...theme.tier5,
    transition: "opacity 0.3s",
    margin: "7.5px 0",
    "&:hover": { ...theme.tier5, opacity: 0.8 }
  },
  donate: {
    color: "#000",
    background: green["A400"],
    transition: "opacity 0.3s",
    margin: "7.5px 0",
    "&:hover": { color: "#000", background: green["A400"], opacity: 0.8 }
  }
}));
