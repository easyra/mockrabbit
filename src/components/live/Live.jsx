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
  useMediaQuery,
  Modal,
  Slider,
  Button,
  Select,
  Icon,
  Box,
  LinearProgress,
  ButtonGroup,
  Badge,
} from "@material-ui/core";
import { LoremIpsum } from "lorem-ipsum";
import LockIcon from "@material-ui/icons/Lock";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import SimpleBar from "simplebar-react";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import SettingsIcon from "@material-ui/icons/Settings";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import FavoriteIcon from "@material-ui/icons/Favorite";
import "simplebar/dist/simplebar.min.css";
import { FirebaseContext } from "../FirebaseWrapper";
import { withSnackbar } from "notistack";
import { useTheme } from "@material-ui/core/styles";
import { blueGrey, grey, yellow, green } from "@material-ui/core/colors";
import { SiteContext } from "../SiteWrapper";
import PayPigPage from "../profile/PayPigPage";
import SubscribeButton from "../shared/SubscribeButton";

const Live = ({ history, enqueueSnackbar }) => {
  const classes = useStyles();
  const chatScroll = useRef(null);
  const lastMessage = useRef(null);
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
    userList,
    userBanned,
    banUser,
    addPoll,
    poll,
    pollTimer,
    voteInPoll,
  } = useContext(FirebaseContext);
  const { socials, changeTheme, themeOptions, activeTheme } = useContext(
    SiteContext
  );
  const [anchorEl, setAnchorEl] = useState(null); // Element Node for ChatRoom Menu
  const [emoteEl, setEmoteEl] = useState(null); // Element Node for Emote Menu
  const [settingsModalOpen, setSettingsModal] = useState(false);
  const [textInput, setTextInput] = useState(""); // String for sending messages in chat
  const [shouldScroll, setShouldScroll] = useState(true); // Boolean that enables auto-scroll when true
  const [chatLoaded, setChatLoaded] = useState(false); // Boolean that tells you when chat has finished loading
  const [activeUser, setActiveUser] = useState(null);
  const [payPigModal, setPayPigModal] = useState(false);
  const [mentionedUsers, setMentionedUsers] = useState([]); // Array of strings of usernames that should be underlined if they are mentioned
  const [logCounter, setLogCounter] = useState(0); //used to show grab previous messages and put into textfield
  /// Chat Setting Options
  // const
  const [hovering, setHovering] = useState(false); // used for subscribe button in banned menu

  const [chatSize, setChatSize] = useState(
    localStorage.getItem("chatSize") || 77
  );

  const lorem = new LoremIpsum({
    sentencesPerParagraph: {
      max: 8,
      min: 4,
    },
    wordsPerSentence: {
      max: 16,
      min: 1,
    },
  });

  //------------------------------------------------------ Methods

  const handleClick = (e) => {
    //--------Menu
    setAnchorEl(e.target);
  };
  const handleClose = () => {
    //---------Menu
    setAnchorEl(null);
  };

  const handleSubmit = async (e) => {
    //------Chat Box Text Submit
    if (e.key === "Enter" && textInput.length > 0) {
      if (userStatus) {
        await handleNewMessage(textInput);
        setTextInput("");
        if (userInfo.logs) {
          setLogCounter(0);
        }
      } else {
        enqueueSnackbar("Log in to send you message");
        history.push("/profile");
      }
    }
  };

  const handleChange = (e) => {
    if (userInfo.logs) {
      setLogCounter(0);
    }
    if (e.target.value !== "\n") {
      setTextInput(e.target.value);
    }
  };

  const command = (text) => {
    const arr = text.trim().split(" ");
    console.log(arr);
    const cmd = arr[0];
    if (cmd == "!ban") {
      if (arr[1]) {
        banUser(arr[1], arr[2]);
      }
    }
    if (cmd == "!unban") {
      if (arr[1]) {
        banUser(arr[1], "0m");
      }
    }
    //Polling Commands
    if (cmd == "!poll") {
      const questionIndex = text.indexOf("?") + 1;
      if (questionIndex - 1 === -1) {
        return;
      }
      let pollQuestion = text.slice(6, questionIndex);
      const poll = text.slice(questionIndex + 1).split("/");
      const pollOptions = poll;
      const optionsObject = [];

      for (let i = 0; i < pollOptions.length; i++) {
        optionsObject.push(pollOptions[i].trim());
      }

      if (!poll[1]) {
        return "err";
      }
      addPoll(pollQuestion, optionsObject);
    }
    if (cmd === "!vote") {
      if (poll && poll.options[arr[1] - 1]) {
        voteInPoll(poll.options[arr[1] - 1]);
      }
    }
  };

  const handleNewMessage = async (text) => {
    if (text[0] === "!") {
      command(text);
      await addMessage(text);
    } else {
      await addMessage(text);
    }
    if (shouldScroll) {
      scrollDown();
    }
  };

  const scrollDown = () => {
    if (chatScroll.current) {
      chatScroll.current.scrollTop = chatScroll.current.scrollHeight;
    }
  };

  const getLogMessage = async (e) => {
    if (userInfo.logs) {
      if (e.keyCode === 38 || e.keyCode === 40) {
        const logs = userInfo.logs;
        let count = logs.length - 1 - logCounter;
        if (userInfo.logs) {
          setTextInput(logs[count].text);

          if (e.keyCode === 40 && logCounter > -0) {
            setLogCounter(logCounter - 1);
          } else if (e.keyCode === 38 && logCounter < logs.length - 1) {
            setLogCounter(logCounter + 1);
          }
        }
      }
    }
  };

  const handleScroll = () => {
    setShouldScroll(isScrolledIntoView(lastMessage));
  };

  function isScrolledIntoView(elem) {
    if (!elem) {
      return false;
    }
    var docViewTop = chatScroll.current.scrollTop;
    var docViewBottom = docViewTop + chatScroll.current.clientHeight;
    var elemTop = elem.current.offsetTop;
    var elemBottom = elemTop + elem.current.clientHeight;
    return elemBottom <= docViewBottom && elemTop >= docViewTop;
  }

  const resetSettings = () => {
    setChatSize(77);
    localStorage.removeItem("chatSize");
  };

  //------------------------------------------------------ TextValidation

  const textValidated = (text, username) => {
    const textArr = text.split(" ");
    const highlight = text[0] === ">";
    let mentionedCurrentUser = false; //  checks if current user is being mentioned in message
    for (let i = 0; i < textArr.length; i++) {
      const string = textArr[i];

      const mentionedUser = userList.find(
        // Checks if a string mentioned a User currently in chat room
        (element) => string.toLowerCase() === element.toLowerCase()
      );
      if (emotes[string]) {
        textArr[i] = emotes[string];
      } else if (mentionedUser && userStatus) {
        if (userStatus) {
          mentionedCurrentUser =
            mentionedUser === userInfo.username.toLowerCase(); //checks if string matches current user's username
        }

        textArr[i] = (
          <a
            style={{ cursor: "pointer", textDecoration: "underline" }}
            className='mentioned'
            onClick={() =>
              setMentionedUsers((prevState) => {
                if (prevState.includes(mentionedUser)) {
                  return prevState.filter((user) => user !== mentionedUser);
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
    return [
      <span className={highlight ? classes.highlight : ""}>{textArr}</span>,
      mentionedCurrentUser,
    ];
  };

  //------------------------------------------------------ Live Components
  const renderVideoPlayer = () => {
    return (
      <iframe
        frameborder='0'
        src='https://player.twitch.tv/?channel=mockrabbit&parent=mockrabbit.netlify.app&parent=localhost:3000/live'
        // src='https://player.twitch.tv/?channel=mockrabbit&parent=mockrabbit.netlify.app/'
        allowfullscreen
        className={classes.iframe}
        width='100%'
      ></iframe>
    );
  };

  const renderPoll = () => {
    if (poll) {
      const options = Object.values(poll.options);
      let votes = [...Array(options.length)].map((x) => 0);

      Object.values(poll.voted).forEach((voteChoice) => {
        if (voteChoice) {
          votes[options.indexOf(voteChoice)] += 1;
        }
      });
      // console.log(votes);

      const total = votes.reduce((x, y) => x + y);
      let votesPercentage = votes.map((x) => {
        const percent = (x * 100) / total || 0;
        return percent === NaN ? 0 : percent;
      });
      const grabMax = () => {
        let max = 0;
        votes.forEach((x, i) => {
          if (x > max) {
            max = i;
          }
        });
        return max;
      };
      return (
        <>
          <Paper
            style={{
              position: "relative",
              borderRadius: 0,
            }}
            className={classes.poll}
          >
            {!poll.expired && (
              <>
                {" "}
                <Typography
                  variant='overline'
                  color='secondary'
                  style={{ padding: "5px", paddingBottom: 0 }}
                >
                  {poll.question}
                </Typography>
                {options.map((option, i) => {
                  return (
                    <div className={classes.pollOption}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "baseline",
                        }}
                      >
                        <div
                          style={{
                            flexGrow: 1,
                            alignItems: "baseline",
                            display: "flex",
                          }}
                        >
                          <Chip
                            label={i + 1}
                            size='small'
                            variant='outlined'
                            color={"secondary"}
                            component='div'
                            style={{ margin: 5 }}
                          />
                          <Typography
                            style={{ paddingLeft: 5 }}
                            variant='overline'
                          >
                            {" "}
                            {option}{" "}
                          </Typography>
                        </div>

                        <Typography
                          style={{ marginLeft: 5 }}
                          variant='overline'
                        >
                          {votesPercentage[i] + "%"}
                        </Typography>
                      </div>

                      <LinearProgress
                        color='secondary'
                        variant='determinate'
                        value={votes ? votesPercentage[i] : 0}
                      />
                    </div>
                  );
                })}
              </>
            )}
            {poll.expired && (
              <div style={{ padding: 15 }}>
                <Typography align='center' variant='overline' component='div'>
                  Winner
                </Typography>
                <Typography align='center' color='secondary' variant='h6'>
                  {options[grabMax()]}
                </Typography>
              </div>
            )}

            {!poll.expired && (
              <Typography
                style={{ padding: "0px 5px" }}
                variant='overline'
                component='div'
                align='center'
              >
                {poll.userVoted
                  ? "Your vote has been cast"
                  : `!vote (1-${poll.options.length})`}
              </Typography>
            )}
          </Paper>
        </>
      );
    }
  };

  //-----------------------------------------------------Chat Components
  const renderChatMenu = () => {
    return (
      <>
        <div className={classes.chatWrapper}>
          <div
            className={classes.chat2}
            onClick={(e) => {
              if (e.target.classList) {
                if (
                  !e.target.classList.contains("MuiChip-label") &&
                  !e.target.classList.contains("MuiChip-root") &&
                  !e.target.classList.contains("mentioned")
                ) {
                  setMentionedUsers([]);
                }
              }
            }}
          >
            {/* Chat List */}
            {true && (
              <SimpleBar
                style={{
                  height: "100%",
                }}
                forceVisible='y'
                autoHide={false}
                scrollableNodeProps={{ ref: chatScroll }}
                onScroll={handleScroll}
              >
                {chatMessages.map((chatMessage, i) => {
                  return renderChatMessage(
                    chatMessage,
                    chatMessages.length - 1 === i
                  );
                })}
                <div className='bottom'></div>
              </SimpleBar>
            )}

            <Paper
              className={`${classes.shouldScroll} ${
                !shouldScroll ? classes.active : ""
              }`}
              onClick={scrollDown}
              style={{ zIndex: shouldScroll ? -1 : 1 }}
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
          className={classes.chatbox}
          color='primary'
          style={{ padding: 5, fontSize: "0.875rem", color: "#fff" }}
          onKeyPress={handleSubmit}
          onChange={handleChange}
          value={textInput}
          onKeyDown={getLogMessage}
          fullWidth
          multiline
          fontSize='small'
          inputProps={{
            className: classes.chatboxInput,
          }}
          placeholder={userStatus ? "Type Here!" : "Login to Type Something"}
          rowsMax='2'
          // variant='outlined'
          size='small'
        />
        <AppBar
          position='static'
          color='primary'
          // style={{ background: "#fff" }}
          elevation={0}
        >
          {renderUserListMenu()}
          {renderEmoteListMenu()}
          {renderSettingsModal()}
          <div className={classes.chatBar}>
            <div style={{ flexGrow: 1 }}>
              <SubscribeButton icon justify='flex-end' />
            </div>

            <IconButton
              className={classes.icon}
              onClick={(e) => setEmoteEl(e.target)}
            >
              <EmojiEmotionsIcon fontSize='small' />
            </IconButton>
            <IconButton className={classes.icon} onClick={handleClick}>
              <ChatBubbleIcon fontSize='small' />
            </IconButton>
            <IconButton
              onClick={() => setSettingsModal(true)}
              className={classes.icon}
            >
              <SettingsIcon fontSize='small' />
            </IconButton>
          </div>
        </AppBar>
      </Paper>
    );
  };
  const renderBannedMenu = () => {
    const bantime = (time) => {
      const day = time / 8.64e7;
      const hour = time / 3.6e6;
      const minute = time / 60000;
      const second = time / 1000;
      if (day > 1) {
        return Math.ceil(day) + " days";
      }
      if (hour > 1) {
        return Math.ceil(hour) + " hours";
      }
      if (minute > 1) {
        return Math.ceil(minute) + " minutes";
      }
      if (second > 1) {
        return Math.ceil(second) + " seconds";
      }
    };
    return (
      <div className={classes.bannedMenuWrapper}>
        <Paper
          elevation={4}
          className={classes.bannedMenu}
          color='secondary'
          square
        >
          {hovering ? (
            <LockOpenIcon color='inherit' style={{ fontSize: "3rem" }} />
          ) : (
            <LockIcon color='inherit' style={{ fontSize: "3rem" }} />
          )}
          <Typography variant='h6' align='center' color='inherit'>
            You are Banned
          </Typography>
          <Typography
            variant='overline'
            align='center'
            color='secondary'
            component='p'
            gutterBottom
          >
            {bantime(userBanned)}
          </Typography>
          <Typography variant='overline' align='center' color='inherit'>
            (Subscribe for early unban)
          </Typography>
          <div
            onMouseOver={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            onClick={() => setHovering(false)}
          >
            <SubscribeButton justify='flex-end' />
          </div>
        </Paper>
      </div>
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
      {userList.map((name) => {
        return <MenuItem onClick={handleClose}>{name}</MenuItem>;
      })}
    </Menu>
  );

  const renderSettingsModal = () => (
    <Modal
      open={settingsModalOpen}
      onClose={() => setSettingsModal(false)}
      style={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "flex-end",
        margin: 15,
      }}
    >
      <Paper style={{ padding: 15, width: 500 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
          }}
        >
          <Typography gutterBottom variant='h6'>
            Settings
          </Typography>
          <IconButton onClick={() => setSettingsModal(false)}>x</IconButton>
        </div>

        <Typography variant='subtitle2'>Chat Size</Typography>
        <Slider
          defaultValue={chatSize}
          value={chatSize}
          track='inverted'
          // style={{ transform: "rotate(180deg) scaleX(-1)" }}
          onChange={(e, newValue) => {
            setChatSize(newValue);
            localStorage.setItem("chatSize", newValue);
          }}
          color='primary'
          step={1}
          min={0}
          max={80}
        />
        <Grid container style={{ margin: 15, marginBottom: 50 }}>
          <Grid xs={4} item>
            <Typography variant='subtitle2'>Themes</Typography>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              fullWidth
              value={activeTheme}
              onChange={({ target }) => changeTheme(target.value)}
            >
              {themeOptions.map(({ theme, name }) => (
                <MenuItem value={theme}>{name}</MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>

        <Button variant='contained' onClick={() => resetSettings()}>
          Reset Settings
        </Button>
      </Paper>
    </Modal>
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
      {Object.keys(emotes).map((emote) => {
        return (
          <span
            title={emote}
            style={{ cursor: "pointer" }}
            onClick={() => {
              setTextInput((prevState) => {
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
  const renderChatMessage = (
    { username, text, type, key },

    last
  ) => {
    // username: specific user who is sending message
    // text: text of the message
    // type: checks type of message. usually used to tell if message is from sub or not

    let chipClass = type === "default" ? "defaultChip" : type;

    let opacity = null;
    const [validatedText, mentionedCurrentUser] = textValidated(text, username);

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
        ref={last ? lastMessage : null}
        style={{ opacity }}
        variant='outlined'
        key={key}
        elevation={mentionedCurrentUser ? 10 : 3}
        className={`${classes.message}
        ${type === "system" && classes.system}
        ${mentionedCurrentUser ? classes.highlightMsg : ""}`}
      >
        <Typography variant='body2' style={{ wordBreak: "break-word" }}>
          {type !== "system" && (
            <Chip
              size='small'
              style={{ marginRight: 5, cursor: "pointer" }}
              label={username}
              className={classes[chipClass]}
              clickable={false}
              onClick={() =>
                setMentionedUsers((prevState) => {
                  if (prevState.includes(username)) {
                    return prevState.filter((user) => user !== username);
                  } else {
                    return [...prevState, username];
                  }
                })
              }
            ></Chip>
          )}
          {validatedText}
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
    if (shouldScroll) {
      scrollDown();
    }
  }, [chatMessages]);

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
    <>
      <Modal
        open={payPigModal}
        onClose={() => setPayPigModal(false)}
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-end",
        }}
      >
        <PayPigPage />
      </Modal>
      <div className={classes.liveWrapper}>
        <Helmet>
          <title>MockRabbit Livestream</title>
        </Helmet>
        <div style={{ width: "100%", position: "relative", flex: 1 }}>
          <div
            style={{
              maxWidth: "25%",
              margin: 5,
              position: "absolute",
              zIndex: "900",
              right: 0,
            }}
          >
            {renderPoll()}
          </div>
          {renderVideoPlayer()}
        </div>
        <div
          className={classes.chatMenu}
          style={{
            width: 100 - chatSize + "%",
          }}
        >
          {userBanned ? renderBannedMenu() : renderChatMenu()}
        </div>
      </div>
    </>
  );
};

export default withSnackbar(Live);

//-----------------------------------------------------------CSS

const useStyles = makeStyles((theme) => ({
  liveWrapper: {
    marginTop: 64,
    display: "flex",
    justifyContent: "center",
    [theme.breakpoints.down("xs")]: {
      marginTop: 56,
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: 51,
      justifyContent: "center",
      flexDirection: "column",
      alignItems: "center",
    },
  },

  // liveWrapperSmUp: {
  //   marginTop: 56,
  //   display: "flex",
  //   justifyContent: "center",
  //   flexDirection: "column",
  //   alignItems: "center",
  // },
  chatWrapper: {
    position: "relative",
    height: "100%",
    width: "100%",
  },
  message: {
    padding: 5,
    margin: "10px 5px",
    animation: "fadeIn 0.3s 1",
    color: "#000",
    background: "#fff",
    width: "fit-content",
    transition: "all 0.2s",
    ...theme.card,
  },
  system: {
    // ...theme.system,
    // background: theme.palette.secondary.main,
    // color: theme.palette.secondary.contrastText,
    ...theme.moderator,
  },
  notification: {
    padding: 5,
    margin: "10px 5px",
    animation: "fadeIn 0.3s 1",
    color: "#000",
    background: "#fff",
    width: "fit-content",
    transition: "all 0.2s",
  },
  chat2: {
    position: "absolute",
    height: "calc(100% - 129px);",
    width: "100%",
  },
  chatBar: {
    display: "flex",
    justifyContent: "flex-end",
  },
  chatMenu: {
    minWidth: 250,
    height: "calc(100vh - 64px) !important",
    [theme.breakpoints.down("sm")]: {
      marginBottom: 50,
      maxHeight: 250,

      width: "100% !important",
    },
  },
  shouldScroll: {
    background: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    margin: "-32px 5px 0",
    position: "relative",
    padding: 5,
    display: "flex",
    justifyContent: "center",
    opacity: 0,
    transition: "opacity 0.2s",
  },
  active: {
    opacity: 1,
    cursor: "pointer",
  },
  defaultChip: {
    background: grey[300],
    color: "#000",
  },
  iframe: {
    position: "absolute",
    height: "calc(100vh - 64px)",
    [theme.breakpoints.down("sm")]: {
      height: "100%",
      minHeight: 300,
      position: "static",
    },
  },
  bannedMenuWrapper: {
    width: "100%",
    height: "100%",
    padding: 15,
  },
  bannedMenu: {
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    height: "100%",
    // margin: 15,
  },
  highlight: {
    color: theme.highlight.color,
    // fontWeight: 500,
  },

  highlightMsg: {
    background: theme.highlight.background,
  },
  cta: {
    color: theme.cta.ctaText,
  },
  ctaButton: {
    ...theme.cta,
  },
  icon: {
    color: theme.palette.secondary.main,
  },
  chatbox: {
    background: theme.palette.primary.main,
  },
  chatboxInput: {
    height: 38,
    fontSize: "0.875rem",
    color: theme.palette.primary.contrastText,
    padding: 5,
    background: theme.palette.primary.light,
  },
  poll: { ...theme.card },
  pollOption: {
    paddingBottom: 10,
  },

  tier1: { ...theme.tier1 },
  tier2: { ...theme.tier2 },
  tier3: { ...theme.tier3 },
  tier4: { ...theme.tier4 },
  tier5: { ...theme.tier5 },
  admin: { ...theme.admin },
  moderator: { ...theme.moderator },
}));

const emotes = {
  monkaS: (
    <img
      style={{
        margin: "0 5px -7px 0",
        padding: "3px",
        borderRadius: "50%",
        background: "#fff",
      }}
      src='https://cdn.betterttv.net/emote/56e9f494fff3cc5c35e5287e/1x'
    />
  ),
  PepeHands: (
    <img
      style={{
        margin: "0 5px -7px 0",
      }}
      src='https://cdn.betterttv.net/emote/59f27b3f4ebd8047f54dee29/1x'
    />
  ),
  OMEGALUL: (
    <img
      style={{
        margin: "0 5px -7px 0",
      }}
      src='https://cdn.betterttv.net/emote/583089f4737a8e61abb0186b/1x'
    />
  ),
};
