import React, { useRef } from "react";
import { animateCSS } from "../Utils/AnimateCss/animateCss.util";
import "animate.css";
import Signin from "../Components/Signin.component";
import Signup from "../Components/Signup.component";
import {
  changeOpacity,
  changeZIndex,
} from "../Utils/ChangeCssStyle/changeStyle";
import { useSelector } from "react-redux";
import Loading from "../Components/Loading.component";

const Signin_signup = () => {
  const signInContainer = useRef(null);
  const signUpContainer = useRef(null);
  const isLoading = useSelector((state) => state.dashboard.isLoading);
  const NavigateToSignUp = async () => {
    await Promise.all([
      animateCSS(".SignInFormContainer", "fadeOutRight"),
      animateCSS(".SignInImageContainer", "fadeOutLeft"),
      changeOpacity(signInContainer, 0),
    ]);
    changeZIndex(signUpContainer, 10);
    changeZIndex(signInContainer, 1);
    changeOpacity(signInContainer, 1);
  };

  const NavigateToSignIn = async () => {
    await Promise.all([
      animateCSS(".SignUpFormContainer", "fadeOutLeft"),
      animateCSS(".SignUpImageContainer", "fadeOutRight"),
      changeOpacity(signUpContainer, 0),
    ]);
    changeZIndex(signInContainer, 10);
    changeZIndex(signUpContainer, 1);
    changeOpacity(signUpContainer, 1);
  };

  return (
    <div className=" flex h-screen">
      {/* sign in */}
      <Signin
        NavigateToSignUp={NavigateToSignUp}
        signInContainer={signInContainer}
      />
      {/* sign up */}
      <Signup
        NavigateToSignIn={NavigateToSignIn}
        signUpContainer={signUpContainer}
      />
      {isLoading && <Loading />}
    </div>
  );
};

export default Signin_signup;
