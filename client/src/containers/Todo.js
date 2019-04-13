import React, { Component } from "react";
import PropTypes from "prop-types";

// redux関連
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions";

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

class Todo extends Component {

  state = {
    todoInput: "",
    userName: "",
  }

  handleInput = (value) => {
    this.setState({ todoInput: value });
  };

  addTodo = () => {
    const { actions } = this.props;
    const { todoInput } = this.state;
    actions.addTodo(todoInput);
    return this.setState({ todoInput: "" });
  }

  sendTodo = () => {
    const { TodoReducers, actions, TimeLineReducers } = this.props;
    const todoList = TodoReducers.todoList;
    const { userName } = this.state;
    if (todoList.length !== 0 && userName) {
      const id = socket.id;
      let timeLineItem = { user: userName, id: id, todoList: todoList}
      if (TimeLineReducers.userId !== id) {
        actions.setUserId(id);
      }
      return socket.emit("SEND_TODO", timeLineItem);
    } else {
      alert("Error");
    }
  }

  render() {

    const { actions, TodoReducers, classes } = this.props;
    const { todoInput, userName } = this.state;

    return (
      <div>
        <div>
          <InputBase
            className={classes.nameInput}
            placeholder="user name"
            value={userName}
            onChange={(e) => this.setState({ userName: e.target.value })}
          />
          <Button onClick={() => this.sendTodo()}>Send</Button>
        </div>
        <div>
          <TodoInput
            handleInput={this.handleInput}
            value={todoInput}
            addTodo={this.addTodo}
          />
          <TodoList
            filter={TodoReducers.filter}
            todoList={TodoReducers.todoList}
            setFilter={(filter) => actions.setFilter(filter)}
            doneTodo={(index) => actions.doneTodo(index)}
            deleteTodo={(index) => actions.deleteTodo(index)}
          />
        </div>
      </div>
    );
  }
};

Todo.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

// redux設定
const mapStateToProps = state => ({
  TodoReducers: state.TodoReducers,
  TimeLineReducers: state.TimeLineReducers
});

const mapDisaptchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDisaptchToProps)(
  withStyles(styles, { withTheme: true })(Todo)
);