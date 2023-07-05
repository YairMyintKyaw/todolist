import React, { useState } from "react";
import { createAuthWithEmailAndPassword } from "../Utils/Firebase/firebase.util";
import { image } from "../Image/image";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { toggleLoading } from "../Store/dashboardSlice";

const Signup = ({ signUpContainer, NavigateToSignIn }) => {
  const dispatch = useDispatch();
  return (
    <div
      className={` transition duration-1000 absolute top-0 left-0 right-0 bottom-0 m-auto flex flex-row-reverse bg-white signUpContainer`}
      ref={signUpContainer}
    >
      <div
        className={` flex-1 flex flex-col gap-6 justify-center items-center SignUpFormContainer animate__fast`}
      >
        <h2 className=" text-3xl text-start"> Sign up </h2>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validate={(values) => {
            const error = {};
            const { name, email, password, confirmPassword } = values;
            if (!name) error.name = "required";
            if (!email) error.email = "required";
            if (!password) error.password = "required";
            if (!confirmPassword) error.confirmPassword = "required";
            else if (confirmPassword != password)
              error.confirmPassword = "Password does not match";

            return error;
          }}
          onSubmit={async ({ email, password, name }) => {
            dispatch(toggleLoading(true));
            await createAuthWithEmailAndPassword(email, password, name);
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
            <form
              action=""
              onSubmit={handleSubmit}
              className="min-w-full flex flex-col items-center justify-center "
            >
              <div className="flex flex-col">
                <label htmlFor="name">Name</label>
                <input
                  value={values.name}
                  id="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="name"
                  type="text"
                  placeholder="Name"
                  className="input"
                  required
                />
                {errors.name && touched.name && (
                  <div className="text-red-600 text-sm px-3 pt-2">
                    {errors.name}
                  </div>
                )}
                <label htmlFor="email" className="mt-3">
                  Email
                </label>
                <input
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="input"
                  required
                />
                {errors.email && touched.email && (
                  <div className="text-red-600 text-sm px-3 pt-2">
                    {errors.email}
                  </div>
                )}
                <div className="flex gap-3">
                  <div className="flex flex-col">
                    <label htmlFor="signUpPassword" className="mt-3">
                      Password
                    </label>
                    <input
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      id="signUpPassword"
                      name="password"
                      type="password"
                      placeholder="Password"
                      className="input"
                      required
                    />
                    {errors.password && touched.password && (
                      <div className="text-red-600 text-sm px-3 pt-2">
                        {errors.password}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="confirmPassword" className="mt-3">
                      Confirm Password
                    </label>
                    <input
                      value={values.confirmPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm Password"
                      className="input"
                      required
                    />
                    {errors.confirmPassword && touched.confirmPassword && (
                      <div className="text-red-600 text-sm px-3 pt-2">
                        {errors.confirmPassword}
                      </div>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  className="border border-primary px-3 py-2 rounded-lg mt-4 hover:bg-primary hover:text-white"
                >
                  Sign up
                </button>
              </div>
            </form>
          )}
        </Formik>
        <div className="flex gap-2">
          <span>Already have an account?</span>
          <span
            onClick={NavigateToSignIn}
            className="underline cursor-pointer text-blue-700 hover:text-primary"
          >
            Sign in
          </span>
        </div>
      </div>
      <div
        className={` flex-1 flex items-center SignUpImageContainer animate__fast`}
      >
        <img src={image.sign_up} alt="" />
      </div>
    </div>
  );
};

export default Signup;
