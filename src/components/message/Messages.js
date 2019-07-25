import React, { Component } from "react";
import MessageCard from "./MessageCard"

export default class Message extends Component {

    render() {
      return (
       <React.Fragment>
           <section className="messages">
               {this.props.messages.map( message => (
                   <MessageCard key={message.id} message={message} />
               ))}
           </section>
       </React.Fragment>
      );
    }
  }
