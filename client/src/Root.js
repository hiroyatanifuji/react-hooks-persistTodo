import React, { useState } from "react";
import App from "./App";
import PropTypes from "prop-types";

// material-ui関連
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

// スタイル
const styles = theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    marginTop: 300,
  },
  textField: {
    backgroundColor: theme.palette.background.paper,
    width: "50%"
  }
});

const Root = (props) => {

  const { classes } = props;

  // local state;
  const [nameInput, setInput] = useState("");
  const [login, setLogin] = useState(false);

  const handleInput = e => {
    setInput(e.target.value);
  }

  const handleKeyPress = e => {
    if (e.target.value && e.key === "Enter") setLogin(true);
  }

  // ログイン後メイン画面
  if (login) {
    return (
      <App userName={nameInput} />
    );
  }

  return (
    <div className={classes.root}>
      <TextField
        id="loginName"
        placeholder="Login Name"
        margin="normal"
        variant="outlined"
        value={nameInput}
        className={classes.textField}
        onChange={handleInput}
        onKeyPress={handleKeyPress}
      />
    </div>
  );
}

Root.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Root);