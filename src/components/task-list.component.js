import React, { Component } from "react";
import TaskDataService from "../services/task.service";
import { Link } from "react-router-dom";

export default class TaskList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveTasks = this.retrieveTasks.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTask = this.setActiveTask.bind(this);
    this.removeAllTasks = this.removeAllTasks.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      tasks: [],
      currentTask: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveTasks();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveTasks() {
    TaskDataService.getAll()
      .then(response => {
        this.setState({
          tasks: response.data.tasks
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveTasks();
    this.setState({
      currentTask: null,
      currentIndex: -1
    });
  }

  setActiveTask(task, index) {
    this.setState({
      currentTask: task,
      currentIndex: index
    });
  }

  removeAllTasks() {
    TaskDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchTitle() {
    this.setState({
      currentTask: null,
      currentIndex: -1
    });

    TaskDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          tasks: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, tasks, currentTask, currentIndex } = this.state;

    return (
      <div className="list row">
        {/* <div className="col-md-8"> */}
        {/*   {/\* <div className="input-group mb-3"> *\/} */}
        {/*   {/\*   <input *\/} */}
        {/*   {/\*     type="text" *\/} */}
        {/*   {/\*     className="form-control" *\/} */}
        {/*   {/\*     placeholder="Search by title" *\/} */}
        {/*   {/\*     value={searchTitle} *\/} */}
        {/*   {/\*     onChange={this.onChangeSearchTitle} *\/} */}
        {/*   {/\*   /> *\/} */}
        {/*   {/\*   {/\\* <div className="input-group-append"> *\\/} *\/} */}
        {/*   {/\*   {/\\*   <button *\\/} *\/} */}
        {/*   {/\*   {/\\*     className="btn btn-outline-secondary" *\\/} *\/} */}
        {/*   {/\*   {/\\*     type="button" *\\/} *\/} */}
        {/*   {/\*   {/\\*     onClick={this.searchTitle} *\\/} *\/} */}
        {/*   {/\*   {/\\*   > *\\/} *\/} */}
        {/*   {/\*   {/\\*     Search *\\/} *\/} */}
        {/*   {/\*   {/\\*   </button> *\\/} *\/} */}
        {/*   {/\*   {/\\* </div> *\\/} *\/} */}
        {/*   {/\* </div> *\/} */}
        {/* </div> */}
        <div className="col-md-6">
          <h4>Task List</h4>

          <ul className="list-group">
            {tasks &&
              tasks.map((task, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveTask(task, index)}
                  key={index}
                >
                  {task.taskname}
                </li>
              ))}
          </ul>

          {/* <button */}
          {/*   className="m-3 btn btn-sm btn-danger" */}
          {/*   onClick={this.removeAllTasks} */}
          {/* > */}
          {/*   Remove All */}
          {/* </button> */}
        </div>
        <div className="col-md-6">
          {currentTask ? (
            <div>
              <h4>Task</h4>
              <div>
                <label>
                  <strong>Id:</strong>
                </label>{" "}
                {currentTask.id}
              </div>
              <div>
                <label>
                  <strong>name:</strong>
                </label>{" "}
                {currentTask.taskname}
              </div>
              <div>
                <label>
                  <strong>description:</strong>
                </label>{" "}
                {currentTask.taskdesc}
              </div>

              <Link
                to={"/tasks/" + currentTask.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Task...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
