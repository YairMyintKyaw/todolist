import React from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { GoProject } from "react-icons/go";
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleAddProjectModal,
  toggleNavBar,
  toggleProjectDropdown,
} from "../Store/dashboardSlice";
import uuid from "react-uuid";

const Nav = () => {
  const { isNavBarOn, isProjectDropdownOn } = useSelector(
    (state) => state.dashboard
  );
  const todoList = useSelector((state) => state.user.todoList);
  const projects = todoList && Object.keys(todoList);
  const dispatch = useDispatch();

  const toggleDropdown = () => {
    dispatch(toggleNavBar(true));
    dispatch(toggleProjectDropdown(!isProjectDropdownOn));
  };

  const openProjectModal = () => {
    dispatch(toggleAddProjectModal());
  };

  return (
    <nav className="flex flex-col flex-1">
      {/* home tab */}
      <NavLink
        to={"/dashboard"}
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
          isProjectDropdownOn ? "h-auto" : "h-0"
        } flex flex-col items-center justify-center overflow-hidden `}
      >
        {/* projects will be here  */}
        <div className="flex flex-col my-2 ">
          {projects &&
            projects.map((project) => (
              <NavLink
                to={`todolist/${project}`}
                key={uuid()}
                className="py-2 px-5 mb-2 mx-auto text-center rounded-xl cursor-pointer border border-primary hover:bg-primary hover:text-secondary transition-colors duration-200"
              >
                {project}
              </NavLink>
            ))}
        </div>
        <div>
          <button
            onClick={openProjectModal}
            className="py-2 px-5 rounded-xl  flex items-center justify-center hover:bg-primary hover:text-secondary transition-colors duration-200 bg-inherit cursor-pointer"
          >
            <FaPlus />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
