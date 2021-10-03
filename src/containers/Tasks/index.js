import React, { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Navigation, TaskCard } from "../../components";
import { sessionToken } from "../../utilities/constants";
import { TaskbookThirdService } from "../../utilities/taskbook-third-service";

const Tasks = ({ history }) => {
  const location = useLocation();
  const queryString = location.hash.substr(1);
  const urlParams = new URLSearchParams(queryString);
  const tokenParam = urlParams.get("access_token") || null; // Token from the URL params

  const currentTime = Math.round(new Date().getTime() / 1000); // Current Time
  const tokenExpiry = sessionStorage.getItem("tokenExpiry") || null; // Token Expiry Time

  const [tasks, setTasks] = useState([]);

  const getTasks = useCallback(async () => {
    const taskbookThirdService = new TaskbookThirdService(tokenParam);
    const tasks = await taskbookThirdService.getTasksbooks();
    return tasks;
  }, [tokenParam]);

  useEffect(() => {
    if (tokenExpiry !== null && currentTime > tokenExpiry) {
      sessionStorage.removeItem(sessionToken.name);
      history.push("/");
      return;
    }

    if (tokenParam !== null) {
      sessionStorage.setItem(sessionToken.name, tokenParam);
      sessionStorage.setItem(
        "tokenExpiry",
        Math.round(new Date().getTime() / 1000) + 3600
      );
      window.history.pushState({}, document.title, "/tasks");

      getTasks()
        .then((results) => {
          setTasks(results);
          console.log(results);
        })
        .catch((error) => alert(`An error ocurred: ${error}`));

      return;
    }
  }, [tokenParam, history, currentTime, tokenExpiry, getTasks]);

  const drawTaskList = () => {
      if(tasks.length === 0) {
          return <h1>You don't have registered tasks. Please, insert a new one.</h1>
      }

      return tasks.map(tk => <TaskCard key={tk.id} {...tk} />);
  }

  return (
    <>
      <Navigation />
      <div className="container mx-auto py-10 lg:max-w-7xl px-5">
        <h1 className="font-bold text-3xl mb-5">Tasks</h1>
        <div className="grid grid-cols-1 grid-rows-1 md:grid-cols-3 md:grid-rows-3 xl:grid-cols-2 gap-4 xl:gap-8">
          {drawTaskList()}
        </div>
      </div>
    </>
  );
};

export default Tasks;
