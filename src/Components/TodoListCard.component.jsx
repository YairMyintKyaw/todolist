import React from "react";

const TodoListCard = ({ todo: { name, description, uid, state } }) => {
  return (
    <div className=" cursor-grab border border-primary p-3 m-2 rounded" draggable>
      <div className="font-bold">{name}</div>
      <div>{description}</div>
    </div>
  );
};

export default TodoListCard;
