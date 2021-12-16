import axios from "axios";
import * as actionTypes from "../constants/ActionTypes";
import { put, call, race, take, select } from "redux-saga/effects";
import * as api from "../api/tasks";

// put = dispatch

// fetch tasks
export const fetchTasksWorkerSaga = function* () {
  yield select((state) => {});

  yield put({
    type: actionTypes.FETCH_TASKS_PENDING,
  });

  try {
    let { response, fetchCancel } = yield race({
      response: call(api.fetchTasks),
      fetchCancel: take(actionTypes.FETCH_TASKS_CANCEL),
    });

    if (fetchCancel) {
      yield put({
        type: actionTypes.FETCH_TASKS_REJECTED,
        payload: {
          message: "Cancelled",
        },
      });
    } else {
      yield put({
        type: actionTypes.FETCH_TASKS_FULFILLED,
        payload: response,
      });
    }
  } catch (error) {
    yield put({
      type: actionTypes.FETCH_TASKS_REJECTED,
      payload: error,
    });
  }
};

// create tasks
export const createTasksWorkerSaga = function* (action) {
  yield put({
    type: actionTypes.CREATE_TASK_PENDING,
  });

  try {
    let response = yield axios.post(
      "http://localhost:7000/tasks",
      action.payload
    );

    yield put({
      type: actionTypes.CREATE_TASK_FULFILLED,
      payload: response,
    });
  } catch (error) {
    yield put({
      type: actionTypes.CREATE_TASK_REJECTED,
      payload: error,
    });
  }
};

// delete tasks
export const deleteTasksWorkerSaga = function* (action) {
  yield put({
    type: actionTypes.DELETE_TASK_PENDING,
  });

  try {
    yield axios.delete(`http://localhost:7000/tasks/${action.payload}`);

    yield put({
      type: actionTypes.DELETE_TASK_FULFILLED,
      payload: action.payload,
    });
  } catch (error) {
    yield put({
      type: actionTypes.DELETE_TASK_REJECTED,
      payload: error,
    });
  }
};
