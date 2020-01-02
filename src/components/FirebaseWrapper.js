import firebase, { firestore, database } from "./firebase";
import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import generateRandomAnimalName from "random-animal-name-generator";

export const FirebaseContext = React.createContext({});
export const FirebaseConsumer = FirebaseContext.Consumer;
export const FirebaseProvider = FirebaseContext.Provider;

const FirebaseWrapper = ({ children, history }) => {
  const auth = firebase.auth();
  const GoogleProvider = new firebase.auth.GoogleAuthProvider();
  const [userStatus, setUserStatus] = useState(null);
  const [userInfo, setUserInfo] = useState({});
  const [chatMessages, setChatMessages] = useState([]);

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
    return auth.signOut();
  };

  const addMessage = (username, text, type = "") => {
    const key = database.ref("/chat").push().key;
    database.ref("/chat").update({ [key]: { username, text, key, type } });
  };

  const chatTurnedOn = () => {
    database.ref("/chat").on("value", snapshot => {
      if (snapshot.exists()) {
        setChatMessages(Object.values(snapshot.val()));
      }
    });
  };
  const chatTurnedOff = () => {
    database.ref("/chat").off();
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
            const { username, type } = doc.data();
            setUserStatus(true);
            setUserInfo({ username, type });
          } else {
            history.push("/profile");
            alert("Must create a username for your account to continue");
            setUserStatus(false);
          }
        });
    } else {
      console.log("no user signed in");
    }
  };

  const setDummyMessages = () => {
    database.ref("chat").set(null);
    for (let i = 0; i < 51; i++) {
      const type = typeArray[Math.floor(Math.random() * typeArray.length)];
      const username =
        generateRandomAnimalName()
          .split(" ")
          .join("")
          .slice(0, 12) + Math.floor(Math.random() * 500);
      const text =
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
      addMessage(username, text, type);
    }
  };

  return (
    <FirebaseProvider
      value={{
        googleSignin,
        userInfo,
        userStatus,
        signOut,
        getUserInfo,
        chatTurnedOn,
        chatMessages,
        addMessage,
        chatTurnedOff
      }}
    >
      {children}
    </FirebaseProvider>
  );
};

export default withRouter(FirebaseWrapper);
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
  ""
];
