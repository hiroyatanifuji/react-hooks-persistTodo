import React, { useContext, useReducer } from 'react';
import Home from './Home';

// material-ui関連
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";
import indigo from "@material-ui/core/colors/indigo";

// context object
import Store from "./context";

import rootReducer from "./reducers";

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

const App = () => {

  const [state, dispatch] = useReducer(rootReducer, useContext(Store));

  return (
    <Store.Provider value={{ state, dispatch }}>
      <MuiThemeProvider theme={theme}>
        <Home />
      </MuiThemeProvider>
    </Store.Provider>
  );
}

export default App;