import React, { useState, useContext } from "react";
import { Helmet } from "react-helmet";
import {
  Paper,
  TextField,
  Container,
  Grid,
  Typography,
  Button,
  InputAdornment
} from "@material-ui/core";
import { firestore, auth } from "../firebase.js";
import { FirebaseContext } from "../FirebaseWrapper.js";
import { makeStyles } from "@material-ui/styles";
import LoginPage from "./LoginPage.jsx";
import { SiteContext } from "../SiteWrapper.js";
import { green, lightGreen } from "@material-ui/core/colors";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import PayPigPage from "./PayPigPage.jsx";

const Profile = ({ history }) => {
  const classes = useStyles();
  const [input, setInput] = useState({ username: "" });
  const {
    userStatus,
    userInfo,
    giveSubscription,
    signOut,
    registeredUser
  } = useContext(FirebaseContext);
  const { changeTheme, themeOptions, activeTheme } = useContext(SiteContext);
  const needsUsername = !userStatus && auth.currentUser;

  const handleChange = e => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };
  const handleSubmit = e => {
    if (auth.currentUser) {
      if (!registeredUser(input.username)) {
        setInput({ username: "" });
      }
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
      return <LoginPage />;
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
            <Typography gutterBottom variant='h6'>
              Change Theme
            </Typography>
            {themeOptions.map(({ theme, name }) => (
              <Button
                variant={"contained"}
                color={activeTheme === theme ? "secondary" : "default"}
                style={{ margin: 5 }}
                onClick={() => changeTheme(theme)}
              >
                {name}
              </Button>
            ))}
          </Paper>
        </Grid>
        <Grid item sm={6} md={3}>
          <PayPigPage />
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
