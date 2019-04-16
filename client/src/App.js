import React, { useContext, useReducer } from 'react';
import Home from './Home';

// material-ui関連
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import indigo from "@material-ui/core/colors/indigo";
import red from '@material-ui/core/colors/red';

// context object
import Store from "./context";

// reducer関連
import rootReducer from "./reducers";

// material-ui設定
const theme = createMuiTheme({
  palette: {
    type: "light",
    primary: indigo,
    secondary: red,
  },
  typography: {
    useNextVariants: true,
  },
});

const App = () => {

  // stateとdispatch設定
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