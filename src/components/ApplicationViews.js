import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
<<<<<<< HEAD
import { withRouter } from 'react-router'
import Welcome from "./authentication/Welcome";
import Login from "./authentication/Login";
import Register from "./authentication/Register";
import News from "./news/News";
import APIManager from "../modules/APIManager";
import Messages from "./message/Messages";
import TaskForm from "./task/TaskForm";
import TaskList from "./task/TaskList";
import TaskEditForm from "./task/TasksEditForm"

 class ApplicationViews extends Component {
  state = {
    events: [],
    messages: [],
    tasks: [],
    news: [],
    users: []
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
      // }))
      .then(() => APIManager.getAll("users").then(users => {
        newState.users = users
      }))
      .then(() => this.setState(newState));
  }

  isAuthenticated = () => sessionStorage.getItem("credentials") !== null;
  activeUserId = () => parseInt(sessionStorage.getItem("credentials"))

  addTask = task => {
    return APIManager.post("tasks", task) //do i need to do return here?
      .then(() => APIManager.getAll("tasks"))
      .then(tasks =>
        this.setState({
          tasks: tasks
        })
      );
  };

  editTask = (editedTaskObject) => {
    return APIManager.put("tasks", editedTaskObject)
      .then(() => APIManager.getAll("tasks"))
      .then(tasks => {
        // console.log(tasks)
        this.setState({
          tasks: tasks
        });
      });
  };

  deleteTask = (id) => {
    return APIManager.delete("tasks", id)
      .then(() => APIManager.getAll("tasks"))
      .then(tasks => {
        // this.props.history.push();
        this.setState({ tasks: tasks });
      });
  };
=======
import Welcome from "./authentication/Welcome"
import Login from "./authentication/Login"
import Register from "./authentication/Register"
import News from './news/News'
import NewsForm from "./news/NewsForm";
import NewsEditForm from "./news/NewsEditForm";
import Messages from './message/Messages'
import APIManager from '../modules/APIManager'
import EventsForm from "./event/eventsForm"
import Events from "./event/Events"
import EditForm from "./event/editForm";

export default class ApplicationViews extends Component {

  state = {
    users: [],
    messages: [],
    news: [],
    events: [],
    tasks: [],
    friends: []
}

componentDidMount() {
    const newState = {};
    APIManager.getAll("events")
    .then(events => (newState.events = events))
    fetch("http://localhost:5002/messages")
      .then(r => r.json())
      .then(message => newState.messages = message)
      .then(fetch("http://localhost:5002/users")
      .then(r => r.json()))
      .then(user => newState.users = user)
      .then(() => this.setState(newState))
    }

  isAuthenticated = () => sessionStorage.getItem("current_user") !== null

// NEWS FUNCTIONS BEGIN
  deleteArticle = id => {
    return APIManager.delete("news", id)
      .then(() => APIManager.getAll("news"))
      .then(news => {
        this.setState({
          news: news
        });
      });
  };

  addArticle = article => {
    return APIManager.post("news", article)
      .then(() => APIManager.getAll("news"))
      .then(news =>
        this.setState({
          news: news
        })
      );
  };

  updateArticle = (editedArticle,id) => {
    return APIManager.newsPut("news",editedArticle,id )
      .then(() => APIManager.getAll("news"))
      .then(news =>
        this.setState({
          news: news
        })
      );
  };
// NEWS FUNCTIONS END
  //  EVENTS FUNCTIONS BEGIN
        addEvent = event => {
            return APIManager.post("events", event)
              .then(() => APIManager.getAll("events"))
              .then(events =>
                this.setState({
                  events: events
                })
              );
        }
        deleteEvent = id => {
          return APIManager.delete("events", id)
            .then(() => APIManager.getAll("events"))
            .then(events => {
              // this.props.history.push("/events");
              this.setState({ events: events });
            });
        };
        editEvent = (editedEventObject) => {
          return APIManager.put("events", editedEventObject)
            .then(() => APIManager.getAll("events"))
            .then(events => {

              this.setState({ events: events });
            });
        };

// EVENT FUNCTIONS END
>>>>>>> 7ee6e68b3bf9062bd7b1f19b146730023327e2c0

  render() {
    return (
      <React.Fragment>
        <Route
<<<<<<< HEAD
          exact
          path="/"
          render={props => {
            return <Welcome />;
=======
          exact path="/" render={props => {
            return <Welcome/>
>>>>>>> 7ee6e68b3bf9062bd7b1f19b146730023327e2c0
            // Remove null and return the component which will show news articles
          }}
        />

<<<<<<< HEAD
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
=======
        <Route
           path="/register" render={props => {
            return <Register/>
            // Remove null and return the component which will show news articles
          }}
        />
        {/* NEWS ROUTES BEGIN */}
         <Route exact path="/news" render={props => {
            if (this.isAuthenticated()) {
              return (
                <News {...props} deleteArticle={this.deleteArticle} news={this.state.news}
                />
              );
            } else {
              return <Redirect to="/" />;
            }
          }}
        />
        <Route exact path="/news/new" render={props => {
            return <NewsForm {...props} addArticle={this.addArticle} />;
          }}
        />
        <Route exact path="/news/:newsId(\d+)/edit" render={props => {
            return <NewsEditForm {...props} updateArticle={this.updateArticle} />
            ;
          }}
        />
        {/* NEWS ROUTES END */}
        <Route
          exact path="/register" render={props => {
            return <Register {...props} users={this.state.users} addUser={this.addUser}/>
>>>>>>> 7ee6e68b3bf9062bd7b1f19b146730023327e2c0
          }}
        />

        <Route
<<<<<<< HEAD
          exact
          path="/tasks"
          render={(props) => {
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
          render={(props) => {
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
=======
          path="/friends" render={props => {
            return null
          }}
        />

        {/* <Route
          path="/messages" render={props => {
            return <Messages messages={this.state.messages}
                  users={this.state.users}/>
          }}
        /> */}

        <Route
          path="/tasks" render={props => {
            return null
          }}
        />
        <Route
          exact path="/events" render={props => {
            return <Events {...props} deleteEvent={this.deleteEvent} events={this.state.events}/>
            // Remove null and return the component which will show the user's tasks
          }}
        />
        <Route
          exact path="/events/eventsform" render={props => {
            return <EventsForm {...props} addEvent={this.addEvent} />
            // Remove null and return the component which will show the user's tasks
          }}
        />
        <Route
          exact path="/events/:eventId(\d+)/edit" render={props => {
            return <EditForm {...props} editEvent={this.editEvent} events={this.state.events} />
            // Remove null and return the component which will show the user's tasks
>>>>>>> 7ee6e68b3bf9062bd7b1f19b146730023327e2c0
          }}
        />

        <Route path="/login" component={Login} />
<<<<<<< HEAD
=======

>>>>>>> 7ee6e68b3bf9062bd7b1f19b146730023327e2c0
      </React.Fragment>
    );
  }
}

<<<<<<< HEAD
export default withRouter(ApplicationViews)
=======
>>>>>>> 7ee6e68b3bf9062bd7b1f19b146730023327e2c0
