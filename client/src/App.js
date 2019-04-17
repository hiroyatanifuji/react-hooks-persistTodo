import React, { useContext, useReducer, useEffect } from 'react';
import Home from './Home';

// actions関連
import * as actions from "./actions";

// material-ui関連
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import indigo from "@material-ui/core/colors/indigo";
import red from '@material-ui/core/colors/red';

// context object
import Store from "./context";

// localstorageと結びつける関数
import { usePersistedContext, usePersistedReducer } from "./usePersist";

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

const App = (props) => {

  const name = props.userName;

  // localstorageにデータがあれば返す、なければ初期値
  const globalStore = usePersistedContext(useContext(Store), name);

  // stateが変更したら、localstorageにsetする
  const [state, dispatch] = usePersistedReducer(
    useReducer(rootReducer, globalStore), name
  );

  // 初期設定としてユーザーネームセット
  useEffect(() => dispatch(actions.initialSet(name)), []);

  return (
    <Store.Provider value={{ state, dispatch }}>
      <MuiThemeProvider theme={theme}>
        <Home />
      </MuiThemeProvider>
    </Store.Provider>
  );
}

export default App;