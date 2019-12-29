import firebase from "./firebase";
import React from "react";

export const FirebaseContext = React.createContext({});
export const FirebaseConsumer = FirebaseContext.Consumer;
export const FirebaseProvider = FirebaseContext.Provider;

const FirebaseWrapper = ({ children }) => {
  const GoogleProvider = new firebase.auth.GoogleAuthProvider();
  const googleSignin = () => {
    firebase
      .auth()
      .signInWithPopup(GoogleProvider)
      .then()
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <FirebaseProvider value={{ googleSignin }}>{children}</FirebaseProvider>
  );
};

export default FirebaseWrapper;
