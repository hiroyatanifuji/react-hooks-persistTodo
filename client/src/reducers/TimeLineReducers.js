import * as actionTypes from "../actionTypes";

export default (state = null, action) => {
  switch (action.type) {
    case actionTypes.SEND_TODO:
      {
        let newItems = state.timeLineItems.concat();
        const data = action.data;
        newItems.push(data);
        return {
          ...state,
          timeLineItems: newItems
        };
      }
    case actionTypes.SET_USER_ID:
      return {
        ...state,
        userId: action.id,
      };
    default:
      return state;
  }
}