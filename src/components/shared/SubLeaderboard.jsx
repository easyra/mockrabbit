import React, { useState } from "react";
import {
  Paper,
  Grid,
  Typography,
  AppBar,
  Button,
  makeStyles,
  Toolbar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  IconButton,
  ListSubheader,
  Modal,
  Hidden,
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LoyaltyIcon from "@material-ui/icons/Loyalty";
import CancelIcon from "@material-ui/icons/Cancel";
import PayPigPage from "../profile/PayPigPage";

const SubLeaderboard = () => {
  const [activePage, setActivePage] = useState("donations");
  const [payPigModalOpen, setPayPigModal] = useState(false);
  const pageOptions = ["Donations", "Subs"];
  const classes = useStyles();

  const renderAppBar = () => {
    return (
      <AppBar
        position='static'
        elevation={0}
        color='primary'
        className={classes.appbar}
      >
        <Toolbar>
          <Grid container alignItems='center' justify='flex-end'>
            {/* <div className={classes.iconButton}>
              <IconButton color='inherit' onClick={() => setPayPigModal(true)}>
                <FavoriteIcon />
              </IconButton>
            </div> */}

            {renderAppButtons()}
          </Grid>
          <Typography variant='h6'></Typography>
        </Toolbar>
      </AppBar>
    );
  };

  const renderAppButtons = () => {
    return pageOptions.map((page) => {
      const active = page.toLowerCase() === activePage;

      return (
        <Button
          variant={active ? "outlined" : ""}
          color='inherit'
          onClick={() => {
            if (active) {
              setPayPigModal(true);
            } else {
              setActivePage(page.toLowerCase());
            }
          }}
          // className={classes.button}
        >
          {page}
        </Button>
      );
    });
  };

  const renderItems = () => {
    let count = 1;
    const list = items[activePage].map((item) => {
      return renderItem(item, count++);
    });
    for (let i = count; i <= 3; i++) {
      list.push(renderEmptyItem(i));
    }

    return list;
  };

  const renderEmptyItem = (count) => {
    const messages = {
      donations: "No Donation",
      gifts: "No more gifters",
      subs: "No Sub",
    };
    return (
      <ListItem>
        <ListItemIcon>{count}</ListItemIcon>
        <ListItemText
          primary={messages[activePage]}
          secondary={"N/A"}
        ></ListItemText>
      </ListItem>
    );
  };
  const renderItem = ({ name, date, text }, count) => {
    return (
      <ListItem>
        <ListItemIcon>{count}</ListItemIcon>
        <ListItemText primary={name} secondary={date}></ListItemText>
        <ListItemSecondaryAction>{text}</ListItemSecondaryAction>
      </ListItem>
    );
  };

  const renderListSubheader = () => {
    const messages = {
      donations: "Highest Donations",
      subs: "Longest Subs",
      gifts: "Most Gifted Subs",
    };
    return <ListSubheader>Top 5 {messages[activePage]}</ListSubheader>;
  };

  return (
    <>
      <Modal
        onClose={() => setPayPigModal(false)}
        open={payPigModalOpen}
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "baseline",
          margin: "6%",
        }}
      >
        <PayPigPage />
      </Modal>
      <Paper elevation='4'>
        {renderAppBar()}
        {/* <List className={classes.list} dense subheader={renderListSubheader()}> */}
        <List className={classes.list} dense subheader={renderListSubheader()}>
          {renderItems()}
        </List>
      </Paper>
    </>
  );
};

export default SubLeaderboard;

const donations = [
  {
    type: "donation",
    name: "Manny",
    date: "4/1/20",
    text: "$4.14",
  },
  {
    type: "donation",
    name: "Manny",
    date: "4/1/20",
    text: "$4.14",
  },
  {
    type: "donation",
    name: "Manny",
    date: "4/1/20",
    text: "$4.14",
  },
];

const subs = [{ name: "Subber29", text: "11 months", date: "4/1/20" }];

const gifts = [{ name: "Subber29", text: "10", date: "4/1/20" }];

const items = { donations, gifts, subs };

const useStyles = makeStyles((theme) => ({
  button: { margin: "0 15px 0 0", color: theme.palette.primary.contrastText },
  iconButton: { flexGrow: 1, color: theme.cta.ctaText },
  appbar: {
    color: theme.palette.secondary.main,
  },
  list: {
    // background: theme.palette.secondary.light,
  },
}));
