import React from "react";
import { RxCross1 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { toggleAddProjectModal } from "../Store/dashboardSlice";

const AddProjectModal = () => {
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
        <form action="">
          <div className="flex flex-col gap-16">
            <label htmlFor="projectName" className="text-5xl text-primary">
              Project Name
            </label>
            <input
              required
              type="text"
              className="text-4xl bg-inherit border-b border-b-primary focus:outline-none text-primary"
            />
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
      </div>
    </div>
  );
};

export default AddProjectModal;
