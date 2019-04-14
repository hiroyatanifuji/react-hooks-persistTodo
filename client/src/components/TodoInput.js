import React, { useState } from "react";
import PropTypes from "prop-types";

// materil-ui関連
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const styles = theme => ({
  textField: {
    backgroundColor: theme.palette.background.paper,
  }
})

const TodoInput = (props) => {

  const { handleInput, value, addTodo, classes } = props;
  return (
    <div>
      <TextField
        id="todo"
        placeholder="To Do"
        margin="normal"
        variant="outlined"
        value={value}
        className={classes.textField}
        onChange={handleInput}
        onKeyPress={addTodo}
      />
    </div>
  );
};

export default withStyles(styles, { withTheme: true})(TodoInput);