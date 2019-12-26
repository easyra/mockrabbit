import React, { useState, useRef } from "react";
import {
  Grid,
  Paper,
  Typography,
  makeStyles,
  AppBar,
  Toolbar,
  TextField,
  Icon,
  IconButton,
  Menu,
  MenuItem
} from "@material-ui/core";
import ResponsiveEmbed from "react-responsive-embed";
import SimpleBar from "simplebar-react";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import SettingsIcon from "@material-ui/icons/Settings";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import LoyaltyIcon from "@material-ui/icons/Loyalty";
import "simplebar/dist/simplebar.min.css";

const Live = () => {
  const classes = useStyles();
  const bottomScroll = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = e => {
    setAnchorEl(e.target);
  };
  const handleClose = () => {
    setAnchorEl(null);
    console.log("hi");
    console.log(anchorEl);
  };
  const renderVideoPlayer = () => {
    return (
      <Grid md={9}>
        <ResponsiveEmbed src='https://www.youtube.com/embed/x5-JVvCrGC8' />
      </Grid>
    );
  };
  const renderChatMessage = () => {
    return (
      <Paper
        className={classes.message}
        elevation={3}
        onClick={() => {
          bottomScroll.current.scrollIntoView();
        }}
      >
        <Typography variant='body2' style={{ opacity: 0.8 }}>
          <strong>username:</strong> Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Molestias quos officiis numquam quasi harum labore.
        </Typography>
      </Paper>
    );
  };
  const renderChatMenu = () => {
    return (
      <Grid md={3}>
        <div className={classes.chatWrapper}>
          <div className={classes.chat2}>
            <SimpleBar
              style={{ height: "100%" }}
              forceVisible='y'
              autoHide={false}
            >
              {renderChatMessage()}
              {renderChatMessage()}
              {renderChatMessage()}
              {renderChatMessage()}
              {renderChatMessage()}
              {renderChatMessage()}
              {renderChatMessage()}
              {renderChatMessage()}
              {renderChatMessage()}
              {renderChatMessage()}
              {renderChatMessage()}
              {renderChatMessage()}
              {renderChatMessage()}
              {renderChatMessage()}
              {renderChatMessage()}
              {renderChatMessage()}
              {renderChatMessage()}
              <div ref={bottomScroll} className='bottom'></div>
            </SimpleBar>
            {renderChatBox()}
          </div>
        </div>
      </Grid>
    );
  };
  const renderChatBox = () => {
    return (
      <Paper elevation={4} style={{ margin: 5 }}>
        <AppBar position='static' color='primary' elevation={0}>
          <Menu
            id='simple-menu'
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            style={{ maxHeight: 500 }}
          >
            <Typography variant='h6' style={{ padding: 5 }}>
              UserList(10)
            </Typography>
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
            <MenuItem onClick={handleClose}>LogoutLogoutLogoutLogout</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>{" "}
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
            <MenuItem onClick={handleClose}>LogoutLogoutLogoutLogout</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
          <div className={classes.chatBar}>
            <div style={{ flexGrow: 1 }}>
              <IconButton onClick={handleClick}>
                <ChatBubbleIcon fontSize='small' />
              </IconButton>
            </div>

            <IconButton>
              <EmojiEmotionsIcon fontSize='smaill' />
            </IconButton>
            <IconButton>
              <LoyaltyIcon fontSize='small' />
            </IconButton>
            <IconButton>
              <SettingsIcon fontSize='small' />
            </IconButton>
          </div>
        </AppBar>
        <TextField
          style={{ padding: 5 }}
          fullWidth
          multiline
          rowsMax='3'
          variant='outlined'
        />
      </Paper>
    );
  };
  return (
    <div>
      <Grid container justify='space-between'>
        {renderVideoPlayer()}
        {renderChatMenu()}
      </Grid>
    </div>
  );
};

export default Live;

const useStyles = makeStyles({
  chatWrapper: {
    position: "relative",
    height: "100%",
    width: "100%"
  },
  message: {
    padding: 5,
    margin: 5
  },
  chat2: {
    position: "absolute",
    height: "80%",
    minHeight: "300px",
    width: "100%"
  },
  chatBar: {
    // padding: 5
    display: "flex",
    justifyContent: "flex-end"
  }
});
