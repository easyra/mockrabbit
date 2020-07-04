import firebase, { firestore, database } from "./firebase";
import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import generateRandomAnimalName from "random-animal-name-generator";
import { withSnackbar } from "notistack";
import Axios from "axios";
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
  const [initialKey, setInitialKey] = useState(null);
  const [userBanned, setUserBanned] = useState(null);
  const [poll, setPoll] = useState(null);
  const [pollTimer, setPollTimer] = useState(100);
  useEffect(() => {
    // setDummyMessages();
    firebase.functions().httpsCallable("makeAdmin")();
    auth.onAuthStateChanged((user) => {
      if (user) {
        getUserInfo();
        checkUserBan();
      } else {
        setUserStatus(false);
      }
    });
  }, []);

  //-------------------------------------------------------Auth/Login/Register Methods

  const googleSignin = () => {
    return firebase.auth().signInWithPopup(GoogleProvider);
  };

  const isUserMod = async (uid) => {
    // checks the claims on the signed in user's auth token claims
    // forceTokenRefresh();
    return await firebase
      .auth()
      .currentUser.getIdTokenResult()
      .then((idTokenResult) => {
        console.log(idTokenResult.claims);
        return !!idTokenResult.claims.mod || !!idTokenResult.claims.admin;
      });
  };
  const forceTokenRefresh = () => {
    firebase.auth().currentUser.getIdToken(true);
  };
  //-------------------------------------------------Poll Methods
  const addPoll = async (question, options) => {
    const expire = 1000 * 60;

    if (isUserMod()) {
      database
        .ref("/poll")
        .set({
          question,
          options,
          expired: false,
          voted: { start: true },
        })
        .then((err) => console.log(err))
        .catch((err) => console.log(err));
    }
  };

  const voteInPoll = (votedOption) => {
    const uid = auth.currentUser.uid;

    if (!poll.userVoted) {
      database.ref("poll/voted").update({ [uid]: votedOption });
    }
  };

  useEffect(() => {
    firebase
      .database()
      .ref("poll")
      .on("value", async (snapshot) => {
        if (snapshot.exists()) {
          let poll = snapshot.val();
          poll.userVoted =
            auth.currentUser &&
            poll.voted &&
            !!poll.voted[auth.currentUser.uid];
          setPoll(poll);
        } else {
          setPoll(null);
        }
      });
  }, []);

  //-----------------------------------------------Ban Methods
  const banUser = async (username, time = "12h") => {
    let unit = time.slice(-1);
    time = time.slice(0, -1);
    const initialTime = time;
    if (unit === "h") {
      time *= 3.6e6;
      unit = "hours";
    } else if (unit === "m") {
      time *= 60000;
      unit = "minutes";
    } else if (unit === "d") {
      time *= 8.64e7;
      unit = "days";
    }

    time += Date.now();
    let uid = null;

    await database
      .ref("usernames/" + username.toLowerCase() + "/uid")
      .once("value")
      .then((snapshot) => {
        uid = snapshot.val();
      });

    isUserMod().then((bool) => {
      if (bool) {
        if (uid) {
          firebase.database().ref(`banlist/${uid}`).set({ time });

          const message =
            time > Date.now()
              ? `${username} is banned for ${initialTime} ${unit}`
              : `${username} is unbanned`;
          addMessage(message, "system");
        } else {
          addMessage("User not found", "system");
        }
      } else {
        console.log("lacking permissions");
      }
    });
  };

  const checkUserBan = () => {
    //checks if user's uid is on list on the database
    const uid = firebase.auth().currentUser.uid;
    database.ref(`banlist/${uid}`).on("value", async (snapshot) => {
      const timestamp = Date.now();

      if (
        snapshot.exists() &&
        snapshot.val().time >= timestamp &&
        !(await isUserMod())
      ) {
        setUserBanned(snapshot.val().time - Date.now());
        setTimeout(() => {
          setUserBanned(false);
          console.log("userbanned", snapshot.val().time);
        }, snapshot.val().time - timestamp + 1000);
      } else {
        setUserBanned(false);
      }
    });
  };

  // const c

  const signOut = () => {
    history.push("/");
    return auth.signOut();
  };

  //----------------------------------Chat Methods

  const addMessage = (text, type) => {
    // forceTokenRefresh();
    const key = database.ref("/chat").push().key;
    const { role, sub, username } = userInfo;
    if (!type) {
      if (role !== "default") {
        type = role;
      } else if (sub > 0) {
        type = "tier" + sub;
      } else {
        type = "default";
      }
    }

    database
      .ref("/chat")
      .update({
        [key]: {
          username,
          text,
          key,
          type,
          uid: auth.currentUser.uid,
        },
      })
      .catch((err) => {
        checkUserBan();
      });
  };

  const chatTurnedOn = () => {
    const key = initialKey || database.ref("/chat").push().key;
    if (!initialKey) {
      setInitialKey(database.ref("/chat").push().key);
    }

    database
      .ref("/chat")
      .orderByKey()
      .startAt(key)
      .on("value", (snapshot) => {
        if (snapshot.exists()) {
          setChatMessages(Object.values(snapshot.val()));
        }
      });
    database.ref("/chatUserList").on("value", (snapshot) => {
      if (snapshot.exists()) {
        setUserList(Object.keys(snapshot.val()));
      }
    });
    database
      .ref("/chatUserList")
      .onDisconnect()
      .update({ [userInfo.username]: null });
  };
  const chatTurnedOff = () => {
    database.ref("/chat").off();
    database.ref("/chatUserList").off();
  };
  const changedUserInUserList = (val) => {
    //null for delete, true to add user
    if (userInfo.username) {
      database.ref("/chatUserList").update({ [userInfo.username]: val });
    }
  };

  useEffect(() => {
    // if (userStatus !== null && userInfo.username !== undefined) {
    //   addUserToUserList();
    // }
  });

  useEffect(() => {
    // const x = setInterval(() => {
    //   if (userBanned >= Date.now()) {
    //     setUserBanned(userBanned - Date.now());
    //   } else {
    //     setUserBanned(false);
    //   }
    // }, 1000);
    // if (!userBanned) {
    //   clearInterval(x);
    // }
  }, [userBanned]);

  const fetchUsername = async () => {
    if (userStatus) {
      return firebase.database().ref(`users/${userBanned.username}`);
    } else {
      return false;
    }
  };

  const registeredUser = async (username) => {
    Axios.post(
      `https://us-central1-mockrabbittv.cloudfunctions.net/api/registerUser/${auth.currentUser.uid}/${username}`
    ).then(({ data }) => {
      enqueueSnackbar(data.message, {
        variant: data.registered ? "success" : "error",
      })
    });
  };
  const giveSubscription = async (subTier) => {
    const subscribe = firebase.functions().httpsCallable("giveSubscription");
    return subscribe({ uid: auth.currentUser.uid, sub: subTier });
  };

  const getUserInfo = () => {
    console.log("reached");
    if (auth.currentUser) {
      console.log("reached1");
      console.log(auth.currentUser.uid);

      firebase
        .database()
        .ref(`users/${auth.currentUser.uid}`)
        .on("value", (snapshot) => {
          if (snapshot.exists()) {
            const userInfo = snapshot.val();
            if (userInfo.logs) {
              userInfo.logs = Object.values(userInfo.logs);
            }
            setUserStatus(true);
            setUserInfo(userInfo);
          } else {
            history.push("/profile");
            enqueueSnackbar(
              "Must create a username for your account to continue"
            );
            setUserStatus(false);
          }
        });
    } else {
      // setUserStatus(false);
    }
  };
  return (
    <FirebaseProvider
      value={{
        banUser,
        googleSignin,
        userInfo,
        userList,
        poll,
        userStatus,
        signOut,
        getUserInfo,
        chatTurnedOn,
        chatMessages,
        addMessage,
        chatTurnedOff,
        giveSubscription,
        changedUserInUserList,
        registeredUser,
        userBanned,
        banUser,
        setUserBanned,
        enqueueSnackbar,
        addPoll,
        voteInPoll,
        pollTimer,
      }}
    >
      {children}
    </FirebaseProvider>
  );
};
export default withSnackbar(withRouter(FirebaseWrapper));
