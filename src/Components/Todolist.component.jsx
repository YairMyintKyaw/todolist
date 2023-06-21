import React from "react";
import TodoListCard from "./TodoListCard.component";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import TaskAddBox from "./TaskAddBox.component";
import {
  toggleCompletedAddBox,
  toggleNotStartedAddBox,
  toggleOnProgressAddBox,
} from "../Store/dashboardSlice";

const Todolist = () => {
  const { displayName, todoList, email } = useSelector((state) => state.user);
  const { isNotStartedAddBoxOn, isOnProgressAddBoxOn, isCompletedAddBoxOn } =
    useSelector((state) => state.dashboard);
  const date = new Date();
  const { project } = useParams();
  const tasks = todoList[project];
  const dispatch = useDispatch();

  const toggleNotStartedBox = () => dispatch(toggleNotStartedAddBox());

  const toggleOnProgressBox = () => dispatch(toggleOnProgressAddBox());

  const toggleCompletedBox = () => dispatch(toggleCompletedAddBox());

  return (
    <>
      <header className="flex justify-between items-center p-10">
        <div className=" ">
          <div className="text-4xl">{project}</div>
          <div className="text-xl">
            {date.getMonth() + 1}/{date.getDate()}/{date.getFullYear()}
          </div>
        </div>
        <div className="flex flex-col text-end">
          <span className="text-2xl">{displayName}</span>
          <span className="text-sm">{email}</span>
        </div>
      </header>
      <div className="flex flex-1 bg-secondary text-primary">
        <div className="flex-1 flex flex-col border-r border-black">
          <div className="group relative flex justify-center gap-4 items-center text-center py-5 text-lg border-y border-black">
            <span className="bg-red-200 rounded px-2">Not Started</span>
            <div
              className="absolute right-5 hidden group-hover:inline"
              onClick={toggleNotStartedBox}
            >
              <FaPlus className="text-3xl text-primary p-1  cursor-pointer hover:scale-95" />
            </div>
          </div>
          <div className="flex-1 ">
            {tasks.map(
              (task) =>
                task.state === "not started" && (
                  <TodoListCard key={task.id} todo={{ ...task }} />
                )
            )}

            {isNotStartedAddBoxOn && (
              <TaskAddBox
                buttonType={"not_started"}
                hideBox={toggleNotStartedBox}
              />
            )}
          </div>
        </div>
        <div className="flex-1 flex flex-col">
          <div className="group relative flex justify-center gap-4 items-center text-center py-5 text-lg border-y border-black">
            <span className="bg-yellow-200 rounded px-2">On Progress</span>
            <div
              className="absolute right-5 hidden group-hover:inline"
              onClick={toggleOnProgressBox}
            >
              <FaPlus className="text-3xl text-primary p-1  cursor-pointer hover:scale-95" />
            </div>
          </div>
          <div className="flex-1">
            {tasks.map(
              (task) =>
                task.state === "not started" && (
                  <TodoListCard key={task.id} todo={{ ...task }} />
                )
            )}
            {isOnProgressAddBoxOn && (
              <TaskAddBox
                buttonType={"on_progress"}
                hideBox={toggleOnProgressBox}
              />
            )}
          </div>
        </div>
        <div className="flex-1 flex flex-col border-l border-black">
          <div className="group relative flex justify-center gap-4 items-center text-center py-5 text-lg border-y border-black">
            <span className="bg-green-200 rounded px-2">Completed</span>
            <div
              className="absolute right-5 hidden group-hover:inline"
              onClick={toggleCompletedBox}
            >
              <FaPlus className="text-3xl text-primary p-1  cursor-pointer hover:scale-95" />
            </div>
          </div>
          <div className="flex-1 ">
            {tasks.map(
              (task) =>
                task.state === "not started" && (
                  <TodoListCard key={task.id} todo={{ ...task }} />
                )
            )}

            {isCompletedAddBoxOn && (
              <TaskAddBox
                buttonType={"completed"}
                hideBox={toggleCompletedBox}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Todolist;
