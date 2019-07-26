import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
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
import NewsForm from "./news/NewsForm";
import NewsEditForm from "./news/NewsEditForm";
import EventsForm from "./event/eventsForm"
import Events from "./event/Events"
import EditForm from "./event/editForm";

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
    APIManager.getAll("tasks")
      .then(tasks => (newState.tasks = tasks))
    APIManager.getAll("events")
      .then(events => (newState.events = events))
    fetch("http://localhost:5002/messages?_expand=user")
      .then(r => r.json())
      .then(message => newState.messages = message)
      .then(fetch("http://localhost:5002/users")
        .then(r => r.json()))
      .then(user => newState.users = user)
      .then(() => this.setState(newState))
  }


  isAuthenticated = () => sessionStorage.getItem("credentials") !== null
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

  addMessage = (data) => {
    APIManager.post("messages", data)
      .then(() => APIManager.getAll("messages?_expand=user"))
      .then(messages =>
        this.setState({
          messages: messages
        })
      )
  }

  deleteMessage = (id) => {
    return APIManager.delete("messages", id)
      .then(() => APIManager.getAll("messages?_expand=user"))
      .then(message => {
        this.setState({ messages: message });
      });
  };

  editMessage = (id) => {
    return APIManager.msgPut("messages", id)
      .then(() => APIManager.getAll("messages?_expand=user"))
      .then(message => {
        this.setState({ messages: message });
      });
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

  updateArticle = (editedArticle, id) => {
    return APIManager.newsPut("news", editedArticle, id)
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
          path="/messages"
          render={props => {
            if (this.isAuthenticated()) {
              return (
                <Messages messages={this.state.messages}
                  addMessage={this.addMessage}
                  deleteMessage={this.deleteMessage}
                  editMessage={this.editMessage}
                  users={this.state.users} />
              )
            } else {
              return <Redirect to="/welcome" />
            }
          }}
        />
        <Route exact path="/news" render={props => {
          // if (this.isAuthenticated()) {
          return (
            <News {...props} deleteArticle={this.deleteArticle} news={this.state.news}
            />
          );
          // } else {
          //   return <Redirect to="/" />;
          // }
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
            return <Register {...props} users={this.state.users} addUser={this.addUser} />
          }}
        />

        <Route
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
          }}
        />



        <Route
          exact path="/events" render={props => {
            return <Events {...props} deleteEvent={this.deleteEvent} events={this.state.events} />
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
          }}
        />

        <Route path="/login" component={Login} />
      </React.Fragment>
    );
  }
}

export default withRouter(ApplicationViews)
