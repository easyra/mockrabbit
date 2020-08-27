import React, { useState } from "react";
import {
  Button,
  makeStyles,
  Modal,
  Hidden,
  IconButton,
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PayPigPage from "../profile/PayPigPage";

const SubscribeButton = ({
  variant = "contained",
  justify = "center",
  xsDown = false,
  icon = false,
}) => {
  const classes = useStyles();
  const [payPigModal, setPayPigModal] = useState(false);

  return (
    <>
      <Modal
        open={payPigModal}
        onClose={() => setPayPigModal(false)}
        style={{
          display: "flex",
          justifyContent: justify,
          alignItems: "baseline",
        }}
      >
        <PayPigPage />
      </Modal>
      {!icon ? (
        <Button
          // className={classes[variant]}
          variant={variant}
          color='secondary'
          startIcon={<FavoriteIcon />}
          onClick={() => setPayPigModal(true)}
        >
          Sub
          <Hidden xsDown={xsDown}>scribe</Hidden>
        </Button>
      ) : (
        <IconButton
          onClick={() => setPayPigModal(true)}
          color='secondary'
          // className={classes.outlined}
        >
          <FavoriteIcon />
        </IconButton>
      )}
    </>
  );
};

export default SubscribeButton;

const useStyles = makeStyles((theme) => ({
  contained: {
    ...theme.cta,
  },
  outlined: {
    color: theme.cta.ctaText,
    borderColor: theme.cta.ctaText,
  },
}));
