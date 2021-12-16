import React from "react";
import Task from "./components/tasks/task";
import store from "./store";
import { Provider } from "react-redux";

function App(props) {
  return (
    <Provider store={store}>
      <Task />
    </Provider>
  );
}

export default App;
