import React from "react";
import PropTypes from "prop-types";

// materil-ui関連
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const styles = theme => ({
  root: {
    width: "68%"
  },
  textField: {
    backgroundColor: theme.palette.background.paper,
    width: "100%",
  }
})

const TodoInput = (props) => {

  const { handleInput, value, addTodo, classes } = props;
  return (
    <div className={classes.root}>
      <TextField
        id="todo"
        placeholder="Add ToDo"
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

TodoInput.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true})(TodoInput);