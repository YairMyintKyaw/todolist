import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import {
  signInAuthWithEmailAndPassword,
  signInWithGooglePopup,
} from "../Utils/Firebase/firebase.util";

const initialInputValue = {
  email: "",
  password: "",
};

const Signin = ({ signInContainer, NavigateToSignUp }) => {
  const [formInputValue, setFormInputValue] = useState(initialInputValue);
  const { email, password } = formInputValue;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInputValue({ ...formInputValue, [name]: value });
  };

  const resetForm = () => {
    setFormInputValue(initialInputValue);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    const result = await signInAuthWithEmailAndPassword(email, password);
    resetForm();
  };

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
  };

  return (
    <div
      className={`transition duration-1000 z-10 absolute top-0 left-0 right-0 bottom-0 m-auto flex bg-white signInContainer `}
      ref={signInContainer}
    >
      <div
        className={`flex-1 flex flex-col gap-6 justify-center items-center SignInFormContainer animate__fast`}
      >
        <h2 className=" text-3xl text-start">Sign in </h2>
        <form
          action=""
          className="min-w-full flex flex-col items-center justify-center gap-3"
          onSubmit={handleSignIn}
        >
          <input
            value={email}
            onChange={handleChange}
            name="email"
            type="email"
            placeholder="Email"
            className="input"
          />
          <input
            value={password}
            onChange={handleChange}
            name="password"
            type="password"
            placeholder="Password"
            className="input"
          />
          <button
            type="submit"
            className="border border-black px-3 py-2 rounded-lg hover:bg-black hover:text-white"
          >
            Sign in
          </button>
        </form>

        <div
          className="flex items-center gap-2 border py-2 px-3 rounded cursor-pointer hover:bg-slate-200"
          onClick={signInWithGoogle}
        >
          <FcGoogle className="text-3xl " /> <span>Google</span>
        </div>
        <div className="flex gap-2">
          <span>Do not have an account yet?</span>
          <span
            onClick={NavigateToSignUp}
            className="font-bold cursor-pointer text-blue-700 hover:text-black"
          >
            Sign up
          </span>
        </div>
      </div>
      <div
        className={`flex-1 flex items-center bg-[#F4E8EA] SignInImageContainer animate__fast`}
      >
        <img src=".\src\assets\signin.jpg" alt="" />
      </div>
    </div>
  );
};

export default Signin;
