import React from "react";
import CountUp from "react-countup/build/";

const TaskCountsCard = ({ name, count }) => {
  return (
    <div className="flex-1 flex flex-col justify-center items-center gap-1 h-36 border border-black rounded bg-secondary">
      <span className="text-xl">{name}</span>
      <CountUp className="text-2xl" end={count} />
    </div>
  );
};

export default TaskCountsCard;
