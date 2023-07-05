import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { GoProject } from "react-icons/go";
import { FaPlus } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleAddProjectModal,
  toggleNavBar,
  toggleProjectDropdown,
} from "../Store/dashboardSlice";
import uuid from "react-uuid";
import { updateTodoList } from "../Store/userSlice";
import { addToDoList } from "../Utils/Firebase/firebase.util";

const Nav = () => {
  const { isNavBarOn, isProjectDropdownOn } = useSelector(
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
    nav("");
    delete newTodoList[project];
    dispatch(updateTodoList(newTodoList));
    addToDoList(uid, newTodoList);
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
          {projects?.map((project) => (
            <div
              key={uuid()}
              className="relative group max-w-[90%] w-[90%] mx-auto flex items-center justify-center hover:justify-between py-2 px-5 mb-2 text-center rounded  border  hover:bg-primary hover:text-secondary transition-colors duration-200"
            >
              <NavLink
                to={`todolist/${project}`}
                className="flex-1  cursor-pointer overflow-hidden"
                style={{ wordWrap: "break-word" }}
              >
                {project}
              </NavLink>
              <span
                onClick={deleteSpecificProject.bind(null, project)}
                className="group-hover:inline-block hidden text-xl hover:scale-125 transition-transform cursor-pointer"
              >
                <RxCross1 />
              </span>
            </div>
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
