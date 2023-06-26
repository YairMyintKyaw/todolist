import React from "react";
import { Draggable } from "react-beautiful-dnd";

const TodoListCard = ({ todo: { name, description, id }, index }) => {
  return (
    <Draggable key={id} draggableId={id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className=" cursor-grab border border-primary p-3 m-2 rounded bg-secondary"
        >
          <div className="font-bold">{name}</div>
          <div>{index}</div>
        </div>
      )}
    </Draggable>
  );
};

export default TodoListCard;
