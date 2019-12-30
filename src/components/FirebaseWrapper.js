import firebase, { firestore } from "./firebase";
import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";

export const FirebaseContext = React.createContext({});
export const FirebaseConsumer = FirebaseContext.Consumer;
export const FirebaseProvider = FirebaseContext.Provider;

const FirebaseWrapper = ({ children, history }) => {
  const auth = firebase.auth();
  const GoogleProvider = new firebase.auth.GoogleAuthProvider();
  const [userStatus, setUserStatus] = useState(null);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
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

  const getUserInfo = () => {
    if (auth.currentUser) {
      firebase
        .firestore()
        .collection("users")
        .doc(auth.currentUser.uid)
        .get()
        .then(doc => {
          if (doc.exists) {
            const { username } = doc.data();
            setUserStatus(true);
            setUserInfo({ username });
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

  return (
    <FirebaseProvider
      value={{ googleSignin, userStatus, signOut, getUserInfo }}
    >
      {children}
    </FirebaseProvider>
  );
};

export default withRouter(FirebaseWrapper);
