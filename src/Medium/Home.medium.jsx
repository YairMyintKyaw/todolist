import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Signin_signup from "../Pages/Signin_signup.page";

const HomeMedium = () => {
  const { uid } = useSelector((state) => state.user);
  return <>{!uid ? <Signin_signup /> : <Navigate to="/dashboard" />}</>;
};

export default HomeMedium;
