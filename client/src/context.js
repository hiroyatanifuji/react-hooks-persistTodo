import React from "react";

const Store = React.createContext({
  TodoReducers: {
    todoList: [],
    userName: "",
  },
  TimeLineReducers: {
    userId: null,
    timeLineItems: [],
  }
});

export default Store;