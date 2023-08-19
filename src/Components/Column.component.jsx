import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import TaskAddBox from "./TaskAddBox.component";
import TodoListCard from "./TodoListCard.component";
import { Droppable } from "react-beautiful-dnd";

const states = {
  "Not Started": "not started",
  "In Progress": "in progress",
  Completed: "done",
};

const Column = ({ state, toggleBox, isAddBoxOn }) => {
  const { todoList } = useSelector((state) => state.user);
  const { project } = useParams();
  const tasks = todoList[project];

  return (
    <div className="flex-1 flex flex-col  select-none rounded-lg ">
      <div className="group relative flex justify-between gap-4 items-center py-5 text-lg ">
        <span
          className={`${
            state === "Not Started"
              ? "not_started"
              : state === "In Progress"
              ? "in_progress"
              : "completed"
          } rounded px-2 `}
        >
          {state}
        </span>
        <div
          className="absolute right-0 hidden group-hover:inline"
          onClick={toggleBox}
        >
          <FaPlus className="text-3xl text-primary p-1  cursor-pointer hover:scale-95" />
        </div>
      </div>
      <div className="flex-1 overflow-y-scroll flex flex-col justify-start ">
        <Droppable droppableId={states[state]}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="h-full"
            >
              {tasks.map(
                (task, index) =>
                  task.state === states[state] && (
                    <TodoListCard
                      key={task.id}
                      todo={{ ...task }}
                      index={index}
                    />
                  )
              )}
              {provided.placeholder}
              {!isAddBoxOn && (
                <div
                  onClick={toggleBox}
                  className="flex justify-between items-center cursor-pointer border border-primary border-dashed p-3 rounded opacity-70"
                >
                  <span>Add new task</span>
                  <span>
                    <AiOutlinePlus className="text-2xl" />
                  </span>
                </div>
              )}
              {isAddBoxOn && (
                <TaskAddBox
                  buttonType={states[state]}
                  hideBox={toggleBox}
                  state={states[state]}
                />
              )}
            </div>
          )}
        </Droppable>
      </div>
    </div>
  );
};

export default Column;
