import React, { Component } from 'react';
// import { Link } from "react-router-dom";

export default class TaskForm extends Component {
    // Set initial state
    state = {
        taskName: "",
        completionDate: "",
        userId: Number(sessionStorage.getItem("credentials")),
        completionStatus: ""
    };

    // Update state whenever an input field is edited
    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };


    constructNewTask = evt => {
        if (this.state.taskName === "" || this.state.completionDate === "") {
            window.alert("Please fill out all fields!");
        } else {
        evt.preventDefault();
        const task = {
            taskName: this.state.taskName,
            completionDate: this.state.completionDate,
            userId: Number(sessionStorage.getItem("credentials")),
            completionStatus: this.state.completionStatus
        };

        // Create the task and redirect user to tasks
        this.props
            .addTask(task)
            .then(() => this.props.history.push("/tasks"));

    };
}

    render() {
        return (
            <React.Fragment>
                <form className="taskForm">
                    <div className="form-group">
                        <label htmlFor="taskName">Task name</label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            onChange={this.handleFieldChange}
                            id="taskName"
                            placeholder="Task name"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="completionDate">Completion Date</label>
                        <input
                            type="date"
                            required
                            className="form-control"
                            onChange={this.handleFieldChange}
                            id="completionDate"
                            placeholder="completionDate"
                        />
                    </div>
                    {/* <div className="form-group">
                        <label htmlFor="taskName">Completed</label>
                        <input type="checkbox"
                        name="completed"
                        value=""
                        id="completionStatus"/>
                    </div> */}
                    <button
                        type="submit"
                        onClick={this.constructNewTask}
                        className="btn btn-primary"
                    >
                        Submit
          </button>
                </form>
            </React.Fragment>
        );
    }
}