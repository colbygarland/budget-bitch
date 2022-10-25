import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import Router from 'next/router';
import { setAuthCookie } from './auth/authCookie';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

// Auth
export const firebaseAuthProvider = new GoogleAuthProvider();
export const firebaseAuth = getAuth(firebaseApp);

// TODO: handle errors from login gracefully
export const googleLogin = async () => {
  const response = await signInWithPopup(firebaseAuth, firebaseAuthProvider);
  const { user } = response;
  // Ensure this user is authorized to use this app
  // comes in as [userId, anotherUserId]
  const authorizedUsers = JSON.parse(process.env.NEXT_PUBLIC_AUTHORIZED_USERS as string);

  console.log(user);
  console.log(authorizedUsers);

  if (authorizedUsers?.includes(user.uid)) {
    // Save our state to a cookie
    setAuthCookie(user);
    // Redirect to the home page
    Router.replace('/');
    return true;
  }

  return false;
};
