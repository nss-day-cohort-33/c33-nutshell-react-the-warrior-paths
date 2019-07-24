import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import APIManager from '../../modules/APIManager';

class Register extends Component {

    state = {
        username: "",
        email: "",
        password: ""
    }

    addUser = user => {
        return APIManager.post("users", user)
          .then(() => APIManager.getAll("users"))
          .then(users =>
            this.setState({
              users: users
            })
          );
      };       

    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        console.log(stateToChange)
        this.setState(stateToChange)
    }

    saveUser = event => {
        event.preventDefault()
        const user = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        }
        this.addUser(user)
            .then(() => sessionStorage.setItem(
                "credentials",
                JSON.stringify({
                    username: this.state.username,
                    email: this.state.email,
                    password: this.state.password
                })
            ))
            .then(() => this.props.history.push('/news'))
    }


    render() {
        return (

            <form>
             <label>Username</label>
             <input onChange={this.handleFieldChange} type="text" id="username"></input>
             <label>Email</label>
             <input onChange={this.handleFieldChange} type="text" id="email"></input>
             <label>Password</label>
             <input onChange={this.handleFieldChange} type="password" id="password"></input>
             <button onClick={this.saveUser} type="submit">register</button>
            </form>

        )
    }
}

export default withRouter(Register)