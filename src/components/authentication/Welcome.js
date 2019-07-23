import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class Welcome extends Component {
    render() {
        return (
            <div>
                <h2>Welcome!</h2>
                <Link to="/register"><button>Register</button></Link>
                <Link to="/login"><button>Login</button></Link>
            </div>
        )
    }
}