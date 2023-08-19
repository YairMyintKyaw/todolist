import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  setItemGrabbedCondition,
  toggleCompletedAddBox,
  toggleNotStartedAddBox,
  toggleInProgressAddBox,
} from "../Store/dashboardSlice";
import Column from "./Column.component";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { updateTodoList } from "../Store/userSlice";
import { addToDoList } from "../Utils/Firebase/firebase.util";
import { FaTrashAlt } from "react-icons/fa";

const Todolist = () => {
  const { displayName, todoList, email, uid } = useSelector(
    (state) => state.user
  );
  const {
    isNotStartedAddBoxOn,
    isInProgressAddBoxOn,
    isCompletedAddBoxOn,
    isItemGrabbed,
  } = useSelector((state) => state.dashboard);

  const date = new Date();
  const { project } = useParams();
  const dispatch = useDispatch();

  const toggleNotStartedBox = () =>
    dispatch(toggleNotStartedAddBox(!isNotStartedAddBoxOn));

  const toggleInProgressBox = () =>
    dispatch(toggleInProgressAddBox(!isInProgressAddBoxOn));

  const toggleCompletedBox = () =>
    dispatch(toggleCompletedAddBox(!isCompletedAddBoxOn));

  const onDragEnd = (result) => {
    const newTodoList = JSON.parse(JSON.stringify(todoList));
    const currentProject = newTodoList[project];
    const { destination, source, draggableId } = result;

    dispatch(setItemGrabbedCondition(false));

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (destination.droppableId === "Delete") {
      currentProject.splice(source.index, 1);
      dispatch(updateTodoList(newTodoList));
      addToDoList(uid, newTodoList);
      return;
    }
    // change index
    const currentTask = currentProject[source.index];
    // change state
    currentTask.state = destination.droppableId;
    currentTask.updatedTime = Date.now();
    currentProject.splice(source.index, 1);

    currentProject.splice(
      destination.index > source.index &&
        destination.droppableId != source.droppableId
        ? destination.index - 1
        : destination.index,
      0,
      currentTask
    );
    dispatch(updateTodoList(newTodoList));
    addToDoList(uid, newTodoList);
  };

  const onDragStart = () => {
    dispatch(setItemGrabbedCondition(true));
  };

  useEffect(() => {
    //delete the add box when the project is changed
    dispatch(toggleNotStartedAddBox(false));
    dispatch(toggleInProgressAddBox(false));
    dispatch(toggleCompletedAddBox(false));
  }, [project]);
  return (
    <>
      <header className="flex justify-between items-center flex-wrap p-10">
        <div className="overflow-hidden flex-1">
          <div
            className="overflow-hidden text-4xl text-start"
            style={{ wordWrap: "break-word" }}
          >
            {project}
          </div>
          <div className="text-xl">
            {date.getMonth() + 1}/{date.getDate()}/{date.getFullYear()}
          </div>
        </div>
        <div className="flex  flex-col text-end">
          <span className="text-2xl">{displayName}</span>
          <span className="text-sm">{email}</span>
        </div>
      </header>
      <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
        <div className="flex flex-1 flex-col bg-secondary text-primary overflow-hidden">
          <div className="flex flex-1 gap-4 p-3 overflow-hidden ">
            <Column
              state="Not Started"
              toggleBox={toggleNotStartedBox}
              isAddBoxOn={isNotStartedAddBoxOn}
            />
            <Column
              state="In Progress"
              toggleBox={toggleInProgressBox}
              isAddBoxOn={isInProgressAddBoxOn}
            />
            <Column
              state="Completed"
              toggleBox={toggleCompletedBox}
              isAddBoxOn={isCompletedAddBoxOn}
            />
          </div>
          <div className={`w-full h-10`}>
            <Droppable droppableId="Delete">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`${
                    isItemGrabbed ? "h-full" : "h-0"
                  } flex items-end relative overflow-hidden`}
                >
                  <div
                    className={`${
                      snapshot.isDraggingOver
                        ? "bg-red-700 text-secondary border-none"
                        : ""
                    } border-t border-t-primary w-full mx-auto h-full text-center text-primary flex items-center justify-center transition-all `}
                  >
                    <FaTrashAlt className="text-lg" />
                  </div>
                </div>
              )}
            </Droppable>
          </div>
        </div>
      </DragDropContext>
    </>
  );
};

export default Todolist;
