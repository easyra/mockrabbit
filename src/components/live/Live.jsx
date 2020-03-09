import React, { useState, useRef, useEffect, useContext } from "react";
import { Helmet } from "react-helmet";
import {
  Grid,
  Paper,
  Typography,
  makeStyles,
  AppBar,
  TextField,
  IconButton,
  Menu,
  MenuItem,
  Chip,
  useMediaQuery
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
import { withSnackbar } from "notistack";
import { useTheme } from "@material-ui/core/styles";
import { blueGrey, grey } from "@material-ui/core/colors";

const Live = ({ history, enqueueSnackbar }) => {
  const classes = useStyles();
  const chatScroll = useRef(null);
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up("sm"));
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
  const [anchorEl, setAnchorEl] = useState(null); // Element Node for ChatRoom Menu
  const [emoteEl, setEmoteEl] = useState(null); // Element Node for Emote Menu
  const [textInput, setTextInput] = useState(""); // String for sending messages in chat
  const [shouldScroll, setShouldScroll] = useState(true); // Boolean that enables auto-scroll when true
  const [chatLoaded, setChatLoaded] = useState(false); // Boolean that tells you when chat has finished loading
  const [activeUser, setActiveUser] = useState(null);
  const [mentionedUsers, setMentionedUsers] = useState([]); // Array of usernames that should be highlighted in chat
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
      if (userStatus) {
        await handleNewMessage(textInput);
        setTextInput("");
      } else {
        enqueueSnackbar("Log in to send you message");
        history.push("/profile");
      }
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
  //------------------------------------------------------ TextValidation

  const textValidated = (text, username) => {
    const textArr = text.split(" ");
    for (let i = 0; i < textArr.length; i++) {
      const string = textArr[i];
      const mentionedUser = userList.find(
        element => string.toLowerCase() === element.toLowerCase()
      );
      if (emotes[string]) {
        textArr[i] = emotes[string];
      } else if (mentionedUser) {
        textArr[i] = (
          <a
            style={{ cursor: "pointer", textDecoration: "underline" }}
            className='mentioned'
            onClick={() =>
              setMentionedUsers(prevState => {
                if (prevState.includes(mentionedUser)) {
                  return prevState.filter(user => user !== mentionedUser);
                } else {
                  return [...prevState, mentionedUser, username];
                }
              })
            }
          >
            {textArr[i]}{" "}
          </a>
        );
      } else {
        textArr[i] += " "; // added spacing
      }
    }
    return textArr;
  };

  //------------------------------------------------------ Live Components
  const renderVideoPlayer = () => {
    return (
      <iframe
        frameborder='0'
        src='https://player.twitch.tv/?channel=mockrabbit'
        allowfullscreen
        className={smUp ? classes.iframe : classes.iframeSmUp}
        width='100%'
      ></iframe>
    );
  };
  const renderChatMenu = () => {
    return (
      <>
        <div className={classes.chatWrapper}>
          <div
            className={classes.chat2}
            onClick={e => {
              if (
                !e.target.classList.contains("MuiChip-label") &&
                !e.target.classList.contains("MuiChip-root") &&
                !e.target.classList.contains("mentioned")
              ) {
                setMentionedUsers([]);
              }
            }}
          >
            {/* Chat List */}
            <SimpleBar
              style={{
                height: "100%"
              }}
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
              <Typography variant='button'>More Messages Below</Typography>
            </Paper>

            {renderChatBox()}
          </div>
        </div>
      </>
    );
  };

  const renderChatBox = () => {
    return (
      <Paper elevation={6} style={{ margin: 5 }}>
        <TextField
          style={{ padding: 5, fontSize: "0.875rem" }}
          onKeyPress={handleSubmit}
          onChange={handleChange}
          value={textInput}
          fullWidth
          multiline
          fontSize='small'
          inputProps={{ style: { height: 38, fontSize: "0.875rem" } }}
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
          {renderUserListMenu()}
          {renderEmoteListMenu()}
          <div className={classes.chatBar}>
            <div style={{ flexGrow: 1 }}>
              <IconButton>
                <FavoriteIcon fontSize='small' />
              </IconButton>
            </div>

            <IconButton onClick={e => setEmoteEl(e.target)}>
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

  const renderUserListMenu = () => (
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
  );

  const renderEmoteListMenu = () => (
    <Menu
      id='simple-menu'
      anchorEl={emoteEl}
      keepMounted
      open={Boolean(emoteEl)}
      onClose={() => setEmoteEl(null)}
      style={{ maxHeight: 500 }}
    >
      <Typography variant='h6' style={{ padding: 10 }}>
        Emotes
      </Typography>
      {Object.keys(emotes).map(emote => {
        return (
          <span
            title={emote}
            style={{ cursor: "pointer" }}
            onClick={() => {
              setTextInput(prevState => {
                if (prevState.length === 0) {
                  return emote;
                } else {
                  return `${prevState} ${emote}`;
                }
              });
              setEmoteEl(null);
            }}
          >
            {emotes[emote]}
          </span>
        );
      })}
    </Menu>
  );
  const renderChatMessage = ({ username, text, type = "default", key }) => {
    const chipClass = type.length > 0 ? classes[type] : classes.defaultChip;
    let opacity = null;

    if (mentionedUsers.length > 0) {
      if (mentionedUsers.includes(username)) {
        opacity = "1";
      } else {
        opacity = "0.5";
      }
    } else {
      opacity = 1;
    }
    return (
      <Paper
        style={{ opacity }}
        variant=''
        key={key}
        elevation={3}
        className={classes.message}
      >
        <Typography variant='body2' style={{ wordBreak: "break-word" }}>
          <Chip
            size='small'
            style={{ marginRight: 5, cursor: "pointer" }}
            className={chipClass}
            label={username}
            clickable={false}
            onClick={() =>
              setMentionedUsers(prevState => {
                if (prevState.includes(username)) {
                  return prevState.filter(user => user !== username);
                } else {
                  return [...prevState, username];
                }
              })
            }
          ></Chip>
          {textValidated(text, username)}
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

  useEffect(() => {}, [mentionedUsers]);

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
    <div className={smUp ? classes.liveWrapper : classes.liveWrapperSmUp}>
      <Helmet>
        <title>MockRabbit Livestream</title>
      </Helmet>
      <div style={{ width: "100%", position: "relative", flex: 1 }}>
        {renderVideoPlayer()}
      </div>
      <div
        style={{
          width: "350px",
          height: "calc(100vh - 64px)",
          maxHeight: !smUp && 250,
          marginBottom: !smUp && 50
        }}
      >
        {renderChatMenu()}
      </div>
    </div>
  );
};

export default withSnackbar(Live);

//-----------------------------------------------------------CSS

const useStyles = makeStyles(theme => ({
  liveWrapper: {
    display: "flex",
    justifyContent: "center"
  },
  liveWrapperSmUp: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center"
  },
  chatWrapper: {
    position: "relative",
    height: "100%",
    width: "100%"
  },
  message: {
    padding: 5,
    margin: 5,
    animation: "fadeIn 0.3s 1",
    color: "#fff",
    background: "#212121",
    width: "fit-content",
    transition: "all 0.2s"
  },
  chat2: {
    position: "absolute",
    height: "calc(100% - 119px);",
    width: "100%"
  },
  chatBar: {
    display: "flex",
    justifyContent: "flex-end"
  },
  shouldScroll: {
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    margin: "-32px 5px 0",
    position: "relative",
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
  defaultChip: {
    background: grey[300],
    color: "#000"
  },
  iframe: {
    position: "absolute",
    height: "calc(100vh - 64px)"
  },
  iframeSmUp: {
    height: "100%",
    minHeight: 300
  },

  tier1: { ...theme.tier1 },
  tier2: { ...theme.tier2 },
  tier3: { ...theme.tier3 },
  tier4: { ...theme.tier4 },
  tier5: { ...theme.tier5 },
  admin: { ...theme.admin },
  moderator: { ...theme.moderator }
}));

const emotes = {
  monkaS: (
    <img
      style={{
        margin: "0 5px -7px 0",
        padding: "3px",
        borderRadius: "50%",
        background: "#fff"
      }}
      src='https://cdn.betterttv.net/emote/56e9f494fff3cc5c35e5287e/1x'
    />
  ),
  PepeHands: (
    <img
      style={{
        margin: "0 5px -7px 0"
      }}
      src='https://cdn.betterttv.net/emote/59f27b3f4ebd8047f54dee29/1x'
    />
  ),
  OMEGALUL: (
    <img
      style={{
        margin: "0 5px -7px 0"
      }}
      src='https://cdn.betterttv.net/emote/583089f4737a8e61abb0186b/1x'
    />
  )
};
