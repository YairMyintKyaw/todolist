import React from "react";
import { useSelector } from "react-redux";
import Dashboard from "../Pages/Dashboard.page";
import { Navigate } from "react-router-dom";

const DashboardMedium = () => {
  const { uid } = useSelector((state) => state.user);
  return <>{!uid ? <Navigate to="/" /> : <Dashboard />}</>;
};

export default DashboardMedium;
