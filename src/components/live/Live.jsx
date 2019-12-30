import React, { useState, useRef, useEffect, useContext } from "react";
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
import { LoremIpsum } from "lorem-ipsum";
import ResponsiveEmbed from "react-responsive-embed";
import SimpleBar from "simplebar-react";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import SettingsIcon from "@material-ui/icons/Settings";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import FavoriteIcon from "@material-ui/icons/Favorite";
import "simplebar/dist/simplebar.min.css";
import { FirebaseContext } from "../FirebaseWrapper";

const Live = () => {
  const classes = useStyles();
  const chatScroll = useRef(null);
  const { userStatus, userInfo } = useContext(FirebaseContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [textInput, setTextInput] = useState("");
  const [shouldScroll, setShouldScroll] = useState(true);
  const lorem = new LoremIpsum({
    sentencesPerParagraph: {
      max: 8,
      min: 4
    },
    wordsPerSentence: {
      max: 16,
      min: 1
    }
  });

  //------------------------------------------------------ Methods

  const handleClick = e => {
    setAnchorEl(e.target);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSubmit = async e => {
    if (e.key === "Enter" && textInput.length > 0) {
      await addMessage(userInfo.username, textInput);
      setTextInput("");
    }
  };

  const handleChange = e => {
    if (e.target.value !== "\n") {
      setTextInput(e.target.value);
    }
  };

  const addMessage = async (username, text) => {
    await setChatMessages(prevState => [...prevState, { username, text }]);

    // chatScroll.current.scrollTop = chatScroll.current.scrollHeight;
    if (shouldScroll) {
      scrollDown();
    }
  };

  const scrollDown = () => {
    chatScroll.current.scrollTop = chatScroll.current.scrollHeight;
  };

  const handleScroll = () => {
    // chatScroll.current.recalculate();

    if (
      chatScroll.current.scrollTop <=
      chatScroll.current.scrollHeight - 540 - 50
    ) {
      setShouldScroll(false);
    } else {
      setShouldScroll(true);
    }
  };

  //------------------------------------------------------ Live Components
  const renderVideoPlayer = () => {
    return (
      <Grid md={9} sm={10} xs={12}>
        <ResponsiveEmbed src='https://www.youtube.com/embed/x5-JVvCrGC8' />
      </Grid>
    );
  };
  const renderChatMenu = () => {
    return (
      <Grid md={3} sm={10} xs={12}>
        <div className={classes.chatWrapper}>
          <div className={classes.chat2}>
            <SimpleBar
              style={{ height: "100%" }}
              forceVisible='y'
              autoHide={false}
              scrollableNodeProps={{ ref: chatScroll }}
              onScroll={handleScroll}
            >
              {chatMessages.map(chatMessage => renderChatMessage(chatMessage))}
              <div className='bottom'></div>
            </SimpleBar>
            <Paper
              className={`${classes.shouldScroll} ${
                !shouldScroll ? classes.active : ""
              }`}
              onClick={scrollDown}
            >
              <Typography variant='body2'>Scroll Down</Typography>
            </Paper>
            {renderChatBox()}
          </div>
        </div>
      </Grid>
    );
  };

  const renderChatBox = () => {
    return (
      <Paper elevation={6} style={{ margin: 5 }}>
        <TextField
          style={{ padding: 5 }}
          onKeyPress={handleSubmit}
          onChange={handleChange}
          value={textInput}
          fullWidth
          multiline
          fontSize='small'
          placeholder={userStatus ? "Type Here!" : "Login to Type Something"}
          rowsMax='2'
          variant='outlined'
          size='small'
        />
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
              <IconButton>
                <FavoriteIcon fontSize='small' />
              </IconButton>
            </div>

            <IconButton
              onClick={() =>
                addMessage({
                  username: "username",
                  text: lorem.generateSentences(4)
                })
              }
            >
              <EmojiEmotionsIcon fontSize='small' />
            </IconButton>
            <IconButton onClick={handleClick}>
              <ChatBubbleIcon fontSize='small' />
            </IconButton>
            <IconButton>
              <SettingsIcon fontSize='small' />
            </IconButton>
          </div>
        </AppBar>
      </Paper>
    );
  };
  const renderChatMessage = ({ username, text }) => {
    return (
      <Paper className={classes.message} elevation={2}>
        <Typography variant='body2' style={{ opacity: 0.8 }}>
          <strong>{username}: </strong>
          {text}
        </Typography>
      </Paper>
    );
  };

  //----------------------------------------------------------Effects

  useEffect(() => {
    // const interval = setInterval(() => {
    //   if (chatMessages.length > 20) {
    //     setShouldScroll(false);
    //   }
    //   const message = {
    //     username: "username",
    //     text: lorem.generateSentences(Math.floor(Math.random() * 3))
    //   };
    //   addMessage(message);
    // }, 1000);
    // return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (chatMessages.length > 51) {
      setChatMessages(prevState => {
        prevState.shift();
        return [...prevState];
      });
    }
  });

  //----------------------------------------------Render
  return (
    <div>
      <Grid container justify='center'>
        {renderVideoPlayer()}
        {renderChatMenu()}
      </Grid>
    </div>
  );
};

export default Live;

//-----------------------------------------------------------CSS

const useStyles = makeStyles(theme => ({
  chatWrapper: {
    position: "relative",
    height: "100%",
    width: "100%"
  },
  message: {
    padding: 5,
    margin: 5,
    animation: "fadeIn 0.3s 1"
    // transition: "all 0.2s"
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
  },
  shouldScroll: {
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    margin: "0 5px",
    padding: 5,
    display: "flex",
    justifyContent: "center",
    opacity: 0,
    transition: "opacity 0.2s"
  },
  active: {
    opacity: 1,
    cursor: "pointer"
  }
}));
