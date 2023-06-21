import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";
import { toggleNavBar, toggleProjectDropdown } from "../Store/dashboardSlice";

const NavBarToggleButton = () => {
  const { isNavBarOn } = useSelector((state) => state.dashboard);
  const dispatch = useDispatch();

  const toggleNavState = () => {
    if (isNavBarOn) {
      dispatch(toggleNavBar(false));
      dispatch(toggleProjectDropdown(false));
    } else {
      dispatch(toggleNavBar(true));
    }
  };

  return (
    <div
      className={`${
        isNavBarOn ? "justify-end" : "justify-center"
      } text-2xl flex   text-end p-5`}
    >
      {isNavBarOn ? (
        <span className="cursor-pointer" onClick={toggleNavState}>
          <RxCross1 />
        </span>
      ) : (
        <span className="cursor-pointer" onClick={toggleNavState}>
          <RxHamburgerMenu />
        </span>
      )}
    </div>
  );
};

export default NavBarToggleButton;
