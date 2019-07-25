import React, { Component } from "react";
import MessageCard from "./MessageCard"

export default class Message extends Component {

  state = {
    user_id: +sessionStorage.getItem("credentials"),
    message: ""
  }

  handleFieldChange = evt => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    console.log(stateToChange)
    this.setState(stateToChange)
  }

  handleClick = e => {
    e.preventDefault()
    console.log("clicked")
    const message = {
      user_id: this.state.user_id,
      message: this.state.message
    }
    console.log("state change", message)
    this.props.addMessage(message)
  }

  render() {
    return (
      <React.Fragment>
        <section className="messages">
          {this.props.messages
            // .filter(msg => msg.user_id === users.id)
            // .filter(message => message.user_id === parseInt(sessionStorage.getItem("credentials")))
            .map(message => (
              <div key={message.id}>
                <MessageCard message={message} {...this.props} />
              </div>
            ))}
        </section>
        <input id="message" onChange={this.handleFieldChange} type="text" />
        <button onClick={this.handleClick} type="submit">Send</button>
      </React.Fragment>
    );
  }
}
