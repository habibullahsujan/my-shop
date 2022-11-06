import React, { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import app from "../Utility/firebase.init";

export const AuthContext = createContext([]);
const auth = getAuth(app);

const UserContext = ({ children }) => {
  const googleAuthProvider = new GoogleAuthProvider();

  const [user, setUser] = useState(null);
  const [loader, setLoader]=useState(true)
  const createAccountUsingEmail = (email, password) => {
    setLoader(true)
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const signInWithEmail = (email, password) => {
    setLoader(true)
    return signInWithEmailAndPassword(auth, email, password);
  };
  const signInUsingGoogle = () => {
    setLoader(true)
    return signInWithPopup(auth, googleAuthProvider);
  };
  const logOut=()=>{
    setLoader(true)
    return signOut(auth)
  }
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoader(false)
    });
    return () => {
      unsubscribe();
    };
  }, []);
  const userInfo = {
    createAccountUsingEmail,
    user,
    signInWithEmail,
    signInUsingGoogle,
    logOut,
    loader
    
  };

  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default UserContext;
