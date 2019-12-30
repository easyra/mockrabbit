import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAeTg9BYfUdGWXsRWeDLZzXgCnHT2kRgNo",
  authDomain: "mockrabbittv.firebaseapp.com",
  databaseURL: "https://mockrabbittv.firebaseio.com",
  projectId: "mockrabbittv",
  storageBucket: "mockrabbittv.appspot.com",
  messagingSenderId: "508829146893",
  appId: "1:508829146893:web:f05334b20a624a293d9a44",
  measurementId: "G-RL8XZPX8CL"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

export default firebase;
export const database = firebase.database();
export const firestore = firebase.firestore();
export const auth = firebase.auth();
