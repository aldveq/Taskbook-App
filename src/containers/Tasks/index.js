import React, { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { MainTitle, Navigation, TaskCard } from "../../components";
import { sessionToken } from "../../utilities/constants";
import { TaskbookThirdService } from "../../utilities/taskbook-third-service";
import { getCurrentTime } from "../../utilities/utilities";
import MainContainer from "../MainContainer";

const Tasks = ({ history }) => {
  const location = useLocation();
  const queryString = location.hash.substr(1);
  const urlParams = new URLSearchParams(queryString);
  const tokenParam = urlParams.get("access_token") || null; // Token from the URL params

  const currentTime = getCurrentTime(); // Current Time
  const tokenExpiry = sessionStorage.getItem("tokenExpiry") || null; // Token Expiry Time
  const tokenSession = sessionStorage.getItem(sessionToken.name) || null; // Token Session

  const [tasks, setTasks] = useState([]);

  const getTasks = useCallback(async () => {
    if (tokenParam !== null) {
      const taskbookThirdService = new TaskbookThirdService(tokenParam);
      const tasks = await taskbookThirdService.getTasksbooks();
      return tasks;
    }

    if (tokenSession !== null) {
      const taskbookThirdService = new TaskbookThirdService(tokenSession);
      const tasks = await taskbookThirdService.getTasksbooks();
      return tasks;
    }
  }, [tokenParam, tokenSession]);

  useEffect(() => {
    if (tokenExpiry !== null && currentTime > tokenExpiry) {
      sessionStorage.removeItem(sessionToken.name);
      sessionStorage.removeItem("tokenExpiry");
      history.push("/");
      return;
    }

    if (tokenParam !== null) {
      sessionStorage.setItem(sessionToken.name, tokenParam);
      sessionStorage.setItem("tokenExpiry", getCurrentTime() + 3600);
      window.history.pushState({}, document.title, "/tasks");

      getTasks()
        .then((results) => {
          setTasks(results);
        })
        .catch((error) => alert(`An error ocurred: ${error}`));

      return;
    }

    if (tokenSession !== null) {
      getTasks()
        .then((results) => {
          setTasks(results);
        })
        .catch((error) => alert(`An error ocurred: ${error}`));

      return;
    }
  }, [tokenParam, tokenSession, history, currentTime, tokenExpiry, getTasks]);

  const drawTaskList = () => {
    if (tasks.length === 0) {
      return (
        <h1>You don't have registered tasks. Please, insert a new one.</h1>
      );
    }

    return tasks.map((tk) => <TaskCard key={tk.id} {...tk} />);
  };

  return (
    <>
      <Navigation />
      <MainContainer>
        <MainTitle title="Tasks" />
        <div className="grid grid-cols-1 grid-rows-1 md:grid-cols-3 md:grid-rows-3 xl:grid-cols-2 gap-4 xl:gap-8">
          {drawTaskList()}
        </div>
      </MainContainer>
    </>
  );
};

export default Tasks;
