import React, { Component } from 'react'
import './messages.css'

export default class MessageCard extends Component {

    render() {
        return (
            <div key={this.props.message.id} className="card">
                <div className="card-body">
                    <div className="card-title">
                        {this.props.users
                            .filter(user => user.id === this.props.message.user_id)
                            .map(user => 
                            <h5 key={user.id}>{user.username}</h5>)}
                        {/* <h5>{this.props.message.user_id}</h5> */}
                        <p>{this.props.message.message}</p>
                        <div className="buttons">
                            <button className="editBtn">Edit</button>
                            <button onClick={() => this.props.deleteMessage(this.props.message.id)} className="deleteBtn">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
