import { Formik } from "formik";
import React from "react";
import { MdDoubleArrow } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import uuid from "react-uuid";
import { updateTodoList } from "../Store/userSlice";
import { addToDoList } from "../Utils/Firebase/firebase.util";

const buttons = {
  inprogress: "in progress",
  not_started: "not started",
  completed: "done",
};

const TaskAddBox = ({ hideBox, addTask, buttonType, state }) => {
  const { project } = useParams();
  const { uid, todoList } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  return (
    <div className="border-primary border rounded p-3 text-primary ">
      <Formik
        initialValues={{ task_name: "", description: "" }}
        validate={(values) => {
          const error = {};
          if (!values.task_name) error.task_name = "Required";

          return error;
        }}
        onSubmit={(values) => {
          const newList = {
            ...todoList,
            [project]: [
              ...todoList[project],
              {
                id: uuid(),
                name: values.task_name.toUpperCase(),
                description: values.description,
                updatedTime: Date.now(),
                state: state,
              },
            ],
          };

          dispatch(updateTodoList(newList));
          addToDoList(uid, newList);
          values.task_name = "";
          values.description = "";
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
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2 ">
              <input
                type="text"
                name="task_name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.task_name}
                placeholder="Task Name"
                className="bg-inherit focus:outline-none font-bold"
              />
              {errors.task_name && touched.task_name && (
                <div className="text-red-600 text-sm">{errors.task_name}</div>
              )}

              <input
                type="text"
                name="description"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
                placeholder="Description (optional)"
                className="text-sm bg-inherit focus:outline-none"
              />
              {errors.description && touched.description && errors.description}

              <div className="flex justify-end text-xl gap-2">
                <button
                  type="button"
                  className="border text-primary border-primary cursor-pointer rounded p-1 hover:bg-primary hover:text-secondary"
                  onClick={hideBox.bind(null, false)}
                >
                  <RxCross1 className="" />
                </button>

                <button
                  type="submit"
                  onClick={addTask}
                  className={`text-secondary  border rounded cursor-pointer p-1 hover:bg-inherit
              ${
                buttonType === buttons.not_started
                  ? "not_started_button"
                  : buttonType === buttons.inprogress
                  ? "in_progress_button"
                  : "completed_button"
              }
              `}
                >
                  <MdDoubleArrow className="" />
                </button>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default TaskAddBox;
