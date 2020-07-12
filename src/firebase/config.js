import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "****************",
    authDomain: "****************",
    databaseURL: "****************",
    projectId: "****************",
    storageBucket: "****************",
    messagingSenderId: "****************",
    appId: "****************",
  };

  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore;
  const auth = firebase.auth;
  
  export { db, auth, firebase};

