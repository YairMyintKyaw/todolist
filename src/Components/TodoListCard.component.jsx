import { Formik } from "formik";
import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useParams } from "react-router-dom";
import { addToDoList } from "../Utils/Firebase/firebase.util";
import { updateTodoList } from "../Store/userSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const TodoListCard = ({ todo: { name, description, id }, index }) => {
  const [isNameEditable, setIsNameEdiable] = useState(false);
  const [isDescriptionEditable, setIsDescriptionEdiable] = useState(false);
  const { todoList, uid } = useSelector((state) => state.user);
  const { project } = useParams();
  const dispatch = useDispatch();
  const toggleNameEditable = () => {
    setIsNameEdiable(!isNameEditable);
  };
  const toggleDescriptionEditable = () => {
    setIsDescriptionEdiable(!isDescriptionEditable);
  };
  return (
    <Draggable key={id} draggableId={id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className=" cursor-grab border border-primary p-3 mb-2  rounded bg-secondary select-none"
        >
          {isNameEditable ? (
            <Formik
              initialValues={{ task_name: name }}
              validate={(values) => {
                const error = {};
                if (!values.task_name) error.project_name = "Required";

                return error;
              }}
              onSubmit={(values) => {
                const newTodoList = JSON.parse(JSON.stringify(todoList));
                newTodoList[project][index]["name"] = values.task_name;
                dispatch(updateTodoList(newTodoList));
                addToDoList(uid, newTodoList);
                toggleNameEditable();
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
                  <div className="flex flex-col gap-16">
                    <input
                      required
                      type="text"
                      name="task_name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.task_name}
                      className="text-xl bg-inherit border-b border-b-primary focus:outline-none text-primary"
                    />
                    {errors.project_name && touched.project_name && (
                      <div className="text-red-600 text-sm">
                        {errors.project_name}
                      </div>
                    )}
                  </div>
                </form>
              )}
            </Formik>
          ) : (
            <div className="font-bold" onDoubleClick={toggleNameEditable}>
              {name}
            </div>
          )}
          {isDescriptionEditable ? (
            <Formik
              initialValues={{ description: description }}
              validate={(values) => {
                const error = {};
                if (!values.description) error.project_name = "Required";

                return error;
              }}
              onSubmit={(values) => {
                const newTodoList = JSON.parse(JSON.stringify(todoList));
                newTodoList[project][index]["description"] = values.description;
                dispatch(updateTodoList(newTodoList));
                addToDoList(uid, newTodoList);
                toggleDescriptionEditable();
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
                  <div className="flex flex-col gap-16">
                    <input
                      required
                      type="text"
                      name="description"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.description}
                      className="text-xl bg-inherit border-b border-b-primary focus:outline-none text-primary"
                    />
                    {errors.project_name && touched.project_name && (
                      <div className="text-red-600 text-sm">
                        {errors.project_name}
                      </div>
                    )}
                  </div>
                </form>
              )}
            </Formik>
          ) : (
            <div onDoubleClick={toggleDescriptionEditable}>{description}</div>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default TodoListCard;
