import React, { useContext, useState, useEffect, useMemo, useCallback } from "react";
import PropTypes from "prop-types";

// actions関連
import * as actions from "../actions";

// context object
import Store from "../context";

// materil-ui関連
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import InputBase from "@material-ui/core/InputBase";

// コンポーネント準備
import TodoInput from "../components/TodoInput";
import TodoList from "../components/TodoList";

import { TwitterShareButton,  TwitterIcon } from "react-share";

// socketインスタンス
import socket from "../socket";

const styles = theme => ({
  nameInput: {
    padding: "4px 12px",
    borderRadius: 4,
    border: "1px solid #ced4da",
    backgroundColor: theme.palette.background.paper,
  },
  filterButtons: {
    display: "flex",
  },
  button: {
    marginRight: 10,
  },
  todoInput: {
    display: "flex",
    width: "100%"
  },
  shareIcon: {
    width: 60,
    height: 60,
    marginTop: 16,
    marginLeft: 10
  }
});

const Todo = (props) => {

  const { classes } = props;

  // global state
  const { state, dispatch } = useContext(Store);
  const { TodoReducers, TimeLineReducers } = state;

  // golobal state memorize
  const todoList = useMemo(() => TodoReducers.todoList, [TodoReducers.todoList]);
  const userId = useMemo(() => TimeLineReducers.userId, [TimeLineReducers.userId]);
  const userName = useMemo(() => TodoReducers.userName, [TodoReducers.userName]);

  // local state
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
      // 初回投稿時にsocketIdをuserIdに保存
      const id = userId ? userId : socket.id;
      let timeLineItem = { user: userName, id: id, todoList: filterList}
      if (!userId) {
        dispatch(actions.setUserId(id));
      }
      return socket.emit("SEND_TODO", timeLineItem);
    } else {
      alert("Input Name and Todo");
    }
  }

  const doneTodo = (index) => {
    dispatch(actions.doneTodo(index));
  }
  const deleteTodo = (index) => {
    dispatch(actions.deleteTodo(index));
  }

  // local stateのfilterによってlistを応変
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

  // todoList、filterの変更時のみに制御
  useEffect(() => setFilterList(filtering()), [todoList, filter]);

  // setFilter function memorize
  const filterAll = useCallback(() => filter !== "all" && setFilter("all"), [filter]);
  const filterActive = useCallback(() => filter !== "active" && setFilter("active"), [filter]);
  const filterComplete = useCallback(() => filter !== "complete" && setFilter("complete"), [filter]);

  // button color memorize
  const colorAll = useMemo(() => filter === "all" ? "secondary" : "inherit", [filter]);
  const colorActive = useMemo(() => filter === "active" ? "secondary" : "inherit", [filter]);
  const colorComplete = useMemo(() => filter === "complete" ? "secondary" : "inherit", [filter]);

  // share用ToDo文字列をmemorize
  const shareTitle = useMemo(() => {
    const shareList = filterList.map(i => "・" + i.title).join("\n");
    return "今日のToDo\n" + shareList;
  }, [filterList]);

  return (
    <div>
      <div>
        <InputBase
          className={classes.nameInput}
          placeholder="user name"
          value={userName}
          onChange={handleUserName}
        />
        <Button variant="contained" color="secondary" onClick={sendTodo}>
          Send
        </Button>
      </div>
      <div className={classes.todoInput}>
        <TodoInput
          handleInput={handleInput}
          value={todoInput}
          addTodo={addTodo}
        />
        <TwitterShareButton
          url="??"
          title={shareTitle}
          className={classes.shareIcon}
        >
          <TwitterIcon size={60} round />
        </TwitterShareButton>
      </div>
      <div>
        <div className={classes.filterButtons}>
          <Button className={classes.button} color={colorAll} variant="outlined" onClick={filterAll}>All</Button>
          <Button className={classes.button} color={colorActive} variant="outlined" onClick={filterActive}>Active</Button>
          <Button className={classes.button} color={colorComplete} variant="outlined" onClick={filterComplete}>Complete</Button>
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