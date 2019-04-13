import * as actionTypes from "../actionTypes";

// todo追加時
export const addTodo = (input) => ({
  type: actionTypes.ADD_TODO,
  input: input
});
// フィルターセット時
export const setFilter = (filter) => ({
  type: actionTypes.SET_FILTER,
  filter: filter,
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