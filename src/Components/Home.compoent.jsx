import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TaskCountsCard from "./TaskCountsCard.component";
import LineChart from "./LineChart.component";
import PieChart from "./PieChart.component";

const Home = () => {
  const { displayName, todoList } = useSelector((state) => state.user);
  const [projectNumber, setProjectNumber] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [notFinishedTask, setNotFinishedTask] = useState([]);
  const [inProgressTask, setInProgressTask] = useState([]);
  const [finishedTask, setFinishedTask] = useState([]);
  const [lastSevenDayTaskCount, setLastSevenDayTaskCount] = useState([]);

  const date = new Date();
  useEffect(() => {
    const tasks = [];
    let projectCount = 0;
    for (const project in todoList) {
      ++projectCount;
      for (const task of todoList[project]) {
        tasks.push(task);
      }
    }
    setTasks(tasks);
    setProjectNumber(projectCount);
  }, [todoList]);

  useEffect(() => {
    setNotFinishedTask(tasks.filter((task) => task.state === "not started"));
    setInProgressTask(tasks.filter((task) => task.state === "in progress"));
    setFinishedTask(tasks.filter((task) => task.state === "done"));
  }, [tasks]);

  useEffect(() => {
    if (finishedTask.length > 0) {
      const today = new Date(Date.now());
      const currentYear = today.getFullYear();
      const currentMonth = today.getMonth();
      const currentDay = today.getDate();
      const previousDaysTaskCount = [];
      for (let i = 6; i >= 0; i--) {
        const date = new Date(
          currentYear,
          currentMonth,
          currentDay - i
        ).toDateString();
        previousDaysTaskCount.push(
          finishedTask.filter(
            (task) => new Date(task.updatedTime).toDateString() === date
          ).length
        );
      }
      setLastSevenDayTaskCount(previousDaysTaskCount);
    }
  }, [finishedTask]);
  return (
    <div className="flex flex-col flex-1 overflow-y-scroll ">
      <header className="flex justify-between items-center p-10">
        <div className=" ">
          <div className="text-4xl">Hello, {displayName}</div>
          <div className="text-2xl">
            {date.getMonth() + 1}/{date.getDate()}/{date.getFullYear()}
          </div>
        </div>
      </header>
      <div className="bg-secondary text-primary flex-1">
        <div className="flex gap-4 px-4 relative bottom-6 justify-around">
          <TaskCountsCard name="Projects" count={projectNumber} />
          <TaskCountsCard name="Tasks" count={tasks.length} />
          <TaskCountsCard name="Not Started" count={notFinishedTask.length} />
          <TaskCountsCard name="In Progress" count={inProgressTask.length} />
          <TaskCountsCard name="Finished" count={finishedTask.length} />
        </div>
        <div className="flex">
          <div className="w-2/3">
            <LineChart countData={lastSevenDayTaskCount} />
          </div>
          <div className="w-1/3">
            <PieChart
              taskCountArray={[
                notFinishedTask.length,
                inProgressTask.length,
                finishedTask.length,
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
