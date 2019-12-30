import React, { useState, useContext } from "react";
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

const Profile = ({ history }) => {
  const [input, setInput] = useState({ username: "" });
  const { userStatus, googleSignin } = useContext(FirebaseContext);
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
        .set({ username: input.username })
        .then(() => {
          setInput({ username: "" });
          history.push("/live");
        });
    }
  };

  const renderRegister = () => {
    if (needsUsername) {
      return (
        <>
          <Grid xs={3}>
            <Paper style={{ padding: 15 }} elevation={4}>
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
    } else {
      return (
        <Paper style={{ padding: 15 }} elevation={4}>
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
    }
  };
  return (
    <Grid style={{ marginTop: 50 }} justify='space-around' container>
      {renderRegister()}
    </Grid>
  );
};

export default Profile;
