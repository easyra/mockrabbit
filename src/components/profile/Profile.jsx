import React, { useState, useContext } from "react";
import { Helmet } from "react-helmet";
import {
  Paper,
  TextField,
  Container,
  Grid,
  Typography,
  Button
} from "@material-ui/core";
import { firestore, auth } from "../firebase.js";
import { FirebaseContext } from "../FirebaseWrapper.js";
import { makeStyles } from "@material-ui/styles";

const Profile = ({ history }) => {
  const classes = useStyles();
  const [input, setInput] = useState({ username: "" });
  const {
    userStatus,
    googleSignin,
    userInfo,
    getUserInfo,
    giveSubscription,
    signOut
  } = useContext(FirebaseContext);
  const needsUsername = !userStatus && auth.currentUser;

  const handleChange = e => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };
  const handleSubmit = e => {
    if (auth.currentUser) {
      firestore
        .collection("users")
        .doc(auth.currentUser.uid)
        .set({ username: input.username, role: null, sub: null })
        .then(() => {
          setInput({ username: "" });
          getUserInfo();
          history.push("/live");
        });
    }
  };

  const renderProfilePage = () => {
    if (needsUsername) {
      return (
        <>
          <Grid item sm={6} xs={6}>
            <Paper className={classes.paper} elevation={4}>
              <Typography gutterBottom variant='h6'>
                Create Username
              </Typography>
              <TextField
                fullWidth
                value={input.username}
                name='username'
                onChange={handleChange}
              />
              <Button
                size='small'
                style={{ margin: "15px 0 5px" }}
                // disabled
                fullWidth
                color='primary'
                variant='contained'
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Paper>
          </Grid>
        </>
      );
    } else if (!userStatus) {
      return (
        <Paper className={classes.paper} elevation={4}>
          <Typography gutterBottom variant='h2'>
            LOGIN HERE
          </Typography>
          <Button
            onClick={googleSignin}
            fullWidth
            variant='contained'
            color='secondary'
          >
            Google
          </Button>
        </Paper>
      );
    } else return renderProfileInfo();
  };
  const renderProfileInfo = () => {
    return (
      <>
        <Grid item sm={6} md={3}>
          <Paper className={classes.paper} elevation={4}>
            <Typography gutterBottom variant='h6'>
              {userInfo.username}
            </Typography>
            <Button onClick={signOut} color='secondary' variant='contained'>
              Sign Out
            </Button>
          </Paper>
        </Grid>
        <Grid item sm={6} md={3}>
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
          </Paper>
        </Grid>
      </>
    );
  };
  return (
    <Grid style={{ marginTop: 50 }} justify='center' container>
      <Helmet>
        <title>
          {userInfo.username ? `${userInfo.username} Account` : "Login!"}
        </title>
      </Helmet>
      {renderProfilePage()}
    </Grid>
  );
};

export default Profile;

const useStyles = makeStyles(theme => ({
  paper: { padding: 15, margin: 15 },
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
  }
}));
