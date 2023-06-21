import React, { useState } from "react";
import { createAuthWithEmailAndPassword } from "../Utils/Firebase/firebase.util";

const initialInputValue = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Signup = ({ signUpContainer, NavigateToSignIn }) => {
  const [formInputValue, setFormInputValue] = useState(initialInputValue);
  const { name, email, password, confirmPassword } = formInputValue;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInputValue({ ...formInputValue, [name]: value });
  };

  const resetForm = () => {
    setFormInputValue(initialInputValue);
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const user = await createAuthWithEmailAndPassword(email, password, name);
    }
    resetForm();
  };

  return (
    <div
      className={` transition duration-1000 absolute top-0 left-0 right-0 bottom-0 m-auto flex flex-row-reverse bg-white signUpContainer`}
      ref={signUpContainer}
    >
      <div
        className={` flex-1 flex flex-col gap-6 justify-center items-center SignUpFormContainer animate__fast`}
      >
        <h2 className=" text-3xl text-start"> Sign up </h2>
        <form
          action=""
          className="min-w-full flex flex-col items-center justify-center gap-3"
          onSubmit={handleCreateAccount}
        >
          <input
            value={name}
            onChange={handleChange}
            name="name"
            type="text"
            placeholder="Name"
            className="input"
            required
          />
          <input
            value={email}
            onChange={handleChange}
            name="email"
            type="email"
            placeholder="Email"
            className="input"
            required
          />

          <input
            value={password}
            onChange={handleChange}
            name="password"
            type="password"
            placeholder="Password"
            className="input"
            required
          />
          <input
            value={confirmPassword}
            onChange={handleChange}
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            className="input"
            required
          />

          <button
            type="submit"
            className="border border-black px-3 py-2 rounded-lg hover:bg-black hover:text-white"
          >
            Sign up
          </button>
        </form>
        <div className="flex gap-2">
          <span>Already have an account?</span>
          <span
            onClick={NavigateToSignIn}
            className="underline cursor-pointer text-blue-700 hover:text-black"
          >
            Sign in
          </span>
        </div>
      </div>
      <div
        className={` flex-1 flex items-center SignUpImageContainer animate__fast`}
      >
        <img src=".\src\assets\signup.jpg" alt="" />
      </div>
    </div>
  );
};

export default Signup;
