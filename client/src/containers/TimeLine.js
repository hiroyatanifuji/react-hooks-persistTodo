import React, { useContext, useEffect, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import * as actionTypes from "../actionTypes";
import * as actions from "../actions";

import Store from "../context";

// materil-ui関連
import { withStyles } from "@material-ui/core/styles";

// コンポーネント準備
import TimeLineItem from "../components/TimeLineItem";

import socket from "../socket";

const styles = theme => ({
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "rgba(244, 244, 244, 0.5)",
    padding: 5,
    overflow: "scroll"
  },
});

const TimeLine = (props) => {

  const { classes } = props;

  const { state, dispatch } = useContext(Store);
  const { TimeLineReducers } = state;
  const { timeLineItems, userId } = TimeLineReducers;

  const items = useMemo(() => timeLineItems, [timeLineItems]);
  const uid = useMemo(() => userId, [userId]);

  useEffect(() => {
    socket.on("RECEIVE_TODO", (data) => dispatch(actions.sendTodo(data)))
  }, []);

  const anotherName = useCallback((item) => items[items.lastIndexOf(item)].user, [timeLineItems]);

  return (
    <div className={classes.root}>
      {items.map((item, index) => (
        <TimeLineItem
          key={index}
          item={item}
          uid={uid}
          anotherName={anotherName}
        />
      ))}
    </div>
  )
};

TimeLine.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(TimeLine);