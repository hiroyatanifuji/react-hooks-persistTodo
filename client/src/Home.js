import React from 'react';
import PropTypes from "prop-types";

// materil-ui関連
import { withStyles } from "@material-ui/core/styles";

// コンテナ読み込み
import Todo from "./containers/Todo";
import TimeLine from "./containers/TimeLine";

// スタイル
const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100%',
    zIndex: 1,
    position: 'relative',
    display: 'flex',
    justifyContent: "space-around",
    width: '100%',
    paddingTop: 30,
  },
  leftContent: {
    width: "45%"
  },
  rightContent: {
    width: "45%",
    display: "flex",
    justifyContent: "center",
    height: "95vh",
    minHeight: 650
  }
});

const Home = (props) => {

    const { classes } = props;

    return (
      <div className={classes.root}>
        <div className={classes.leftContent}>
          <Todo />
        </div>
        <div className={classes.rightContent}>
          <TimeLine />
        </div>
      </div>
    );
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Home);