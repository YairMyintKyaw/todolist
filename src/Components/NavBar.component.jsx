import React from "react";
import { BiDoorOpen } from "react-icons/bi";
import { useSelector } from "react-redux";
import { signOutUser } from "../Utils/Firebase/firebase.util";
import NavBarToggleButton from "./NavBarToggleButton";
import Nav from "./Nav.component";

const NavBar = () => {
  const { isNavBarOn } = useSelector((state) => state.dashboard);
  return (
    <div
      className={`${
        isNavBarOn && window.innerWidth > 768
          ? "md:min-w-[20%] w-[20%]"
          : "md:min-w-[80px]"
      } 
      ${
        isNavBarOn && window.innerWidth < 768
          ? "absolute m-auto left-0 right-0 top-0 bottom-0 z-20 "
          : "relative w-0"
      }   h-screen flex flex-col pb-3 text-primary border-r border-r-primary  bg-secondary rounded-tr-lg overflow-scroll transition-all duration-300`}
    >
      <div
        className={`flex items-center  relative my-3 ${
          isNavBarOn ? "justify-end" : "justify-center"
        }`}
      >
        {isNavBarOn && (
          <span className="hidden lg:inline-block absolute left-0 right-0 m-auto text-center text-lg font-bold text-primary">
            TASK VOTEX
          </span>
        )}
        {/* Nav bar toggle icon button */}
        <NavBarToggleButton />
      </div>

      {/* navigation */}
      <Nav />
      <div>
        <button
          to={"todolist"}
          className=" group text-lg py-2 px-4 flex items-center justify-center rounded-xl mx-auto text-secondary bg-primary hover:bg-redColor hover:text-secondary transition-colors duration-200 bg-inherit cursor-pointer"
          onClick={signOutUser}
        >
          {isNavBarOn && (
            <span className="group-hover:inline-block hidden mr-2 text-md">
              Sign out
            </span>
          )}
          <BiDoorOpen className="text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default NavBar;
