import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import uuid from "react-uuid";

const firebaseConfig = {
  apiKey: "AIzaSyCTA_Vvv0mR5_16RXRlH1xiWWk3iabaPkM",
  authDomain: "todolist-fd8cc.firebaseapp.com",
  projectId: "todolist-fd8cc",
  storageBucket: "todolist-fd8cc.appspot.com",
  messagingSenderId: "148398027522",
  appId: "1:148398027522:web:d9096530acc3333159081b",
  measurementId: "G-HRV6P08F7Y",
};

initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

export const signInAuthWithEmailAndPassword = async (email, password) => {
  if (!email && !password) return;

  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    return error.code;
  }
};

export const createAuthWithEmailAndPassword = async (email, password, name) => {
  try {
    if (!email && !password) return;

    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await updateProfile(auth.currentUser, { displayName: name });
  } catch (error) {
    return error.code;
  }
};

export const signOutUser = () => signOut(auth);

export const db = getFirestore();

export const addToDoList = async (uid, toDoList) => {
  const docRef = doc(db, "todolist", uid);
  return await setDoc(docRef, toDoList);
};

export const createUserDocumentFormAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createAt = new Date();

    try {
      return await Promise.all([
        setDoc(userDocRef, {
          displayName,
          email,
          createAt,
        }),
        addToDoList(userAuth.uid, {
          Project: [
            {
              id: uuid(),
              name: "This is Not Started Phase",
              updatedTime: Date.now(),
              description:
                "You can put not started task here. Click the new task and fill the task title to create new task. You can drag and drop the task to change the phase of the task. ",
              state: "not started",
            },
            {
              id: uuid(),
              name: "This is in progress Phase ",
              updatedTime: Date.now(),
              description:
                "You can put in progress task here. Click the new task and fill the task title to create new task. You can drag and drop the task to change the phase of the task.",
              state: "in progress",
            },
            {
              id: uuid(),
              name: "This is Finished Phase",
              updatedTime: Date.now(),
              description:
                "You can put finished task here. Click the new task and fill the task title to create new task. You can drag and drop the task to change the phase of the task.",
              state: "done",
            },
          ],
        }),
      ]);
    } catch (error) {
      alert(error.message);
      return error.message;
    }
  }
};

export const onAuthStateChangedListener = (callBack) =>
  onAuthStateChanged(auth, callBack);

export const getToDoList = async (uid) => {
  const docRef = doc(db, "todolist", uid);
  const docSnapshot = await getDoc(docRef);

  if (docSnapshot.exists()) {
    return await docSnapshot.data();
  } else {
    console.log("No Document");
    return null;
  }
};

export const sendVerificationMail = () => {
  return sendEmailVerification(auth.currentUser);
};

export const sendResetPasswordMail = (email) => {
  return sendPasswordResetEmail(auth, email);
};
