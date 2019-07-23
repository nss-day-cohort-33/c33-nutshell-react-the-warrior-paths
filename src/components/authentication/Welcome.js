import React, { Component } from 'react'
import { Link } from "react-router-dom"
export default class Login extends Component {
    render() {
        return (
            <div>
              <h2>Welcome</h2>
              <Link className="nav-link" to= "/register"><button>Register</button></Link>
              <Link className="nav-link" to= "/login"
              > <button>Login</button></Link>
            </div>
        )
    }
}
