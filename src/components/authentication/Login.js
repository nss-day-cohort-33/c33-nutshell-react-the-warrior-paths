import React, { Component } from 'react'

export default class Login extends Component {
    render() {
        return (
            <div>
             <label>Username</label>
             <input type="text"></input>
             <label>Password</label>
             <input type="password"></input>
             <button>login</button>
            </div>
        )
    }
}
