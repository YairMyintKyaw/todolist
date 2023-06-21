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
        isNavBarOn ? "w-1/6" : "w-[80px]"
      } h-screen flex flex-col pb-3 text-primary border-r border-r-primary  bg-secondary rounded-tr-lg overflow-hidden transition-all duration-300`}
    >
      {/* Nav bar toggle icon button */}
      <NavBarToggleButton />
      {/* navigation */}
      <Nav />
      <div>
        <button
          to={"todolist"}
          className="text-lg py-2 px-4 flex items-center justify-center rounded-xl mx-auto text-secondary bg-primary hover:bg-redColor hover:text-secondary transition-colors duration-200 bg-inherit cursor-pointer"
          onClick={signOutUser}
        >
          {isNavBarOn && <span className="mr-2 text-md">Sign out</span>}
          <BiDoorOpen className="text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default NavBar;
