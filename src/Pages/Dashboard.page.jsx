import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../Components/NavBar.component";
import { useSelector } from "react-redux";
import AddProjectModal from "../Components/AddProjectModal.component";

const Dashboard = () => {
  const { isAddTaskModalOn, isAddProjectModalOn } = useSelector(
    (state) => state.dashboard
  );

  return (
    <div className="flex bg-primary">
      <NavBar />
      <div className="flex-1 flex flex-col text-secondary ">{<Outlet />}</div>
      {isAddProjectModalOn && <AddProjectModal />}
    </div>
  );
};

export default Dashboard;
