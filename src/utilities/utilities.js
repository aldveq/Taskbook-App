import { months } from "./constants";

const convertDateISOStringToNormalDate = (dateISOString) => {
  const date = new Date(dateISOString);
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour = date.getHours();
  let minutes = date.getMinutes();
  const AMPM = hour >= 12 ? 'PM' : 'AM';
  hour = hour % 12;
  hour = hour ? hour : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;

  if (month < 10) {
    month = "0" + month;
  }

  return `${months[month]} ${day}, ${year}, ${hour}:${minutes} ${AMPM}`;
};

export {convertDateISOStringToNormalDate};