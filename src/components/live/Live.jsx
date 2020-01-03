import React, { useState, useRef, useEffect, useContext } from "react";
import {
  Grid,
  Paper,
  Typography,
  makeStyles,
  AppBar,
  TextField,
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
  const {
    userStatus,
    userInfo,
    chatTurnedOn,
    chatTurnedOff,
    chatMessages,
    addMessage,
    changedUserInUserList,
    userList
  } = useContext(FirebaseContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [textInput, setTextInput] = useState("");
  const [shouldScroll, setShouldScroll] = useState(true);
  const [chatLoaded, setChatLoaded] = useState(false);
  const [activeUser, setActiveUser] = useState(null);
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
    //--------Menu
    setAnchorEl(e.target);
  };
  const handleClose = () => {
    //---------Menu
    setAnchorEl(null);
  };

  const handleSubmit = async e => {
    //------Chat Box Text Submit
    if (e.key === "Enter" && textInput.length > 0) {
      await handleNewMessage(textInput);
      setTextInput("");
    }
  };

  const handleChange = e => {
    if (e.target.value !== "\n") {
      setTextInput(e.target.value);
    }
  };

  const handleNewMessage = async text => {
    await addMessage(text);
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
      <Grid item md={9} sm={10} xs={12}>
        <ResponsiveEmbed src='https://www.youtube.com/embed/x5-JVvCrGC8' />
      </Grid>
    );
  };
  const renderChatMenu = () => {
    return (
      <Grid item md={3} sm={10} xs={12}>
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
              <Typography variant='button'>Scroll Down</Typography>
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
        <AppBar
          position='static'
          color='default'
          style={{ background: "#fff" }}
          elevation={0}
        >
          <Menu
            id='simple-menu'
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            style={{ maxHeight: 500 }}
          >
            <Typography variant='h6' style={{ padding: 5 }}>
              UserList({userList.length})
            </Typography>
            {userList.map(name => {
              return <MenuItem onClick={handleClose}>{name}</MenuItem>;
            })}
          </Menu>
          <div className={classes.chatBar}>
            <div style={{ flexGrow: 1 }}>
              <IconButton>
                <FavoriteIcon fontSize='small' />
              </IconButton>
            </div>

            <IconButton>
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
  const renderChatMessage = ({ username, text, type = "default", key }) => {
    return (
      <Paper
        key={key}
        className={`${classes.message} ${classes[type]}`}
        elevation={2}
      >
        <Typography variant='body2'>
          <strong className={""}>{username}: </strong>
          {text}
        </Typography>
      </Paper>
    );
  };

  //----------------------------------------------------------Effects

  useEffect(() => {
    if (!chatLoaded && chatMessages.length > 0) {
      scrollDown();
      setChatLoaded(true);
    }
  });

  useEffect(() => {
    try {
      chatTurnedOn();
    } catch {
      console.log("error turning on chat");
    } finally {
      scrollDown();
    }
    return () => chatTurnedOff();
  }, []);

  useEffect(() => {
    if (userInfo.username !== undefined && !activeUser) {
      changedUserInUserList(true);
      setActiveUser(true);
    }

    return function cleanup() {
      changedUserInUserList(null);
    };
  }, [userInfo]);
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
  },

  tier1: { ...theme.tier1 },
  tier2: { ...theme.tier2 },
  tier3: { ...theme.tier3 },
  tier4: { ...theme.tier4 },
  tier5: { ...theme.tier5 },
  admin: { ...theme.admin },
  moderator: { ...theme.moderator }
}));
