import * as actionTypes from "../actionTypes";

// ユーザーネームのセット時
export const setUserName = (e) => ({
  type: actionTypes.SET_USER_NAME,
  name: e.target.value
});
// todo追加時
export const addTodo = (input) => ({
  type: actionTypes.ADD_TODO,
  input: input
});
// todo完了時
export const doneTodo = (index) => ({
  type: actionTypes.DONE_TODO,
  index: index,
});
// todo削除時
export const deleteTodo = (index) => ({
  type: actionTypes.DELETE_TODO,
  index: index,
});

// todo送信時
export const sendTodo = (data) => ({
  type: actionTypes.SEND_TODO,
  data: data,
});
// ユーザーidをセット
export const setUserId = (id) => ({
  type: actionTypes.SET_USER_ID,
  id: id,
});