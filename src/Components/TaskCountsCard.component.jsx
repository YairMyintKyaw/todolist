import React from "react";
import CountUp from "react-countup/build/";

const TaskCountsCard = ({ name, count }) => {
  return (
    <div className="flex-1 flex flex-col justify-center items-center gap-1 min-w-[150px] h-36 border-1 shadow-md border-primary rounded bg-secondary  transition-all relative bottom-0 hover:bottom-2 hover:shadow-lg">
      <span className="text-xl">{name}</span>
      <CountUp className="text-2xl" end={count} />
    </div>
  );
};

export default TaskCountsCard;
