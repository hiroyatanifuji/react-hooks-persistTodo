import React, { Component } from 'react';
import PropTypes from "prop-types";

// materil-ui関連
import { withStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';

// コンポーネント準備
import TodoItem from "./TodoItem";

const styles = theme => ({

});

const TodoList = (props) => {
  const { filter, todoList, setFilter, doneTodo, deleteTodo } = props;

  const filterList = () => {
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

  return (
    <div>
      <div>
        <Button onClick={() => setFilter("all")}>All</Button>
        <Button onClick={() => setFilter("active")}>Active</Button>
        <Button onClick={() => setFilter("complete")}>Complete</Button>
      </div>
      <div>
        {filterList().map((todo, index) => (
          <TodoItem
            key={index}
            todo={todo}
            doneTodo={doneTodo}
            deleteTodo={deleteTodo}
          />
        ))}
      </div>
    </div>
  );
}

export default withStyles(styles)(TodoList);