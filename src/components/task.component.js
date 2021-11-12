import React, { Component } from "react";
import TaskDataService from "../services/task.service";

export default class Task extends Component {
  constructor(props) {
    super(props);
    this.onChangeTaskname = this.onChangeTaskname.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getTask = this.getTask.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);

    this.state = {
      currentTask: {
        id: null,
        taskname: "",
        taskdesc: "",
        status: ""
      },
      message: "",
      hasTasks: false
    };
  }

  componentDidMount() {
    this.getTask(this.props.match.params.id);
  }

  onChangeTaskname(e) {
    var taskname = e.target.value;

    this.setState(function(prevState) {
      return {
        currentTask: {
          ...prevState.currentTask,
          taskname: taskname
        }
      };
    });
  }

  onChangeDescription(e) {
    var description = e.target.value;
    
    this.setState(prevState => ({
      currentTask: {
        ...prevState.currentTask,
        taskdesc: description
      }
    }));
  }

  getTask(id) {
    TaskDataService.get(id)
      .then(response => {
        this.setState({
          currentTask: response.data.tasks[0]
        });
        console.log(response.data.tasks[0]);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentTask.id,
      title: this.state.currentTask.taskname,
      description: this.state.currentTask.taskdesc,
      published: this.state.currentTask.status
    };

    TaskDataService.update(this.state.currentTask.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentTask: {
            ...prevState.currentTask,
            status: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateTask() {
    TaskDataService.update(
      this.state.currentTask.id,
      this.state.currentTask
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The Task was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteTask() {
    TaskDataService.delete(this.state.currentTask.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/Tasks')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    var { currentTask } = this.state;
    return (
      <div>
        {currentTask ? (
          <div className="edit-form">
            <h4>Task</h4>
            <form>
              <div className="form-group">
                <label htmlFor="taskname">Task Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="taskname"
                  defaultValue={currentTask.taskname}
                  onChange={this.onChangeTaskname}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="taskdesc"
                  defaultValue={currentTask.taskdesc}
                  onChange={this.onChangeDescription}
                />
              </div>

            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteTask}
            >
              Delete
            </button>
            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateTask}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Task...</p>
          </div>
        )}
      </div>
    );
  }
}
