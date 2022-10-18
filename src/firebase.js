import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword
} from "firebase/auth";
import { useState, useEffect } from "react";
const firebaseConfig = {
  apiKey: "AIzaSyBOZsnXzInAybo0ilZ86g0PtlbbX3YPhE0",
  authDomain: "fir-auth-d5277.firebaseapp.com",
  projectId: "fir-auth-d5277",
  storageBucket: "fir-auth-d5277.appspot.com",
  messagingSenderId: "1026394003529",
  appId: "1:1026394003529:web:27299b44b3209ba3aa0798"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

export function signup(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function logOut() {
  return signOut(auth);
}

// Custom Hook
export function useAuth() {
  const [cuttentUser, setCurrentUser] = useState("");
  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => setCurrentUser(user));
    return unSub;
  }, []);
  return cuttentUser;
}
