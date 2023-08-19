import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AiOutlineHome, AiOutlineEdit } from "react-icons/ai";
import { GoProject } from "react-icons/go";
import { FaPlus } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import {
  setEditProject,
  toggleAddProjectModal,
  toggleNavBar,
  toggleProjectDropdown,
} from "../Store/dashboardSlice";
import uuid from "react-uuid";
import { updateTodoList } from "../Store/userSlice";
import { addToDoList } from "../Utils/Firebase/firebase.util";
import Swal from "sweetalert2";

const Nav = () => {
  const { isNavBarOn, isProjectDropdownOn, editProject } = useSelector(
    (state) => state.dashboard
  );
  const { todoList, uid } = useSelector((state) => state.user);
  const projects = todoList && Object.keys(todoList);
  const dispatch = useDispatch();
  const nav = useNavigate();
  const toggleDropdown = () => {
    dispatch(toggleNavBar(true));
    dispatch(toggleProjectDropdown(!isProjectDropdownOn));
  };

  const openProjectModal = () => {
    dispatch(toggleAddProjectModal());
  };

  const deleteSpecificProject = (project, e) => {
    const newTodoList = JSON.parse(JSON.stringify(todoList));
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1d3557",
      cancelButtonColor: "#e63946",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your project has been deleted.", "success");
        nav("");
        delete newTodoList[project];
        dispatch(updateTodoList(newTodoList));
        addToDoList(uid, newTodoList);
      }
    });
  };

  const enableEditProject = (project, e) => {
    dispatch(
      setEditProject({ isEditProjectModalOn: true, editedProject: project })
    );
  };

  return (
    <nav className="flex flex-col flex-1">
      {/* home tab */}
      <NavLink
        to={""}
        className="p-5 flex items-center justify-center hover:bg-primary hover:text-secondary transition-colors duration-200 bg-inherit "
        end
      >
        {isNavBarOn && <span className="mr-2 text-xl">Home</span>}
        <AiOutlineHome className="text-2xl" />
      </NavLink>

      {/* projects */}
      {/* Project toggle tab */}
      <div
        className="p-5 flex items-center justify-center hover:bg-primary hover:text-secondary transition-colors duration-200 bg-inherit cursor-pointer"
        onClick={toggleDropdown}
      >
        {isNavBarOn && <span className="mr-2 text-xl">Project</span>}
        <GoProject className="text-2xl " />
      </div>
      {/* project container */}
      <div
        className={`${
          isProjectDropdownOn ? "flex" : "hidden"
        }  flex-1 flex-col items-center mb-5 justify-start overflow-hidden`}
      >
        {/* projects will be here  */}
        <div className="flex flex-col my-2 px-3  w-full">
          {projects?.sort().map((project) => (
            <div
              key={uuid()}
              className="relative group max-w-[90%] w-[90%] mx-auto flex items-center justify-center hover:justify-between py-2 px-5 mb-2 text-start rounded  border  hover:bg-primary hover:text-secondary transition-colors duration-200"
            >
              <NavLink
                to={`todolist/${project}`}
                className="flex-1  cursor-pointer overflow-hidden"
                style={{ wordWrap: "break-word" }}
              >
                {project}
              </NavLink>
              <span
                onClick={enableEditProject.bind(null, project)}
                className="group-hover:inline-block hidden text-2xl hover:scale-125 transition-transform cursor-pointer"
              >
                <AiOutlineEdit />
              </span>
              <span
                onClick={deleteSpecificProject.bind(null, project)}
                className="group-hover:inline-block hidden text-2xl hover:scale-125 transition-transform cursor-pointer"
              >
                <RxCross1 />
              </span>
            </div>
          ))}
        </div>
        <div>
          <button
            onClick={openProjectModal}
            className="py-2 px-5 rounded-xl group flex gap-2 items-center justify-center hover:bg-primary hover:text-secondary transition-colors duration-200 bg-inherit cursor-pointer"
          >
            <span className="group-hover:inline-block hidden ">
              New Project
            </span>
            <FaPlus />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
