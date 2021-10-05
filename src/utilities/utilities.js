import { months } from "./constants";

const convertDateISOStringToNormalDate = (dateISOString) => {
  const date = new Date(dateISOString);
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour = date.getHours();
  let minutes = date.getMinutes();
  const AMPM = hour >= 12 ? "PM" : "AM";
  hour = hour % 12;
  hour = hour ? hour : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;

  if (month < 10) {
    month = "0" + month;
  }

  return `${months[month]} ${day}, ${year}, ${hour}:${minutes} ${AMPM}`;
};

const getCurrentTime = () => {
  return Math.round(new Date().getTime() / 1000);
};

const getFormattedTaskData = (task) => {
  return {
    id: task?.id,
    title: task?.title?.rendered,
    outcome: task?.cmb2?.taskbook_rest_metabox?.taskbook_outcome,
    post_level: task?.cmb2?.taskbook_rest_metabox?.taskbook_post_level,
    pre_level: task?.cmb2?.taskbook_rest_metabox?.taskbook_pre_level,
    prediction: task?.cmb2?.taskbook_rest_metabox?.taskbook_prediction,
    status: task?.task_status,
    content: task?.content?.rendered,
    date_created: task?.date,
    date_modified: task?.modified,
  };
};

const getStressLevel = (level) => {
  switch (level) {
    case "1":
      return "Very stressed";
    case "2":
      return "Somewhat stressed";
    case "3":
      return "Neutral";
    case "4":
      return "Somewhat relaxed";
    case "5":
      return "Very relaxed";
    default:
      break;
  }
};

export {
  convertDateISOStringToNormalDate,
  getCurrentTime,
  getFormattedTaskData,
  getStressLevel,
};
