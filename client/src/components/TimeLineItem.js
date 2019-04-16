import React, { useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

// material-ui関連
import { withStyles } from '@material-ui/core/styles';
import SnackbarContent from "@material-ui/core/SnackbarContent";
import Typography from '@material-ui/core/Typography';

// スタイル
const styles = theme => ({
  another: {
    display: "flex",
  },
  content: {
    width: "40%",
    minWidth: "40%",
    padding: 0,
    marginTop: 10,
    color: "black",
  },
  myColor: {
    backgroundColor: "#84ef2b",
    marginLeft: "auto",
  },
  anotherColor: {
    backgroundColor: "#ffffff",
  },
  ul: {
    margin: 0,
  },
});

const TimeLineItem = props => {

  const { classes, item, uid, anotherName } = props;

  // 相手からの投稿の場合色分け & memorize
  const style = useMemo(() => item.id === uid ? (classes.myColor) : (classes.anotherColor), [item]);

  // function memorize
  const snackbar = useCallback(() => (
    <SnackbarContent
      className={classNames(classes.content, style)}
      aria-describedby="client-snackbar"
      message={
        <ul className={classes.ul}>
          {item.todoList.map((todo, index) => (
            <li key={index}>
              {todo.title}
            </li>
          ))}
        </ul>
      }
    />
  ), [item]);

  if (item.id !== uid) {
    return (
      <div className={classes.another}>
        <Typography variant="body1" gutterBottom align="left" style={{ marginTop: 10, marginRight: 10 }}>
          {anotherName(item)}
        </Typography>
        {snackbar()}
      </div>
    );
  }

  return snackbar();
};

TimeLineItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TimeLineItem);