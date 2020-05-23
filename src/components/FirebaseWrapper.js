import firebase, { firestore, database } from "./firebase";
import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import generateRandomAnimalName from "random-animal-name-generator";
import { withSnackbar } from "notistack";
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
  useEffect(() => {
    // setDummyMessages();

    auth.onAuthStateChanged((user) => {
      if (user) {
        // firebase.functions().httpsCallable("makeAdmin")();
        // banUser("ALOPjqekzqUlsZQSTdeYMMXdEjL2", 1 * 3.6e6 + Date.now());
        // forceTokenRefresh();
        // banUser("ALOPjqekzqUlsZQSTdeYMMXdEjL2", "1m");
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
  //-----------------------------------------------Ban Methods
  const banUser = async (username, time = "12h") => {
    const initialTime = time;
    const unit = time.slice(-1);
    time = time.slice(0, -1);
    if (unit === "h") {
      time *= 3.6e6;
    } else if (unit === "m") {
      time *= 60000;
    } else if (unit === "d") {
      time *= 8.64e7;
    }

    time += Date.now();

    const uid = await firestore
      .collection("usernames")
      .doc(username.toLowerCase())
      .get()
      .then((doc) => {
        if (doc.exists) {
          return doc.data().uid;
        } else return false;
      });
    console.log(uid);
    if (!uid) {
      console.log("user not found");
      return;
    }

    isUserMod().then((bool) => {
      if (bool) {
        firebase.database().ref(`banlist/${uid}`).set({ time });
        const message =
          time > Date.now()
            ? `${username} is banned for ${initialTime}`
            : `${username} is unbanned`;
        addMessage(message, "", "system");
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

  const addMessage = (
    text,
    username = userInfo.username,
    type = userInfo.role || userInfo.sub
  ) => {
    // forceTokenRefresh();
    const key = database.ref("/chat").push().key;
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
    fetchUsername().then((username) => {
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
  const changedUserInUserList = (val) => {
    //null for delete, true to add user
    fetchUsername().then((username) => {
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
      const doc = await firestore
        .collection("users")
        .doc(auth.currentUser.uid)
        .get();
      return doc.data().username;
    } else {
      return false;
    }
  };

  const registeredUser = async (username) => {
    let error = false;

    const batch = firestore.batch();
    const usersRef = firestore.collection("users").doc(auth.currentUser.uid);
    const usernamesRef = firestore
      .collection("usernames")
      .doc(username.toLowerCase());
    batch.set(usersRef, { username, role: null, sub: null });
    batch.set(usernamesRef, { taken: true, uid: auth.currentUser.uid });

    usernamesRef.get().then((doc) => {
      if (doc.exists) {
        enqueueSnackbar("Username already taken");
        error = true;
      } else {
        usersRef.get().then((doc) => {
          if (doc.exists) {
            enqueueSnackbar("User is already registered");
            error = true;
          } else {
            batch.commit().then(() => {
              getUserInfo();
              history.push("/live");
            });
          }
        });
      }
    });
    return error;
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
          variant: "success",
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
        .then((doc) => {
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
        generateRandomAnimalName().split(" ").join("").slice(0, 12) +
        Math.floor(Math.random() * 500);
      const text =
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
      addMessage(text, username, type);
    }
  };

  return (
    <FirebaseProvider
      value={{
        banUser,
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
        changedUserInUserList,
        registeredUser,
        userBanned,
        banUser,
        setUserBanned,
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
  "",
];
