import React, { Component } from "react";
import "./News.css"

export default class NewsForm extends Component {
    state = {
        userId: "",
        title: "",
        url: "",
        synopsis: ""
    };

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
      };

    addNewArticle = evt => {
        evt.preventDefault();
          const article = {
            userId: +(sessionStorage.getItem("current_user")),
            title: this.state.title,
            url: this.state.url,
            synopsis: this.state.synopsis,
            timeStamp: Date.now()
          }
        this.props.addArticle(article)
            .then(() => this.props.history.push("/news"));
    }

    render() {
        return (
        <React.Fragment>
            <form className="newsForm">
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                type="text"
                required
                className="form-control"
                onChange={this.handleFieldChange}
                id="title"
                placeholder="title"
                />
            </div>
            <div className="form-group">
                <label htmlFor="url">URL</label>
                <input
                    type="text"
                    required
                    className="form-control"
                    onChange={this.handleFieldChange}
                    id="url"
                    placeholder="URL"
                />
            </div>
            <div className="form-group">
                <label htmlFor="synopsis">Synopsis</label>
                <input
                    type="text"
                    required
                    className="form-control"
                    onChange={this.handleFieldChange}
                    id="synopsis"
                    placeholder="Synopsis"
                />
            </div>
            <button
                type="submit"
                onClick={this.addNewArticle}
                className="btn btn-primary"
            >
                Submit
            </button>
            </form>
        </React.Fragment>
        );
    };
}

