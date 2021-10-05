import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "../containers/Login";
import NewTask from "../containers/NewTask";
import Review from "../containers/Review";
import Task from "../containers/Task";
import Tasks from "../containers/Tasks";

export const TaskbookAppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/tasks" component={Tasks} />
        <Route exact path="/tasks/:id">
          <Task action="view" />
        </Route>
        <Route exact path="/tasks/edit/:id">
          <Task action="edit" />
        </Route>
        <Route exact path="/new-task" component={NewTask} />
        <Route exact path="/review" component={Review} />
        <Route exact path="/login" component={Login} />
        <Redirect exact from="/" to="/login" />
      </Switch>
    </Router>
  );
};

export default TaskbookAppRouter;
