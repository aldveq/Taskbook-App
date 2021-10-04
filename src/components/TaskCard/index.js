import React from "react";
import { Link } from "react-router-dom";
import { convertDateISOStringToNormalDate } from "../../utilities/utilities";

const TaskCard = ({id, title, date_modified, status}) => {
  return (
    <div className="bg-gray-200 flex flex-wrap p-5 rounded-md">
      <div className="w-full md:w-4/5">
        <p className="mb-1 font-bold text-lg" dangerouslySetInnerHTML={{__html: title}}></p>
        <p className="text-sm">{`Task updated on ${convertDateISOStringToNormalDate(date_modified)}`}</p>
      </div>
      <div className="w-full xl:w-1/5 flex justify-start xl:justify-end items-center order-first xl:order-none mb-2 xl:mb-0">
        <span className="text-sm bg-yellow-500 text-white p-2" dangerouslySetInnerHTML={{__html: status}}></span>
      </div>
      <div className="w-full flex justify-end items-center mt-4">
        <Link className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center" to={`/tasks/${id}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
            <path
              fillRule="evenodd"
              d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-sm ml-1">View</span>
        </Link>
        <Link className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center ml-2" to={`/tasks/edit/${id}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
          <span className="text-sm ml-1">Edit</span>
        </Link>
      </div>
    </div>
  );
};

export default TaskCard;
