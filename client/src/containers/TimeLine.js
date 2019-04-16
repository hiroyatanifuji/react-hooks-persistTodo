import React, { useContext, useEffect, useMemo, useCallback } from "react";
import PropTypes from "prop-types";

// actions関連
import * as actions from "../actions";

// context object
import Store from "../context";

// materil-ui関連
import { withStyles } from "@material-ui/core/styles";

// コンポーネント準備
import TimeLineItem from "../components/TimeLineItem";

// socketインスタンス
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

  // global state
  const { state, dispatch } = useContext(Store);
  const { TimeLineReducers } = state;
  const { timeLineItems, userId } = TimeLineReducers;

  // global state memorize
  const items = useMemo(() => timeLineItems, [timeLineItems]);
  const uid = useMemo(() => userId, [userId]);

  // Mount後一度だけ呼ばれる
  useEffect(() => {
    socket.on("RECEIVE_TODO", (data) => dispatch(actions.sendTodo(data)))
  }, []);

  // function memorize
  // 相手の名前取得する関数
  // 相手の名前が変更されたら適応する
  const anotherName = useCallback((item) => {
    const result = items.filter(it => it.id === item.id);
    return result[result.length - 1].user;
  }, [timeLineItems]);

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