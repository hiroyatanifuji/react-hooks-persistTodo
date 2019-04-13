import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

// redux関連
import { Provider } from "react-redux";

// material-ui関連
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";
import indigo from "@material-ui/core/colors/indigo";

// store関連
import createStore from "./store";

// storeインスタンス
const store = createStore();

// material-ui設定
const theme = createMuiTheme({
  palette: {
    type: "light",
    primary: blue,
    secondary: indigo,
  },
  typography: {
    useNextVariants: true,
  },
});

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </Provider>
  , document.getElementById('root')
);
serviceWorker.unregister();