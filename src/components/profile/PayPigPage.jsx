import React from "react";
import {
  Paper,
  TextField,
  Typography,
  Button,
  InputAdornment,
  makeStyles,
  Modal,
} from "@material-ui/core";
import { useContext } from "react";
import { FirebaseContext } from "../FirebaseWrapper";
import { green } from "@material-ui/core/colors";
import { useState } from "react";
import LoginPage from "./LoginPage";

const PayPigPage = () => {
  const classes = useStyles();
  const { giveSubscription, userStatus } = useContext(FirebaseContext);
  const [loginModalOpen, setLoginModal] = useState(false);

  const [input, setInput] = useState("");
  const renderSubPage = (loggedin) => {
    if (loggedin) {
      return (
        <>
          <Typography variant='h6'>Subscription</Typography>
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
        </>
      );
    } else {
      return (
        <>
          <Button
            variant='contained'
            onClick={() => setLoginModal(true)}
            fullWidth
            color='secondary'
            style={{ marginBottom: 5 }}
          >
            Login
          </Button>
          <Typography align='center' variant='body2'>
            (Log in to Subscribe)
          </Typography>

          <Modal open={loginModalOpen} onClose={() => setLoginModal(false)}>
            <LoginPage handleClose={() => setLoginModal(false)} />
          </Modal>
        </>
      );
    }
  };

  return (
    <Paper className={classes.paper} elevation={4}>
      <Typography variant='h6'>Donate</Typography>
      <TextField
        placeholder='Ex: $15.00'
        fullWidth
        value={input}
        onChange={({ target }) => setInput(target.value)}
        InputProps={{
          startAdornment: <InputAdornment position='start'>$</InputAdornment>,
        }}
      />
      <Button
        disabled={!input}
        className={classes.donate}
        color='primary'
        variant='contained'
        fullWidth
      >
        Donate
      </Button>
      {renderSubPage(userStatus)}
    </Paper>
  );
};

export default PayPigPage;

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: 15,
    margin: 15,
    // ...theme.card,
    maxWidth: 450,
    width: "100%",
  },
  tier1: {
    ...theme.tier1,
    transition: "opacity 0.3s",
    margin: "7.5px 0",
    "&:hover": { ...theme.tier1, opacity: 0.8 },
  },
  tier2: {
    ...theme.tier2,
    transition: "opacity 0.3s",
    margin: "7.5px 0",
    "&:hover": { ...theme.tier2, opacity: 0.8 },
  },
  tier3: {
    ...theme.tier3,
    transition: "opacity 0.3s",
    margin: "7.5px 0",
    "&:hover": { ...theme.tier3, opacity: 0.8 },
  },
  tier4: {
    ...theme.tier4,
    transition: "opacity 0.3s",
    margin: "7.5px 0",
    "&:hover": { ...theme.tier4, opacity: 0.8 },
  },
  tier5: {
    ...theme.tier5,
    transition: "opacity 0.3s",
    margin: "7.5px 0",
    "&:hover": { ...theme.tier5, opacity: 0.8 },
  },
  donate: {
    margin: "7.5px 0",
  },
}));
