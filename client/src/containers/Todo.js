import React, { useContext, useState, useEffect, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import * as actionTypes from "../actionTypes";
import * as actions from "../actions";

import Store from "../context";

// materil-ui関連
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import InputBase from "@material-ui/core/InputBase";

// コンポーネント準備
import TodoInput from "../components/TodoInput";
import TodoList from "../components/TodoList";

import socket from "../socket";

const styles = theme => ({
  root: {

  },
  nameInput: {
    backgroundColor: theme.palette.background.paper,
  }
});

const Todo = (props) => {

  const { classes } = props;

  const { state, dispatch } = useContext(Store);

  const { TodoReducers, TimeLineReducers } = state;

  const todoList = useMemo(() => TodoReducers.todoList, [TodoReducers.todoList]);
  const userId = useMemo(() => TimeLineReducers.userId, [TimeLineReducers.userId]);
  const userName = useMemo(() => TodoReducers.userName, [TodoReducers.userName]);

  const [todoInput, setInput] = useState("");
  const [filter, setFilter] = useState("all");
  const [filterList, setFilterList] = useState(todoList);

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleUserName = (e) => {
    dispatch(actions.setUserName(e));
  }

  const addTodo = (e) => {
    if (e.target.value && e.key === "Enter") {
      dispatch(actions.addTodo(todoInput));
      return setInput("");
    }
  }

  const sendTodo = () => {
    if (todoList.length !== 0 && userName) {

      const id = userId ? userId : socket.id;

      let timeLineItem = { user: userName, id: id, todoList: todoList}
      if (!userId) {
        dispatch(actions.setUserId(id));
      }
      return socket.emit("SEND_TODO", timeLineItem);
    } else {
      alert("Error");
    }
  }

  const doneTodo = (index) => {
    dispatch(actions.doneTodo(index));
  }
  const deleteTodo = (index) => {
    dispatch(actions.deleteTodo(index));
  }

  const filtering = () => {
    switch (filter) {
      case "all":
        return todoList;
      case "active":
        return todoList.filter(todo => todo.done === false);
      case "complete":
        return todoList.filter(todo => todo.done === true);
      default:
        return todoList;
    }
  }

  useEffect(() => setFilterList(filtering()), [todoList, filter]);

  const filterAll = useCallback(() => filter !== "all" && setFilter("all"), [filter]);
  const filterActive = useCallback(() => filter !== "active" && setFilter("active"), [filter]);
  const filterComplete = useCallback(() => filter !== "complete" && setFilter("complete"), [filter]);

  return (
    <div>
      <div>
        <InputBase
          className={classes.nameInput}
          placeholder="user name"
          value={userName}
          onChange={handleUserName}
        />
        <Button onClick={sendTodo}>Send</Button>
      </div>
      <div>
        <TodoInput
          handleInput={handleInput}
          value={todoInput}
          addTodo={addTodo}
        />
      </div>
      <div>
        <div>
          <Button onClick={filterAll}>All</Button>
          <Button onClick={filterActive}>Active</Button>
          <Button onClick={filterComplete}>Complete</Button>
        </div>
        <TodoList
          filterList={filterList}
          doneTodo={doneTodo}
          deleteTodo={deleteTodo}
        />
      </div>
    </div>
  );
};

Todo.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Todo);