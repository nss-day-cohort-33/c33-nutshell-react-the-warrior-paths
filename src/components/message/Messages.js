import React, { Component } from "react";
import MessageCard from "./MessageCard"

export default class Message extends Component {

  state = {
    userId: +sessionStorage.getItem("credentials"),
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
      userId: this.state.userId,
      message: this.state.message
    }
    console.log("state change", message)
    this.props.addMessage(message)
  }

  render() {
    return (
      <React.Fragment>
        <div>
          <section className="messages">
            {this.props.messages
              // .filter(msg => msg.userId === users.id)
              // .filter(message => message.userId === parseInt(sessionStorage.getItem("credentials")))
              .map(message => (
                <div key={message.id}>
                  <MessageCard message={message} {...this.props} />
                </div>
              ))}
          </section>
        </div>
        <div className="addMsg">
          <input id="message" onChange={this.handleFieldChange} type="text" />
          <button onClick={this.handleClick} type="submit" className="sendBtn">Send</button>
        </div>
      </React.Fragment>
    );
  }
}
