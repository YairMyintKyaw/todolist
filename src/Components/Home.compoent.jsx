import React from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const { displayName } = useSelector((state) => state.user);
  const date = new Date();

  return (
    <>
      <header className="flex justify-between items-center p-10">
        <div className=" ">
          <div className="text-4xl">Hello, {displayName}</div>
          <div className="text-2xl">
            {date.getMonth() + 1}/{date.getDate()}/{date.getFullYear()}
          </div>
        </div>
      </header>
      <div className="bg-secondary flex-1 text-primary">Home</div>
    </>
  );
};

export default Home;
