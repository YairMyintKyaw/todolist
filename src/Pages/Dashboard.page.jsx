import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../Components/NavBar.component";
import { useSelector } from "react-redux";
import AddProjectModal from "../Components/AddProjectModal.component";
import EditProjectModal from "../Components/EditProjectModal.component";

const Dashboard = () => {
  const { isAddProjectModalOn, editProject } = useSelector(
    (state) => state.dashboard
  );

  return (
    <div className="flex bg-primary h-screen ">
      <NavBar />
      <div className="flex-1 flex flex-col text-secondary">{<Outlet />}</div>
      {isAddProjectModalOn && <AddProjectModal />}
      {editProject.isEditProjectModalOn && <EditProjectModal />}
    </div>
  );
};

export default Dashboard;
