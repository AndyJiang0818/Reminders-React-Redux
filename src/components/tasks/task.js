import React from "react";
import "./task.css";
import Collapsible from "../Collapsible/Collapsible";
import { useState, useEffect } from "react";
import actions from "../../actions";
import { useSelector, useDispatch } from "react-redux";
import { toDisplayableDateFormat } from "../../utils";

function Task() {
  let [taskTitle, setTaskTitle] = useState("");
  let [taskDateTime, setTaskDateTime] = useState("");
  let [search, setSearch] = useState("");
  let [isNewTaskOpen, setIsNewTaskOpen] = useState(false);

  // redux state
  let tasks = useSelector((state) => state.tasks);

  // dispatch
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.fetchTasks());
  }, [dispatch]);

  let filterTask = [];

  if (tasks && tasks.data.length > 0) {
    filterTask = tasks.data.filter(
      (task) => task.taskTitle.toLowerCase().indexOf(search.toLowerCase()) >= 0
    );
  }

  let onSaveClick = () => {
    // dispatch
    dispatch(
      actions.createTask({
        id: Math.floor(Math.random() * 10000),
        taskTitle: taskTitle,
        taskDateTime: taskDateTime,
      })
    );

    // clear
    // setTaskTitle("");
    // setTaskDateTime("");

    // setIsNewTaskOpen(!isNewTaskOpen);
  };

  let onDeleteClick = (task) => {
    if (window.confirm("Are you sure to delete this task?")) {
      dispatch(actions.deleteTask(task.id));
    }
  };

  let onCancelClick = () => {
    setIsNewTaskOpen(!isNewTaskOpen);
  };

  let onFetchCancelClick = () => {
    dispatch(actions.cancelFetchTasks());
  };

  return (
    <div className="outer-container">
      <div className="container">
        <div className="app-title-container">
          <div className="app-title">
            <h1>
              Tasks{" "}
              {tasks.loading ? (
                <span>
                  {" "}
                  <i className="fas fa-spinner fa-spin"></i>{" "}
                  <button
                    className="button button-red"
                    onClick={onFetchCancelClick}
                  >
                    Cancel
                  </button>
                </span>
              ) : (
                ""
              )}
            </h1>

            {tasks.error ? <h2>{tasks.error.message}</h2> : ""}
          </div>

          <div className="create-button-container">
            {!isNewTaskOpen ? (
              <button
                className="button create-button"
                onClick={() => {
                  setIsNewTaskOpen(!isNewTaskOpen);
                }}
              >
                <i className="fa fa-calendar-plus"></i>
                &nbsp;&nbsp; Create
              </button>
            ) : null}
          </div>
        </div>

        <Collapsible isOpen={isNewTaskOpen}>
          <div className="new-task-container">
            <h4 className="new-task-title">New Task</h4>

            {/* form group starts */}
            <div className="form-group">
              <label className="form-label" htmlFor="task-title">
                Task Title:
              </label>
              <div className="form-input">
                <input
                  type="text"
                  placeholder="Task Title"
                  className="text-box"
                  id="task-title"
                  value={taskTitle}
                  onChange={(event) => {
                    setTaskTitle(event.target.value);
                  }}
                />
              </div>
            </div>
            {/* form group ends */}

            {/* form group starts */}
            <div className="form-group">
              <label className="form-label" htmlFor="task-date-time">
                Task Date and Time:
              </label>
              <div className="form-input">
                <input
                  type="datetime-local"
                  placeholder="Task Date and Time"
                  className="text-box"
                  id="task-date-time"
                  value={taskDateTime}
                  onChange={(event) => {
                    setTaskDateTime(event.target.value);
                  }}
                />
              </div>
            </div>
            {/* form group ends */}

            <div className="button-group">
              <button
                className="button save-button"
                onClick={() => {
                  onSaveClick();
                }}
              >
                <i className="fa fa-save"></i>&nbsp;&nbsp; Save Task
              </button>

              <button
                className="button cancel-button"
                onClick={() => {
                  onCancelClick();
                }}
              >
                <i className="fa fa-window-close"></i>&nbsp;&nbsp; Cancel
              </button>
            </div>
          </div>
        </Collapsible>

        <div className="search-box">
          <input
            type="search"
            placeholder="Search"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />
          <i className="fa fa-search"></i>
        </div>

        <div className="content-body">
          {/* task starts */}
          {filterTask.map((task) => (
            <div className="task" key={task.id}>
              <div className="task-body">
                <div className="task-title">
                  <i className="fa fa-thumbtack"></i>
                  <span className="task-title-text">{task.taskTitle}</span>
                </div>
                <div className="task-subtitle">
                  <i className="far fa-clock"></i>{" "}
                  <span className="task-subtitle-text">
                    {toDisplayableDateFormat(task.taskDateTime)}
                  </span>
                </div>
              </div>

              <div className="task-options">
                <button
                  className="icon-button"
                  title="Delete"
                  onClick={() => {
                    onDeleteClick(task);
                  }}
                >
                  &times;
                </button>
              </div>
            </div>
          ))}
          {/* task ends */}

          {filterTask.length === 0 ? <div>No Tasks Loaded</div> : ""}
        </div>
      </div>
    </div>
  );
}

export default Task;
