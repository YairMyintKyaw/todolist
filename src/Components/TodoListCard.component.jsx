import { Formik } from "formik";
import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useParams } from "react-router-dom";
import { addToDoList } from "../Utils/Firebase/firebase.util";
import { updateTodoList } from "../Store/userSlice";
import { useDispatch, useSelector } from "react-redux";

const TodoListCard = ({ todo: { name, description, id }, index }) => {
  const [isNameEditable, setIsNameEdiable] = useState(false);
  const [isDescriptionEditable, setIsDescriptionEdiable] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const { todoList, uid } = useSelector((state) => state.user);
  const { project } = useParams();
  const dispatch = useDispatch();
  const toggleNameEditable = () => {
    setIsNameEdiable(!isNameEditable);
  };
  const toggleDescriptionEditable = () => {
    setIsDescriptionEdiable(!isDescriptionEditable);
  };

  const toggleEditable = () => {
    setIsEditable(!isEditable);
  };
  return (
    <Draggable key={id} draggableId={id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className=" cursor-grab border border-primary p-3 mb-2  rounded bg-secondary select-none "
        >
          {isEditable ? (
            <div>
              <Formik
                initialValues={{ task_name: name, description: description }}
                validate={(values) => {
                  const error = {};
                  if (!values.task_name) error.project_name = "Required";

                  return error;
                }}
                onSubmit={(values) => {
                  const newTodoList = JSON.parse(JSON.stringify(todoList));
                  newTodoList[project][index]["name"] =
                    values.task_name.toUpperCase();
                  newTodoList[project][index]["description"] =
                    values.description;

                  dispatch(updateTodoList(newTodoList));
                  addToDoList(uid, newTodoList);
                  toggleEditable();
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                }) => (
                  <form action="" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-4 ">
                      <input
                        required
                        type="text"
                        name="task_name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.task_name}
                        placeholder="Title"
                        className="h-auto text-lg bg-inherit  focus:outline-none text-primary border-none font-medium"
                        style={{ height: "auto" }} // Auto-sizing
                      />
                      {errors.project_name && touched.project_name && (
                        <div className="text-red-600 text-sm ">
                          {errors.project_name}
                        </div>
                      )}
                      <textarea
                        type="text"
                        name="description"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.description}
                        placeholder="Description"
                        className="text-md bg-inherit focus:outline-none text-primary border-b  border-primary border-none"
                        style={{ height: "auto" }} // Auto-sizing
                      />
                      {errors.project_name && touched.project_name && (
                        <div className="text-red-600 text-sm">
                          {errors.project_name}
                        </div>
                      )}
                      <button
                        type="submit"
                        className="border border-primary bg-primary text-secondary rounded-md py-1 w-1/4 ml-auto hover:bg-secondary hover:text-primary"
                      >
                        Updated
                      </button>
                    </div>
                  </form>
                )}
              </Formik>
            </div>
          ) : (
            <div className="" onDoubleClick={toggleEditable}>
              <div
                className="font-medium break-all uppercase"
                onDoubleClick={toggleNameEditable}
              >
                {name}
              </div>
              <div
                className="break-all"
                onDoubleClick={toggleDescriptionEditable}
              >
                {description}
              </div>
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default TodoListCard;
