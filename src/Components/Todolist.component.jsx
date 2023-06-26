import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  toggleCompletedAddBox,
  toggleNotStartedAddBox,
  toggleOnProgressAddBox,
} from "../Store/dashboardSlice";
import Column from "./Column.component";
import { DragDropContext } from "react-beautiful-dnd";
import { updateTodoList } from "../Store/userSlice";

const Todolist = () => {
  const { displayName, todoList, email } = useSelector((state) => state.user);
  const { isNotStartedAddBoxOn, isOnProgressAddBoxOn, isCompletedAddBoxOn } =
    useSelector((state) => state.dashboard);
  const date = new Date();
  const { project } = useParams();
  const dispatch = useDispatch();

  const toggleNotStartedBox = () =>
    dispatch(toggleNotStartedAddBox(!isNotStartedAddBoxOn));

  const toggleOnProgressBox = () =>
    dispatch(toggleOnProgressAddBox(!isOnProgressAddBoxOn));

  const toggleCompletedBox = () =>
    dispatch(toggleCompletedAddBox(!isCompletedAddBoxOn));

  const onDragEnd = (result) => {
    const newTodoList = JSON.parse(JSON.stringify(todoList));
    const currentProject = newTodoList[project];
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    console.log(destination);
    console.log(source);
    console.log(draggableId);

    // change index
    const currentTask = currentProject[source.index];
    // change state
    currentTask.state = destination.droppableId;
    const currentTaskClone = JSON.parse(JSON.stringify(currentTask));
    currentProject.splice(source.index, 1);
    // console.log("Destination", destination.index);
    // console.log("Source", source.index);
    // console.log(destination.index - 1);
    console.log(
      destination.index < source.index
        ? destination.index - 1
        : destination.index
    );
    // console.log(destination.index);
    currentProject.splice(
      destination.index < source.index
        ? destination.index - 1
        : destination.index,
      0,
      currentTaskClone
    );

    dispatch(updateTodoList(newTodoList));
    // updateTodoList(newTodoList);
  };

  useEffect(() => {
    //delete the add box when the project is changed
    dispatch(toggleNotStartedAddBox(false));
    dispatch(toggleOnProgressAddBox(false));
    dispatch(toggleCompletedAddBox(false));
  }, [project]);
  return (
    <>
      <header className="flex justify-between items-center p-10">
        <div>
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
      <div className="flex flex-1 bg-secondary text-primary overflow-hidden">
        <DragDropContext onDragEnd={onDragEnd}>
          <Column
            state="Not Started"
            toggleBox={toggleNotStartedBox}
            isAddBoxOn={isNotStartedAddBoxOn}
          />
          <Column
            state="On Progress"
            toggleBox={toggleOnProgressBox}
            isAddBoxOn={isOnProgressAddBoxOn}
          />
          <Column
            state="Completed"
            toggleBox={toggleCompletedBox}
            isAddBoxOn={isCompletedAddBoxOn}
          />
        </DragDropContext>
      </div>
    </>
  );
};

export default Todolist;
