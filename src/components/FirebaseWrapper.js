import firebase from "./firebase";
import React, { useState, useEffect } from "react";

export const FirebaseContext = React.createContext({});
export const FirebaseConsumer = FirebaseContext.Consumer;
export const FirebaseProvider = FirebaseContext.Provider;

const FirebaseWrapper = ({ children }) => {
  const auth = firebase.auth();
  const GoogleProvider = new firebase.auth.GoogleAuthProvider();
  const [userStatus, setUserStatus] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        setUserStatus(true);
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

  return (
    <FirebaseProvider value={{ googleSignin, userStatus, signOut }}>
      {children}
    </FirebaseProvider>
  );
};

export default FirebaseWrapper;
