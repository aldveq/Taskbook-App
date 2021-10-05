import React from "react";
import {
  convertDateISOStringToNormalDate,
  getStressLevel,
} from "../../utilities/utilities";

const SingleTaskData = ({
  action,
  title,
  date_created,
  date_modified,
  content,
  prediction,
  pre_level,
  outcome,
  post_level,
}) => {
    console.log('action: ', action)
  const drawOutcome = () => {
    if (action === "view")
      return <p dangerouslySetInnerHTML={{ __html: outcome }}></p>;

    return (
      <div>
        <textarea
          className="p-5 w-full h-32"
          placeholder="What actually happened?"
        ></textarea>
      </div>
    );
  };

  const drawStressLevel = () => {
    if (action === "view") {
      return (
        <>
          <h2 className="font-bold text-base lg:text-2xl mb-2">
            Post-task stress level
          </h2>
          <hr />
          <p>{getStressLevel(post_level)}</p>
        </>
      );
    }

    return (
      <>
        <h2 className="font-bold text-base lg:text-2xl mb-2">
          Actual stress level
        </h2>
        <hr />
        <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
          <fieldset>
            <div className="mt-4 space-y-4">
              <div className="flex items-center">
                <input
                  id="very-stressed-radio"
                  name="stress-level-radio"
                  type="radio"
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                />
                <label
                  htmlFor="very-stressed-radio"
                  className="ml-3 block text-sm font-medium text-gray-700"
                >
                  Very stressed
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="somewhat-stressed-radio"
                  name="stress-level-radio"
                  type="radio"
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                />
                <label
                  htmlFor="somewhat-stressed-radio"
                  className="ml-3 block text-sm font-medium text-gray-700"
                >
                  Somewhat stressed
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="push-nothing"
                  name="stress-level-radio"
                  type="radio"
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                />
                <label
                  htmlFor="push-nothing"
                  className="ml-3 block text-sm font-medium text-gray-700"
                >
                  Neutral
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="somewhat-relaxed-radio"
                  name="stress-level-radio"
                  type="radio"
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                />
                <label
                  htmlFor="somewhat-relaxed-radio"
                  className="ml-3 block text-sm font-medium text-gray-700"
                >
                  Somewhat relaxed
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="very-relaxed-radio"
                  name="stress-level-radio"
                  type="radio"
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                />
                <label
                  htmlFor="very-relaxed-radio"
                  className="ml-3 block text-sm font-medium text-gray-700"
                >
                  Very relaxed
                </label>
              </div>
            </div>
          </fieldset>
        </div>
      </>
    );
  };

  return (
    <div className="bg-gray-200 rounded-md w-full p-5">
      <div className="mb-4">
        <h1
          className="font-bold text-base lg:text-4xl mb-2"
          dangerouslySetInnerHTML={{ __html: title }}
        ></h1>
        <p className="text-gray-600">{`Task created on ${convertDateISOStringToNormalDate(
          date_created
        )}`}</p>
        <p className="text-gray-600">{`Task updated on ${convertDateISOStringToNormalDate(
          date_modified
        )}`}</p>
        <p className="my-6" dangerouslySetInnerHTML={{ __html: content }}></p>
      </div>

      <div className="mb-4">
        <h2 className="font-bold text-base lg:text-2xl mb-2">
          Task Prediction
        </h2>
        <hr />
        <p dangerouslySetInnerHTML={{ __html: prediction }}></p>
      </div>

      <div className="mb-4">
        <h2 className="font-bold text-base lg:text-2xl mb-2">
          Pre-task stress level
        </h2>
        <hr />
        <p>{getStressLevel(pre_level)}</p>
      </div>

      <div className="mb-4">
        <h2 className="font-bold text-base lg:text-2xl mb-2">Outcome</h2>
        <hr />
        {drawOutcome()}
      </div>

      <div className="mb-4">{drawStressLevel()}</div>
    </div>
  );
};

export default SingleTaskData;
