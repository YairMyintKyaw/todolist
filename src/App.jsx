import React, { useEffect } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import {
  createUserDocumentFormAuth,
  getToDoList,
  onAuthStateChangedListener,
} from "./Utils/Firebase/firebase.util";
import { useDispatch } from "react-redux";
import { setUserInfo } from "./Store/userSlice";
import HomeMedium from "./Medium/Home.medium";
import DashboardMedium from "./Medium/Dashboard.medium";
import Todolist from "./Components/Todolist.component";
import Home from "./Components/Home.compoent";
import { toggleLoading } from "./Store/dashboardSlice";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChangedListener(async (userAuth) => {
      try {
        if (userAuth) {
          const { email, uid } = userAuth;
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
        alert(error);
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
      </Routes>
    </div>
  );
};

export default App;
