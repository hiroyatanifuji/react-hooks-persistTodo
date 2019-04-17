import * as actionTypes from "../actionTypes";

export default (state = null, action) => {
  switch (action.type) {
    case actionTypes.SET_USER_NAME:
      return {
        ...state,
        userName: action.name
      };
    case actionTypes.ADD_TODO:
      {
        let newList = state.todoList.concat();
        const todoInput = action.input;
        const index = newList.length;
        const newTodo = {
          title: todoInput,
          done: false,
          index: index,
        };
        newList.push(newTodo);
        return {
          ...state,
          todoList: newList,
        };
      }
    case actionTypes.DONE_TODO:
      {
        const index = action.index;
        let newList = state.todoList.concat();
        newList[index].done = !newList[index].done;
        return {
          ...state,
          todoList: newList,
        };
      }
    case actionTypes.DELETE_TODO:
      {
        const index = action.index;
        let newList = state.todoList.concat();
        newList.splice(index, 1);
        newList = newList.map((todo, index) => {
          todo.index = index;
          return todo;
        });
        return {
          ...state,
          todoList: newList
        };
      }
    case actionTypes.INITIAL_SET:
      return {
        ...state,
        userName: action.name
      };
    default:
      return state;
  }
}