import React from "react";

// context object設定
// stateの初期値
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