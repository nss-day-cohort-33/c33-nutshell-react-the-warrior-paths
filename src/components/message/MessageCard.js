import React, { Component } from 'react'
import EditableLabel from 'react-inline-editing'
import './messages.css'

export default class MessageCard extends Component {
    constructor() {
        super()

        this._handleFocusOut = this._handleFocusOut.bind(this)
    }

    _handleFocusOut(text) {
        console.log(text)
        const newMsg = {
            userId: +sessionStorage.getItem("credentials"),
            message: text,
            id: this.props.message.id
        }
        this.props.editMessage(newMsg)
    }

    isUser = props => {
        return (
            <React.Fragment>
                <EditableLabel text={this.props.message.message} onFocusOut={this._handleFocusOut}>
                    {this.props.message.message}
                </EditableLabel>
                <button onClick = {() => this.props.deleteMessage(this.props.message.id)}>
                    Delete
                </button>
            </React.Fragment>
        )
    }

    isNotUser = props => {
        return <label>{this.props.message.message}</label>
    }

    checkEdit = props => {
        let id = props.id;
        let currentUser = +sessionStorage.getItem("credentials");
        if( currentUser === id) {
            return <this.isUser />
        } else {
            return <this.isNotUser />
        }
    }

    render() {
        return (
            <div key={this.props.message.id} className="card">
                <div className="card-body">
                    <div className="card-title">
                        <h5>{this.props.message.user.username}</h5>
                        <this.checkEdit id={this.props.message.userId}></this.checkEdit>
                        {/* <EditableLabel text={this.props.message.message} onFocusOut={this._handleFocusOut}>
                            {this.props.message.message}
                        </EditableLabel> */}
                        <div className="buttons">
                            {/* <button onClick={() => this.props.deleteMessage(this.props.message.id)} className="deleteBtn">Delete</button> */}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
