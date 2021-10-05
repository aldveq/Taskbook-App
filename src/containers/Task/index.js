import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Navigation, SingleTaskData } from "../../components";
import { sessionToken } from "../../utilities/constants";
import { TaskbookThirdService } from "../../utilities/taskbook-third-service";
import { getCurrentTime } from "../../utilities/utilities";
import MainContainer from "../MainContainer";

const Task = ({ history, action }) => {
  const { id } = useParams();
  const [task, setTask] = useState({});
  const tokenSession = sessionStorage.getItem(sessionToken.name) || null;
  const tokenExpiry = sessionStorage.getItem("tokenExpiry") || null;
  const currentTime = getCurrentTime();

  const closeSession = useCallback(() => {
    sessionStorage.removeItem(sessionToken.name);
    sessionStorage.removeItem("tokenExpiry");
    history.push("/login");
  }, [history]);

  const getTaskData = useCallback(() => {
    if (tokenSession === null || currentTime > tokenExpiry) {
      closeSession();
      return;
    }

    const taskbookThirdService = new TaskbookThirdService(tokenSession);
    const taskData = taskbookThirdService.getSingleTask(id);
    return taskData;
  }, [id, tokenSession, currentTime, tokenExpiry, closeSession]);

  useEffect(() => {
    getTaskData()
      .then((data) => {
        setTask(data);
      })
      .catch((error) =>
        alert(`An error has ocurred with your request: ${error}`)
      );
  }, [setTask, getTaskData]);

  const drawTask = () => {
    if (task.constructor !== Object && Object.entries(task).length === 0) {
      return <h1>There is no data to display!</h1>;
    }

    return <SingleTaskData action={action} {...task} />;
  };

  return (
    <>
      <Navigation />
      <MainContainer>{drawTask()}</MainContainer>
    </>
  );
};

export default Task;
