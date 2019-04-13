import React, { Component } from "react";
import PropTypes from "prop-types";

// redux関連
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions";

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
  },
});

class TimeLine extends Component {

  componentDidMount() {
    const { actions } = this.props;
    socket.on("RECEIVE_TODO", (data) => actions.sendTodo(data));
  }

  render() {
    const { classes, TimeLineReducers } = this.props;
    const items = TimeLineReducers.timeLineItems;
    const uid = TimeLineReducers.userId;
    return (
      <div className={classes.root}>
        {items.map((item, index) => (
          <TimeLineItem
            key={index}
            item={item}
            uid={uid}
          />
        ))}
      </div>
    )
  }
};

TimeLine.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

// redux設定
const mapStateToProps = state => ({
  TimeLineReducers: state.TimeLineReducers,
});

const mapDisaptchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDisaptchToProps)(
  withStyles(styles, { withTheme: true })(TimeLine)
);