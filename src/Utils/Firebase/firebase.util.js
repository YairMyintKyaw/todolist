import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import {
  doc,
  getDoc,
  getFirestore,
  setDoc,
} from "firebase/firestore";
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
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    console.log(e);
  }
};

export const createAuthWithEmailAndPassword = async (email, password, name) => {
  if (!email && !password) return;
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(auth.currentUser, { displayName: name });

  return user;
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
              name: "Task title",
              updatedTime: Date.now(),
              description:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
              state: "not started",
            },
            {
              id: uuid(),
              name: "Task title 2",
              updatedTime: Date.now(),
              description:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
              state: "in progress",
            },
            {
              id: uuid(),
              name: "Task title 3",
              updatedTime: Date.now(),
              description:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
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
