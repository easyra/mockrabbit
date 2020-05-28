import React from "react";
import {
  Paper,
  TextField,
  Typography,
  Button,
  InputAdornment,
  makeStyles,
  Modal,
  AppBar,
  Toolbar,
  Grid,
  CircularProgress,
} from "@material-ui/core";
import { useContext } from "react";
import { FirebaseContext } from "../FirebaseWrapper";
import { green } from "@material-ui/core/colors";
import { useState } from "react";
import LoginPage from "./LoginPage";
import { SiteContext } from "../SiteWrapper";
import FavoriteIcon from "@material-ui/icons/Favorite";

const PayPigPage = () => {
  const classes = useStyles();
  const {
    userStatus,
    giveSubscription,
    enqueueSnackbar,
    userInfo,
  } = useContext(FirebaseContext);
  const { socials } = useContext(SiteContext);
  const [loginModalOpen, setLoginModal] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const [input, setInput] = useState("");

  const handleSub = (sub) => {
    setLoading(true);
    giveSubscription(sub)
      .then(() => {
        setTimeout(() => {
          enqueueSnackbar(
            `${userInfo.username} is now a tier ${sub} subscriber`
          );
          setLoading(false);
        }, 1000);
      })
      .catch((err) => {
        setLoading(false);
        enqueueSnackbar(`ERROR: ${err}`);
      });
  };

  const renderSubPage = (loggedin) => {
    if (loggedin) {
      return (
        <>
          <Typography variant='h6'>Subscription</Typography>
          <Typography gutterBottom variant='subtile1'>
            no tier
          </Typography>
          <Button
            onClick={() => handleSub(1)}
            disableRipple
            className={classes.tier1}
            variant='contained'
            fullWidth
          >
            Tier 1 $5
          </Button>
          <Button
            onClick={() => handleSub(2)}
            className={classes.tier2}
            variant='contained'
            fullWidth
          >
            Tier 2 $10
          </Button>
          <Button
            onClick={() => handleSub(3)}
            className={classes.tier3}
            variant='contained'
            fullWidth
          >
            Tier 3 $15
          </Button>
          <Button
            onClick={() => handleSub(4)}
            className={classes.tier4}
            variant='contained'
            fullWidth
          >
            Tier 4 $25
          </Button>
          <Button
            onClick={() => handleSub(5)}
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
            // color='secondary'
            className={classes.cta}
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
  const renderLoading = () => {
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: 15 }}>
        <CircularProgress />
      </div>
    );
  };

  return (
    <>
      <Paper elevation={4} className={classes.paper}>
        <div className={classes.content}>
          <Grid container justify='flex-end' alignItems='baseline'>
            {/* <FavoriteIcon /> */}
            <Typography
              // align='center'
              // style={{ display: "block" }}
              variant='overline'
            >
              Help Support {socials.name} {"<3"}
            </Typography>
          </Grid>

          <Typography variant='h6'>Donate</Typography>
          <TextField
            placeholder='Ex: $15.00'
            fullWidth
            value={input}
            onChange={({ target }) => setInput(target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>$</InputAdornment>
              ),
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
          {isLoading ? renderLoading() : renderSubPage(userStatus)}
        </div>
      </Paper>
    </>
  );
};

export default PayPigPage;

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: 15,
    // ...theme.card,
    maxWidth: 450,
    width: "100%",
    // border: `10px solid ${theme.palette.primary.main}`,
  },
  content: {
    padding: 15,
  },
  cta: { ...theme.cta },
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
    ...theme.cta,
  },
}));
