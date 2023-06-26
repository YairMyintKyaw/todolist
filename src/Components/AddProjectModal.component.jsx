import React from "react";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { toggleAddProjectModal } from "../Store/dashboardSlice";
import { Formik } from "formik";
import { updateTodoList } from "../Store/userSlice";
import { addToDoList } from "../Utils/Firebase/firebase.util";

const AddProjectModal = () => {
  const { uid, todoList } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const closeProjectModal = () => {
    dispatch(toggleAddProjectModal());
  };
  return (
    <div className="flex justify-center items-center absolute left-0 right-0 top-0 bottom-0 m-auto bg-secondary opacity-95 z-50">
      <div className="w-3/4">
        <div className="mb-6 flex justify-end">
          <RxCross1
            className="cursor-pointer text-4xl text-primary hover:scale-110 transition-all"
            onClick={closeProjectModal}
          />
        </div>
        <Formik
          initialValues={{ project_name: "" }}
          validate={(values) => {
            const error = {};
            if (!values.project_name) error.project_name = "Required";

            return error;
          }}
          onSubmit={(values) => {
            const newList = {
              ...todoList,
              [values.project_name]: [],
            };
            console.log(newList);

            dispatch(updateTodoList(newList));
            addToDoList(uid, newList);
            closeProjectModal();
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
                <label htmlFor="projectName" className="text-5xl text-primary">
                  Project Name
                </label>
                <input
                  required
                  type="text"
                  name="project_name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.project_name}
                  className="text-4xl bg-inherit border-b border-b-primary focus:outline-none text-primary"
                />
                {errors.project_name && touched.project_name && (
                  <div className="text-red-600 text-sm">
                    {errors.project_name}
                  </div>
                )}
                <div className="text-end">
                  <button
                    type="submit"
                    className="border border-primary rounded-md px-5 py-2 text-primary hover:bg-primary hover:text-secondary transition-all"
                  >
                    Create
                  </button>
                </div>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddProjectModal;
