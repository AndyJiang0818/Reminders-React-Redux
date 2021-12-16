import {
  fetchTasksWorkerSaga,
  createTasksWorkerSaga,
  deleteTasksWorkerSaga,
} from "./tasks";
import {
  fork,
  all,
  takeEvery,
  takeLatest,
  throttle,
  take,
  cancel,
  put,
} from "redux-saga/effects";
import * as actionTypes from "../constants/ActionTypes";

export const fetchTasksWatcherSaga = function* () {
  while (yield take(actionTypes.FETCH_TASKS)) {
    let fetchProcess = yield fork(fetchTasksWorkerSaga);

    // cancel
    yield take(actionTypes.FETCH_TASKS_CANCEL);
    yield cancel(fetchProcess);

    yield put({
      type: actionTypes.FETCH_TASKS_REJECTED,
      payload: {
        message: "Cancelled",
      },
    });
  }
};

export const tasksWatcherSaga = function* () {
  // yield fork(fetchTasksWatcherSaga);

  yield takeLatest(actionTypes.FETCH_TASKS, fetchTasksWorkerSaga);

  yield throttle(1000 * 3, actionTypes.CREATE_TASK, createTasksWorkerSaga);

  yield take(actionTypes.CREATE_TASK);

  yield takeEvery(actionTypes.DELETE_TASK, deleteTasksWorkerSaga);
};

export const employeesWatcherSaga = function* () {};

export const rootSaga = function* () {
  yield all([fork(tasksWatcherSaga), fork(employeesWatcherSaga)]);
};
