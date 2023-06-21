import React from "react";
import { MdDoubleArrow } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";

const buttons = {
  onprogress: "on_progress",
  not_started: "not_started",
  completed: "completed",
};

const TaskAddBox = ({ hideBox, addTask, buttonType }) => {
  return (
    <div className="border-primary border rounded p-3 m-2 text-primary ">
      <form action="">
        <div className="flex flex-col gap-2 ">
          <input
            type="text"
            placeholder="Task Name"
            className="bg-inherit focus:outline-none font-bold  "
          />
          <input
            type="text"
            placeholder="Description"
            className="text-sm bg-inherit focus:outline-none"
          />
          <div className="flex justify-end text-xl gap-2">
            <span
              className="border text-primary border-primary cursor-pointer rounded p-1 hover:bg-primary hover:text-secondary"
              onClick={hideBox}
            >
              <RxCross1 className="" />
            </span>
            {buttonType === buttons.not_started ? (
              <span
                className=" bg-red-700 text-secondary border-red-700 border rounded cursor-pointer p-1 hover:bg-inherit hover:text-red-700"
                onClick={addTask}
              >
                <MdDoubleArrow className="" />
              </span>
            ) : buttonType === buttons.onprogress ? (
              <span
                className=" bg-yellow-700 text-secondary border-yellow-700 border rounded cursor-pointer p-1 hover:bg-inherit hover:text-yellow-700"
                onClick={addTask}
              >
                <MdDoubleArrow className="" />
              </span>
            ) : (
              <span
                className=" bg-green-700 text-secondary border-green-700 border rounded cursor-pointer p-1 hover:bg-inherit hover:text-green-700"
                onClick={addTask}
              >
                <MdDoubleArrow className="" />
              </span>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default TaskAddBox;
