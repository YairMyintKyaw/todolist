import React, { useEffect } from "react";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import {
  createUserDocumentFormAuth,
  getToDoList,
  onAuthStateChangedListener,
  sendVerificationMail,
} from "./Utils/Firebase/firebase.util";
import { useDispatch } from "react-redux";
import { setUserInfo } from "./Store/userSlice";
import HomeMedium from "./Medium/Home.medium";
import DashboardMedium from "./Medium/Dashboard.medium";
import Todolist from "./Components/Todolist.component";
import Home from "./Components/Home.compoent";
import { setErrorMessage, toggleLoading } from "./Store/dashboardSlice";
import EmailVerified from "./Pages/EmailVerified.page";

const App = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  useEffect(() => {
    onAuthStateChangedListener(async (userAuth) => {
      dispatch(toggleLoading(true));
      try {
        if (userAuth) {
          const { email, uid } = userAuth;
          if (!userAuth.emailVerified) {
            sendVerificationMail();
            nav("/verification");
            dispatch(toggleLoading(false));
            return;
          }
          await createUserDocumentFormAuth(userAuth);
          const todoList = await getToDoList(uid);
          dispatch(
            setUserInfo({
              displayName: userAuth.displayName,
              email,
              uid,
              todoList,
            })
          );
          dispatch(
            setErrorMessage({
              signInError: false,
              emailInvalid: "",
            })
          );
        } else {
          dispatch(
            setUserInfo({
              displayName: "",
              uid: "",
              email: "",
              todoList: {},
            })
          );
        }
      } catch (error) {
        console.log(error);
      }
      dispatch(toggleLoading(false));
    });
  }, []);

  return (
    <div className="font-rubik">
      <Routes>
        <Route path="/" element={<HomeMedium />} />
        <Route path="/dashboard" element={<DashboardMedium />}>
          <Route index element={<Home />} />
          <Route path="todolist/:project" element={<Todolist />} />
        </Route>
        <Route path="/verification" element={<EmailVerified />} />
      </Routes>
    </div>
  );
};

export default App;
