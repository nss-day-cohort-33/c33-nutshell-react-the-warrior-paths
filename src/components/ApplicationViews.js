import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import Welcome from "./authentication/Welcome";
import Login from "./authentication/Login";
import Register from "./authentication/Register";
import News from "./news/News";
import APIManager from "../modules/APIManager";
import Messages from "./message/Messages";
import TaskForm from "./task/TaskForm";
import TaskList from "./task/TaskList";
import TaskEditForm from "./task/TasksEditForm"

export default class ApplicationViews extends Component {
  state = {
    events: [],
    messages: [],
    tasks: [],
    news: []
  };

  componentDidMount() {
    const newState = {};

    //   fetch("http://localhost:5002/messages")
    //     .then(r => r.json())
    //     .then(message => newState.messages = message)
    //     .then(fetch("http://localhost:5002/users")
    //     .then(r => r.json()))
    //     .then(user => newState.users = user)
    //     .then(() => this.setState(newState))
    // }

    APIManager.getAll("tasks")
      .then(tasks => (newState.tasks = tasks))
      // }).then(() => APIManager.getAll("events").then(events => {
      //   newState.events = events
      // })).then(() => APIManager.getAll("articles").then(articles => {
      //   newState.articles = articles
      // })).then(() => APIManager.getAll("messages").then(messages => {
      //   newState.messages = message
      // })).then(() => APIManager.getAll("users").then(users => {
      //   newState.users = users
      //}))
      .then(() => this.setState(newState));
  }

  isAuthenticated = () => sessionStorage.getItem("credentials") !== null;

  addTask = task => {
    return APIManager.post("tasks", task) //do i need to do return here?
      .then(() => APIManager.getAll("animalsFromAPI"))
      .then(tasks =>
        this.setState({
          tasks: tasks
        })
      );
  };

  editTask = editedTaskObject => {
    return APIManager.put("tasks", editedTaskObject)
      .then(() => APIManager.getAll("tasks"))
      .then(tasks => {
        // console.log(tasks)
        this.setState({
          tasks: tasks
        });
      });
  };

  deleteTask = id => {
    return APIManager.delete("tasks", id)
      .then(() => APIManager.getAll("tasks"))
      .then(tasks => {
        this.props.history.push("/tasks");
        this.setState({ tasks: tasks });
      });
  };

  render() {
    return (
      <React.Fragment>
        <Route
          exact
          path="/"
          render={props => {
            return <Welcome />;
            // Remove null and return the component which will show news articles
          }}
        />

        <Route
          exact
          path="/news"
          render={props => {
            if (this.isAuthenticated()) {
              return <News users={this.state.users} />;
            } else {
              return <Redirect to="/login" />;
            }
          }}
        />

        <Route
          exact
          path="/register"
          render={props => {
            return (
              <Register
                {...props}
                users={this.state.users}
                addUser={this.addUser}
              />
            );
          }}
        />

        <Route
          path="/friends"
          render={props => {
            return null;
          }}
        />

        <Route
          path="/messages"
          render={props => {
            return (
              <Messages
                messages={this.state.messages}
                users={this.state.users}
              />
            );
          }}
        />

        <Route
          exact
          path="/tasks"
          render={props => {
            return (
              <TaskList
                {...props}
                tasks={this.state.tasks}
                deleteTask={this.deleteTask}

              />
            );
          }}
        />
        <Route
          exact
          path="/tasks/new"
          render={props => {
            return <TaskForm {...props} addTask={this.addTask} />;
          }}
        />
        <Route
          path="/tasks/:taskId(\d+)/edit"
          render={props => {
            return (
              <TaskEditForm
                {...props}
                editTask={this.editTask}
                tasks={this.state.tasks}
              />
            );
          }}
        />

        <Route path="/login" component={Login} />
      </React.Fragment>
    );
  }
}
