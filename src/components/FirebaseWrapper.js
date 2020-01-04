import firebase, { firestore, database } from "./firebase";
import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import generateRandomAnimalName from "random-animal-name-generator";
import { withSnackbar } from "notistack";
import { red } from "@material-ui/core/colors";
import { Button } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";

export const FirebaseContext = React.createContext({});
export const FirebaseConsumer = FirebaseContext.Consumer;
export const FirebaseProvider = FirebaseContext.Provider;

const FirebaseWrapper = ({ children, history, enqueueSnackbar }) => {
  const auth = firebase.auth();
  const GoogleProvider = new firebase.auth.GoogleAuthProvider();
  const [userStatus, setUserStatus] = useState(null);
  const [userInfo, setUserInfo] = useState({});
  const [chatMessages, setChatMessages] = useState([]);
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    // setDummyMessages();

    setInterval(() => {
      const { text, action } = messageArr[
        Math.floor(Math.random() * messageArr.length)
      ];
      enqueueSnackbar(text, { action });
    }, 900000);
  }, []);

  useEffect(() => {
    // setDummyMessages();
    auth.onAuthStateChanged(user => {
      if (user) {
        getUserInfo();
      } else {
        setUserStatus(false);
      }
    });
  }, []);

  const googleSignin = () => {
    return firebase.auth().signInWithPopup(GoogleProvider);
  };

  const signOut = () => {
    history.push("/");
    return auth.signOut();
  };

  const addMessage = (
    text,
    username = userInfo.username,
    type = userInfo.role || userInfo.sub
  ) => {
    const key = database.ref("/chat").push().key;
    database.ref("/chat").update({ [key]: { username, text, key, type } });
  };

  const chatTurnedOn = () => {
    database.ref("/chat").on("value", snapshot => {
      if (snapshot.exists()) {
        setChatMessages(Object.values(snapshot.val()));
      }
    });
    database.ref("/chatUserList").on("value", snapshot => {
      if (snapshot.exists()) {
        setUserList(Object.keys(snapshot.val()));
      }
    });
    fetchUsername().then(username => {
      database
        .ref("/chatUserList")
        .onDisconnect()
        .update({ [username]: null });
    });
  };
  const chatTurnedOff = () => {
    database.ref("/chat").off();
    database.ref("/chatUserList").off();
  };
  const changedUserInUserList = val => {
    //null for delete, true to add user
    fetchUsername().then(username => {
      if (username) {
        database.ref("/chatUserList").update({ [userInfo.username]: val });
      }
    });
  };

  useEffect(() => {
    // if (userStatus !== null && userInfo.username !== undefined) {
    //   addUserToUserList();
    // }
  });

  const fetchUsername = async () => {
    if (userStatus) {
      const doc = await firestore
        .collection("users")
        .doc(auth.currentUser.uid)
        .get();
      return doc.data().username;
    } else {
      return false;
    }
  };

  const giveSubscription = (subTier, uid) => {
    if (uid) {
    } else {
      if (auth.currentUser) {
        firestore
          .collection("users")
          .doc(auth.currentUser.uid)
          .update({ sub: `tier${subTier}` });
        getUserInfo();
        enqueueSnackbar(`You became a tier ${subTier} sub! Congratz!!`, {
          variant: "success"
        });
      }
    }
  };

  const getUserInfo = () => {
    if (auth.currentUser) {
      firebase
        .firestore()
        .collection("users")
        .doc(auth.currentUser.uid)
        .get()
        .then(doc => {
          if (doc.exists) {
            const { username, sub, role } = doc.data();
            setUserStatus(true);
            setUserInfo({ username, sub, role });
          } else {
            history.push("/profile");
            enqueueSnackbar(
              "Must create a username for your account to continue"
            );
            setUserStatus(false);
          }
        });
    } else {
      enqueueSnackbar("no user signed in");
    }
  };

  const setDummyMessages = () => {
    database.ref("chat").set(null);
    for (let i = 0; i < 101; i++) {
      const type = typeArray[Math.floor(Math.random() * typeArray.length)];
      const username =
        generateRandomAnimalName()
          .split(" ")
          .join("")
          .slice(0, 12) + Math.floor(Math.random() * 500);
      const text =
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
      addMessage(text, username, type);
    }
  };

  return (
    <FirebaseProvider
      value={{
        googleSignin,
        userInfo,
        userList,
        userStatus,
        signOut,
        getUserInfo,
        chatTurnedOn,
        chatMessages,
        addMessage,
        chatTurnedOff,
        giveSubscription,
        changedUserInUserList
      }}
    >
      {children}
    </FirebaseProvider>
  );
};

export default withSnackbar(withRouter(FirebaseWrapper));
const typeArray = [
  "tier1",
  "tier1",
  "tier1",
  "tier2",
  "tier3",
  "tier4",
  "tier5",
  "tier1",
  "tier1",
  "tier1",
  "tier2",
  "tier3",
  "tier4",
  "moderator",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  ""
];
const messageArr = [
  {
    text: "twitter.com/mockrabbit",
    action: (
      <Button variant='contained' color='primary'>
        Follow Me
      </Button>
    )
  },
  {
    text: "Join the Discord",
    action: (
      <Button variant='contained' color='primary'>
        Join Here
      </Button>
    )
  },
  {
    text: "twitch.tv/mockrabbit",
    action: (
      <Button variant='contained' color='primary'>
        Follow Me
      </Button>
    )
  },
  {
    text: "facebook.com/mockrabbit",
    action: (
      <Button variant='contained' color='primary'>
        Follow Me
      </Button>
    )
  },
  {
    text: "Support the Stream",
    action: (
      <Button variant='contained' startIcon={<FavoriteIcon />} color='primary'>
        Subscribe
      </Button>
    )
  },
  {
    text: "Support the Stream",
    action: (
      <Button variant='contained' startIcon={<FavoriteIcon />} color='primary'>
        Donate
      </Button>
    )
  }
];
