import React from "react";
import { auth, signOutUser } from "../Utils/Firebase/firebase.util";
import { useNavigate } from "react-router-dom";
import { sendEmailVerification } from "firebase/auth";
import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});
const sendVerifyEmailAgain = async () => {
  try {
    if (auth.currentUser) {
      await sendEmailVerification(auth.currentUser);
      Toast.fire({
        icon: "success",
        title: "Verification mail is sent.",
      });
    } else {
      console.error("User is not signed in."); // You might want to handle this case
    }
  } catch (error) {
    console.error("Error sending verification email:", error);
  }
};
const EmailVerified = () => {
  const nav = useNavigate();
  const redirectToSignIn = () => {
    signOutUser();
    nav("/");
  };

  return (
    <div className="bg-secondary w-screen h-screen flex flex-col justify-center items-center">
      <div className="w-2/3 min-w-[200px] max-w-[700px] border border-primary rounded-lg p-3 shadow-lg">
        <div className="font-bold text-center text-2xl mb-3 uppercase text-primary">
          Your Email Is needed to be verified
        </div>
        <div className="">
          <p className="mx-auto mb-3">
            An email verification link has been sent to{" "}
            <span className="font-bold">{auth.currentUser?.email}</span>. Please
            check your inbox and follow the instructions in the email to verify
            your account.
          </p>
          <p className="mx-auto ">
            <span
              onClick={sendVerifyEmailAgain}
              className="underline hover:font-bold hover:text-primary cursor-pointer"
            >
              Do not receive email?
            </span>
            <span className="mx-2">or</span>
            <span
              onClick={redirectToSignIn}
              className="underline hover:font-bold hover:text-primary cursor-pointer"
            >
              Sign in again?
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmailVerified;
