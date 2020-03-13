import React, { useContext } from "react";
import { Modal, Paper, Button, Typography } from "@material-ui/core";
import { FirebaseContext } from "../FirebaseWrapper";
import { withSnackbar } from "notistack";
import { withRouter } from "react-router";

const LoginPage = ({ handleClose, enqueueSnackbar, history }) => {
  const { googleSignin } = useContext(FirebaseContext);

  const handleGoogleSignIn = () =>
    googleSignin().then(() => {
      if (handleClose) {
        handleClose();
      }
      enqueueSnackbar("Login Successful!");
    });

  return (
    <Paper
      style={{
        padding: 15,
        margin: 15,
        minWidth: 250,
        maxWidth: 500
      }}
      elevation={4}
    >
      <Typography gutterBottom variant='h6' align='center'>
        Login Here
      </Typography>
      <Button
        style={{ margin: "5px 0" }}
        onClick={handleGoogleSignIn}
        fullWidth
        variant='contained'
        color='secondary'
      >
        Google
      </Button>
    </Paper>
  );
};

export default withRouter(withSnackbar(LoginPage));
