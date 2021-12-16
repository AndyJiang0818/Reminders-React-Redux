import * as actionTypes from "../constants/ActionTypes";

export const fetchTasks = () => ({
  type: actionTypes.FETCH_TASKS,
});

export const createTask = (newTask) => ({
  type: actionTypes.CREATE_TASK,
  payload: newTask,
});

export const deleteTask = (taskID) => ({
  type: actionTypes.DELETE_TASK,
  payload: taskID,
});

export const cancelFetchTasks = () => ({
  type: actionTypes.FETCH_TASKS_CANCEL,
});
