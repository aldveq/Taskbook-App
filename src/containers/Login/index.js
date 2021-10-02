import React, { useEffect } from "react";
import { taskbookAuthUri, taskbookClientId, taskbookResponseType } from "../../utilities/config";
import { sessionToken } from "../../utilities/constants";


const Login = ({history}) => {

  const token = sessionStorage.getItem(sessionToken.name);
  const currentTime = Math.round(new Date().getTime() / 1000); // Current Time
  const tokenExpiry = sessionStorage.getItem("tokenExpiry");

  useEffect(() => {

    if( (token !== null && tokenExpiry !== null) && (currentTime < tokenExpiry) ) {
      history.push('/dashboard');
    } else {
      sessionStorage.removeItem(sessionToken.name);
      sessionStorage.removeItem('tokenExpiry');
    }
    
  }, [history, token, currentTime, tokenExpiry]);

  const handlerLogin = (e) => {
    e.preventDefault();

    if (window) {
        window.location = `${taskbookAuthUri}?client_id=${taskbookClientId}&response_type=${taskbookResponseType}`;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="flex flex-col justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
            />
          </svg>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Taskbook App
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Please, log into your WordPress account
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handlerLogin}>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
