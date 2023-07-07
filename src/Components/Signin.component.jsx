import { FaGoogle } from "react-icons/fa";
import {
  signInAuthWithEmailAndPassword,
  signInWithGooglePopup,
} from "../Utils/Firebase/firebase.util";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { toggleLoading } from "../Store/dashboardSlice";
import { RxCrossCircled } from "react-icons/rx";
import Carousel from "./Carousel.component";

const Signin = ({ signInContainer, NavigateToSignUp }) => {
  const dispatch = useDispatch();

  const signInWithGoogle = async () => {
    dispatch(toggleLoading(true));
    await signInWithGooglePopup();
  };

  const errorMessage = useSelector((state) => state.dashboard.errorMessage);

  return (
    <div
      className={`transition duration-1000 z-10 absolute top-0 left-0 right-0 bottom-0 m-auto flex bg-white signInContainer text-primary`}
      ref={signInContainer}
    >
      <div
        className={`flex-1 flex flex-col gap-6 justify-center items-center SignInFormContainer animate__fast`}
      >
        <div>
          <h2 className=" text-3xl text-center mb-3">Task Vortex</h2>
        </div>
        {errorMessage.signInError && (
          <div className="flex items-center gap-3  rounded py-1 px-2 text-red-600 bg-red-200">
            <RxCrossCircled className="text-red-700 text-xl" />
            <span>Wrong Password or Email doesn't exist</span>
          </div>
        )}
        <div>
          <Formik
            initialValues={{ password: "", email: "" }}
            validate={(values) => {
              const error = {};
              if (!values.password) error.password = "required";
              if (!values.email) error.email = "required";

              return error;
            }}
            onSubmit={async ({ email, password }) => {
              dispatch(toggleLoading(true));
              await signInAuthWithEmailAndPassword(email, password);
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
                  <label htmlFor="email">Email</label>
                  <input
                    required
                    name="email"
                    type="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Mike@gmail.com"
                    value={values.email}
                    className="input min-w-[300px] w-[60%] max-w-[400px]"
                  />
                  {errors.email && touched.email && (
                    <div className="text-red-600 text-sm px-3 pt-2">
                      {errors.email}
                    </div>
                  )}
                  <label htmlFor="password" className="mt-4">
                    Password
                  </label>
                  <input
                    required
                    id="password"
                    name="password"
                    type="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="6 or more characters"
                    value={values.password}
                    className="input min-w-[300px] w-[60%] max-w-[400px]"
                  />
                  {errors.password && touched.password && (
                    <div className="text-red-600 text-sm px-3 pt-2">
                      {errors.password}
                    </div>
                  )}
                  <button
                    type="submit"
                    className="border shadow border-primary px-3 py-2 mt-6 rounded-lg hover:bg-primary hover:text-white"
                  >
                    Sign in
                  </button>
                </div>
              </form>
            )}
          </Formik>
          <div className="flex items-center gap-3 my-6">
            <hr className="flex-1 border-gray-400" />
            <span className="text-gray-400">Or</span>
            <hr className="flex-1 border-gray-400" />
          </div>
          <div
            className="flex items-center justify-center gap-2 shadow border border-primary py-2 px-3 rounded cursor-pointer hover:bg-primary hover:text-secondary transition-colors"
            onClick={signInWithGoogle}
          >
            <FaGoogle className="text-xl" />
            <span className=" text-center">Sign In With Google</span>
          </div>
        </div>
        <div className="flex gap-2">
          <span>Do not have an account yet?</span>
          <span
            onClick={NavigateToSignUp}
            className="font-bold cursor-pointer text-blue-700 hover:text-primary"
          >
            Sign up
          </span>
        </div>
      </div>
      <div
        className={`flex-1 flex items-center justify-center bg-primary SignInImageContainer animate__fast overflow-hidden`}
      >
        <Carousel />
      </div>
    </div>
  );
};

export default Signin;
